// Server-only helper: resolves a /public path to itself if the file exists,
// otherwise null. Lets case studies pick up screenshots dropped into /public
// without code changes. Import only from Server Components.
import fs from "node:fs";
import path from "node:path";

export function publicAsset(publicPath: string): string | null {
  const file = path.join(process.cwd(), "public", publicPath);
  return fs.existsSync(file) ? publicPath : null;
}

/** Pixel size of a PNG in /public (read from its header), or null. */
export function pngSize(publicPath: string | null): { w: number; h: number } | null {
  if (!publicPath || !publicPath.toLowerCase().endsWith(".png")) return null;
  try {
    const fd = fs.openSync(path.join(process.cwd(), "public", publicPath), "r");
    const buf = Buffer.alloc(24);
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    if (buf.toString("ascii", 1, 4) !== "PNG") return null;
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}

/** First existing file among alternatives, e.g. logo.svg then logo.png. */
export function firstPublicAsset(...candidates: string[]): string | null {
  for (const c of candidates) {
    const hit = publicAsset(c);
    if (hit) return hit;
  }
  return null;
}

/**
 * Pixel size of a PNG or JPEG in /public (read from the file header), or
 * null. Lets layouts show real screenshots at their true proportions.
 */
export function imageSize(publicPath: string | null): { w: number; h: number } | null {
  if (!publicPath) return null;
  const lower = publicPath.toLowerCase();
  if (lower.endsWith(".png")) return pngSize(publicPath);
  if (!/\.jpe?g$/.test(lower)) return null;
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", publicPath));
    let i = 2; // skip SOI
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      // SOF0–SOF15, excluding DHT (C4), JPG (C8) and DAC (CC)
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
    return null;
  } catch {
    return null;
  }
}
