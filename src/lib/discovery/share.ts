// Text helpers shared by the admin pages (safe to use in the browser).

export function whatsappMessage(greeting: string, minutes: number, url: string): string {
  const hello = greeting.trim() ? `${greeting.trim()}\n\n` : "";
  return `${hello}Here’s your private SKAYL discovery form. It takes about ${minutes} minutes, saves as you go, and helps us prepare an accurate quote for you:\n\n${url}\n\nAny questions, just message us.`;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}
