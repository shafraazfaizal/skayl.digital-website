// Shared constants for the Discovery feature.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.skayl.digital").replace(/\/$/, "");

export const SKAYL_EMAIL = "hello@skayl.digital";
export const FROM_EMAIL = `SKAYL <${SKAYL_EMAIL}>`;
/** Where new submissions are sent. Falls back to hello@skayl.digital. */
export const NOTIFY_EMAIL = process.env.CONTACT_TO_EMAIL || SKAYL_EMAIL;

export const PHONE_UK = "+44 7760 636396";
export const PHONE_LK = "+94 71 877 3300";

export const DEFAULT_EXPIRY_DAYS = 30;
export const PDF_BUCKET = "discovery-pdfs";

/** The client's link. Uses the site you're on (localhost, a preview, or the live site). */
export function linkUrl(token: string, origin?: string | null) {
  const base = origin && /^https?:\/\/[^/]+$/.test(origin) ? origin : SITE_URL;
  return `${base}/discovery/${token}`;
}
