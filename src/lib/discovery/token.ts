import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

/** 32 random bytes as base64url (43 characters). */
export function newToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Links are looked up by this hash, so the database never needs the raw token. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function looksLikeToken(token: string): boolean {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}

/* ── Showing a link again in the admin ────────────────────────────────────────
   So the admin can copy a link again later, the token is also stored
   encrypted (AES-256-GCM) with DISCOVERY_LINK_SECRET, which lives only in
   Vercel and .env.local. Someone with the database alone still can't open
   any client's form. Without the secret, links simply can't be shown again. */

function key(): Buffer | null {
  const secret = process.env.DISCOVERY_LINK_SECRET;
  return secret && secret.length >= 16 ? createHash("sha256").update(secret).digest() : null;
}

export function canRevealLinks(): boolean {
  return key() !== null;
}

export function encryptToken(token: string): string | null {
  const k = key();
  if (!k) return null;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", k, iv);
  const data = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64url");
}

/** Returns the token only if it decrypts and still matches the link's current hash. */
export function decryptToken(encrypted: string | null, expectedHash: string): string | null {
  const k = key();
  if (!k || !encrypted) return null;
  try {
    const buf = Buffer.from(encrypted, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", k, buf.subarray(0, 12));
    decipher.setAuthTag(buf.subarray(12, 28));
    const token = Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString("utf8");
    return hashToken(token) === expectedHash ? token : null;
  } catch {
    return null;
  }
}
