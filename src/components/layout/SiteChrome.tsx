import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import SmoothScroll from "@/components/layout/SmoothScroll";

// The public site's frame: navbar, footer, custom cursor and smooth scroll.
// Used by src/app/(site)/layout.tsx and the root 404 page. The private
// /discovery and /admin pages don't use it.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
