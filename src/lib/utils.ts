// Tiny className joiner (keeps conditional classes readable without a dep).
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Split a string into an array of characters, preserving spaces, for
// per-glyph text reveals.
export function splitChars(text: string): string[] {
  return Array.from(text);
}
