import SiteChrome from "@/components/layout/SiteChrome";

// Every public page (home, about, works, blog …) gets the navbar, footer,
// cursor and smooth scroll from here. URLs are unchanged: (site) is a route group.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
