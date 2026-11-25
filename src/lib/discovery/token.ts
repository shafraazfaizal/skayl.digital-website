import "server-only";
import { createHash, randomBytes } from "crypto";

/** 32 random bytes as base64url (43 characters). Only its hash is ever stored. */
export function newToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function looksLikeToken(token: string): boolean {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}
