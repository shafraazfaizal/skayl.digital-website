// Site navigation and footer links.

export const nav = {
  links: [
    { label: "Works", href: "/works" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  cta: { label: "Contact", href: "/contact" },
};

export const footer = {
  columns: [
    {
      heading: "Navigation",
      links: [
        { label: "About", href: "/about" },
        { label: "Works", href: "/works" },
        { label: "Services", href: "/services" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      heading: "Social",
      links: [
        {
          label: "Instagram",
          href: "https://www.instagram.com/skayl.io/?utm_source=ig_web_button_share_sheet",
          external: true,
        },
        { label: "LinkedIn", href: "https://linkedin.com", external: true },
      ],
    },
    {
      heading: "Legals",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-and-conditions" },
      ],
    },
  ],
};
