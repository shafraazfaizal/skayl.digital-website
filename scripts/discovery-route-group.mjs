#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// One-off, safe move of the marketing pages into the (site) route group.
//
// Why: the root layout wraps every page in the Navbar, Footer, Cursor and
// SmoothScroll. The private /discovery and /admin pages must not get those.
// Route groups don't change URLs, so visitors see no difference at all.
//
// What it does:
//   1. Checks everything first and changes nothing if anything looks unexpected.
//   2. git mv's the pages (and src/app/assets, if git tracks anything in it) into src/app/(site)/.
//   3. Fixes any import paths the move would otherwise break.
//   4. Moves the Navbar/Footer/Cursor/SmoothScroll wrapper out of the root
//      layout into src/components/layout/SiteChrome.tsx, used by (site)/layout.tsx.
//   5. Keeps the site's 404 page looking exactly the same.
//
// Run from the project root:  node scripts/discovery-route-group.mjs
// Running it twice is safe: it stops if the move has already happened.
// ─────────────────────────────────────────────────────────────────────────────

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP = path.join(ROOT, "src/app");
const SITE = path.join(APP, "(site)");
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

function fail(msg) {
  console.error(`\n✗ ${msg}\n\nNothing was changed.`);
  process.exit(1);
}
const ok = (msg) => console.log(`✓ ${msg}`);

/* ── 1. Checks (no changes yet) ───────────────────────────────────────────── */

if (!fs.existsSync(path.join(ROOT, "package.json")) || !fs.existsSync(APP)) fail("Run this from the project root (the folder with package.json).");
if (fs.existsSync(path.join(SITE, "layout.tsx"))) {
  console.log("✓ The (site) route group already exists. Nothing to do.");
  process.exit(0);
}

const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
if (branch === "main" || branch === "dev") fail(`You're on "${branch}". Switch to the feature branch first: git checkout feature/discovery-forms`);

for (const f of ["src/middleware.ts", "src/middleware.js", "middleware.ts", "middleware.js"]) {
  if (fs.existsSync(path.join(ROOT, f))) fail(`Found ${f}. This feature adds src/proxy.ts (Next 16). Send me ${f} so I can merge the two.`);
}

// Root-level things that stay where they are (they apply to every route).
const KEEP = new Set([
  "layout.tsx", "globals.css", "favicon.ico", "robots.ts", "sitemap.ts", "manifest.ts", "manifest.webmanifest",
  "opengraph-image.png", "opengraph-image.alt.txt", "twitter-image.png", "twitter-image.alt.txt",
  "icon.png", "icon.svg", "icon.ico", "apple-icon.png",
  "api", "discovery", "admin", "auth", "(site)",
]);
// Everything that moves into (site).
const MOVE = ["page.tsx", "not-found.tsx", "about", "blog", "contact", "privacy-policy", "services", "terms-and-conditions", "works", "assets"];

const entries = fs.readdirSync(APP).filter((n) => !n.startsWith("."));
const unexpected = entries.filter((n) => !KEEP.has(n) && !MOVE.includes(n));
if (unexpected.length) fail(`Found something I didn't expect in src/app: ${unexpected.join(", ")}. Send me the list and I'll update the script.`);

// Only move what git actually tracks. A folder holding nothing but ignored
// files (like .DS_Store) is left where it is.
const tracked = (n) => execSync(`git ls-files -- "src/app/${n}"`).toString().trim().length > 0;
function walkAll(dir) {
  return fs.readdirSync(dir).flatMap((n) => {
    const p = path.join(dir, n);
    return fs.statSync(p).isDirectory() ? walkAll(p) : [p];
  });
}
const skipped = [];
const toMove = MOVE.filter((n) => {
  if (!fs.existsSync(path.join(APP, n))) return false;
  if (tracked(n)) return true;
  const isDir = fs.statSync(path.join(APP, n)).isDirectory();
  const realFiles = isDir ? walkAll(path.join(APP, n)).filter((f) => !path.basename(f).startsWith(".")) : [path.join(APP, n)];
  if (realFiles.length) fail(`src/app/${n} has files git isn't tracking (${realFiles.map(rel).join(", ")}). Commit them first.`);
  skipped.push(n);
  return false;
});
if (!toMove.includes("page.tsx")) fail("src/app/page.tsx (the homepage) is missing.");
const clash = toMove.filter((n) => fs.existsSync(path.join(SITE, n)));
if (clash.length) fail(`src/app/(site) already contains: ${clash.join(", ")}. Delete the (site) folder (it should be empty) and run this again.`);

const status = execSync("git status --porcelain -- src/app src/components/layout").toString().trim();
const dirtyExisting = status
  .split("\n")
  .filter(Boolean)
  .filter((l) => !l.startsWith("??"))
  .filter((l) => !/src\/app\/(robots|sitemap)\.ts$/.test(l));
if (dirtyExisting.length) fail(`These files have uncommitted changes:\n${dirtyExisting.join("\n")}\nCommit or stash them first.`);

// The root layout must have the wrapper we're moving.
const layoutPath = path.join(APP, "layout.tsx");
const layout = fs.readFileSync(layoutPath, "utf8");
const bodyMatch = layout.match(/(<body[^>]*>)([\s\S]*?)(<\/body>)/);
if (!bodyMatch) fail("Couldn't find <body> in src/app/layout.tsx. Send me the file.");
const inner = bodyMatch[2];
if (!inner.includes("{children}")) fail("The <body> in src/app/layout.tsx doesn't contain {children}. Send me the file.");
if (inner.trim() === "{children}") fail("The root layout is already just {children}. Send me src/app/layout.tsx and I'll check.");

/* ── Work out the import fixes before moving anything ─────────────────────── */

const CODE = /\.(tsx?|jsx?|mjs|cjs|css)$/;
function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    if (n === "node_modules" || n.startsWith(".")) continue;
    const p = path.join(dir, n);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (CODE.test(n)) out.push(p);
  }
  return out;
}

const movedRoots = toMove.map((n) => path.join(APP, n));
const isMoved = (abs) => movedRoots.some((r) => abs === r || abs.startsWith(r + path.sep) || abs.startsWith(r + "."));
const newPathOf = (abs) => path.join(SITE, path.relative(APP, abs));
const toPosix = (p) => p.split(path.sep).join("/");

const SPEC = /(\bfrom\s*["']|\bimport\s*\(\s*["']|\brequire\s*\(\s*["']|^\s*import\s+["']|@import\s+["'])([^"']+)(["'])/gm;
const edits = new Map(); // file -> new content

for (const file of walk(path.join(ROOT, "src"))) {
  const src = fs.readFileSync(file, "utf8");
  const fileMoves = isMoved(file);
  const fromDir = path.dirname(file);
  const newFromDir = path.dirname(fileMoves ? newPathOf(file) : file);
  let changed = false;

  const out = src.replace(SPEC, (all, pre, spec, post) => {
    let target = null;
    if (spec.startsWith("./") || spec.startsWith("../")) target = path.resolve(fromDir, spec);
    else if (spec.startsWith("@/app/")) target = path.join(ROOT, "src", spec.slice(2));
    if (!target) return all;

    const targetMoves = isMoved(target);
    if (!fileMoves && !targetMoves) return all;
    if (fileMoves && targetMoves && (spec.startsWith("./") || spec.startsWith("../"))) return all; // moving together

    const finalTarget = targetMoves ? newPathOf(target) : target;
    let next;
    if (spec.startsWith("@/")) {
      next = "@/" + toPosix(path.relative(path.join(ROOT, "src"), finalTarget));
    } else {
      next = toPosix(path.relative(newFromDir, finalTarget));
      if (!next.startsWith(".")) next = "./" + next;
    }
    if (next === spec) return all;
    changed = true;
    return `${pre}${next}${post}`;
  });
  if (changed) edits.set(file, out);
}

/* ── 2. Move ──────────────────────────────────────────────────────────────── */

fs.mkdirSync(SITE, { recursive: true });
const done = [];
try {
  for (const n of toMove) {
    execSync(`git mv "src/app/${n}" "src/app/(site)/${n}"`, { stdio: "pipe" });
    done.push(n);
  }
} catch (err) {
  // Put back anything already moved, so a failure never leaves a half-moved site.
  for (const n of done.reverse()) execSync(`git mv "src/app/(site)/${n}" "src/app/${n}"`, { stdio: "pipe" });
  fail(`Couldn't move a folder: ${String(err.stderr || err.message).trim()}`);
}
ok(`Moved into src/app/(site): ${toMove.join(", ")}`);
if (skipped.length) ok(`Left in place (nothing tracked inside): ${skipped.join(", ")}`);

const hasNotFound = toMove.includes("not-found.tsx");

/* ── 3. Fix imports ───────────────────────────────────────────────────────── */

for (const [file, content] of edits) {
  const dest = isMoved(file) ? newPathOf(file) : file;
  fs.writeFileSync(dest, content);
  ok(`Fixed imports in ${rel(dest)}`);
}

/* ── 4. Split the root layout ─────────────────────────────────────────────── */

const freshLayout = fs.readFileSync(layoutPath, "utf8"); // may have had imports fixed above
const m = freshLayout.match(/(<body[^>]*>)([\s\S]*?)(<\/body>)/);
const chromeJsx = m[2];

// Imports used by the moved JSX (and nowhere else in the layout) go with it.
const importLines = [...freshLayout.matchAll(/^import\s+(?!type\b)([^;"'`]+?)\s+from\s+["']([^"']+)["'];?[ \t]*$/gm)];
const chromeImports = [];
let newLayout = freshLayout.replace(m[0], `${m[1]}{children}${m[3]}`);

for (const im of importLines) {
  const [line, what, from] = im;
  if (from.endsWith(".css")) continue;
  const names = what
    .replace(/[{}]/g, " ")
    .split(/[\s,]+/)
    .map((s) => s.split(/\s+as\s+/).pop())
    .filter((s) => s && s !== "as" && s !== "type");
  const usedInChrome = names.some((n) => new RegExp(`<${n}[\\s/>]`).test(chromeJsx) || new RegExp(`\\b${n}\\b`).test(chromeJsx));
  if (!usedInChrome) continue;
  const restOfLayout = newLayout.replace(line, "");
  const usedElsewhere = names.some((n) => new RegExp(`\\b${n}\\b`).test(restOfLayout));
  if (usedElsewhere) fail(`"${names.join(", ")}" is used both inside <body> and elsewhere in layout.tsx. Send me the file. (Files were moved: run "git reset --hard" to undo.)`);
  chromeImports.push(line.trim().replace(/from\s+["']\.\//, 'from "@/app/'));
  newLayout = newLayout.replace(line + "\n", "").replace(line, "");
}

function indentJsx(jsx) {
  const ls = jsx.replace(/^\s*\n/, "").replace(/\s+$/, "").split("\n");
  const pad = Math.min(...ls.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
  return ls.map((l) => (l.trim() ? "      " + l.slice(pad) : "")).join("\n");
}

const chromeFile = path.join(ROOT, "src/components/layout/SiteChrome.tsx");
fs.writeFileSync(
  chromeFile,
  `${chromeImports.join("\n")}

// The public site's frame: navbar, footer, custom cursor and smooth scroll.
// Used by src/app/(site)/layout.tsx and the root 404 page. The private
// /discovery and /admin pages don't use it.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
${indentJsx(chromeJsx)}
    </>
  );
}
`
);
ok("Created src/components/layout/SiteChrome.tsx");

fs.writeFileSync(layoutPath, newLayout.replace(/\n{3,}/g, "\n\n"));
ok("Root layout now holds only <html>, fonts and global styles");

fs.writeFileSync(
  path.join(SITE, "layout.tsx"),
  `import SiteChrome from "@/components/layout/SiteChrome";

// Every public page (home, about, works, blog …) gets the navbar, footer,
// cursor and smooth scroll from here. URLs are unchanged: (site) is a route group.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
`
);
ok("Created src/app/(site)/layout.tsx");

/* ── 5. Keep the 404 page identical ───────────────────────────────────────── */

fs.writeFileSync(
  path.join(APP, "not-found.tsx"),
  hasNotFound
    ? `import SiteChrome from "@/components/layout/SiteChrome";
import SiteNotFound from "./(site)/not-found";

// Unknown URLs: the same 404 page as before, with the site's navbar and footer.
export default function NotFound() {
  return (
    <SiteChrome>
      <SiteNotFound />
    </SiteChrome>
  );
}
`
    : `import SiteChrome from "@/components/layout/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="container-skayl py-40">
        <h1 className="display text-6xl">Page not found<span className="text-orange">.</span></h1>
      </section>
    </SiteChrome>
  );
}
`
);
ok("Root 404 page keeps the site navbar and footer");

execSync(`git add "src/app" "src/components/layout/SiteChrome.tsx"`);
console.log("\nDone. Now run:  npm run build\n");
