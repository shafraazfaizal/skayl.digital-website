import SiteChrome from "@/components/layout/SiteChrome";
import SiteNotFound from "./(site)/not-found";

// Unknown URLs: the same 404 page as before, with the site's navbar and footer.
export default function NotFound() {
  return (
    <SiteChrome>
      <SiteNotFound />
    </SiteChrome>
  );
}
