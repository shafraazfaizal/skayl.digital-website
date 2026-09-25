// Services offered and the marquee ticker words.

export const tickerWords = [
  "Brand Design",
  "Web Development",
  "Photography",
  "Videography",
  "Content Creation",
  "Logo Design",
  "E-commerce",
  "SaaS Platforms",
  "Social Media Design",
];

export type Service = {
  title: string;
  tags: string[];
  description: string;
  price: string;
  timeline: string;
  image: string;
};

export const services: Service[] = [
  {
    title: "Web Development",
    tags: ["Business Websites", "SaaS Platforms", "E-commerce", "Web Applications"],
    description:
      "From landing pages to full SaaS platforms — engineered for performance and built to grow. Every build is custom, mobile-first, and SEO-ready from the ground up. No templates, no shortcuts.",
    price: "Contact for pricing",
    timeline: "2–8 weeks depending on scope",
    image: "/images/services/web-development.png",
  },
  {
    title: "Branding & Design",
    tags: ["Brand Identity", "Logo & Wordmark", "Social Media Design", "Marketing Assets"],
    description:
      "Visual identity systems that hold together across every touchpoint — from logo to UI. We don't design logos in isolation. We build the full system your brand needs to stay consistent as it grows.",
    price: "Contact for pricing",
    timeline: "2–4 weeks depending on scope",
    image: "/images/services/branding-design.png",
  },
  {
    title: "Content & Media",
    tags: ["Product Photography", "Videography", "Video Editing", "Social Content"],
    description:
      "Photography, video, and content built to the same standard as the brand it represents. Our content is storytelling-led and visually purposeful — produced without music, using cinematic visuals, professional voiceovers, authentic ambient sound, and thoughtful editing.",
    price: "Contact for pricing",
    timeline: "By project",
    image: "/images/services/content-media.png",
  },
  {
    title: "Event Management",
    tags: ["Planning & Direction", "Photography & Video Coverage", "Post-Event Content"],
    description:
      "A premium add-on for clients who want full creative direction on the day — planning, on-the-day coverage with photography and video, and post-event content delivered and ready to publish.",
    price: "Premium Add-On",
    timeline: "By request",
    image: "/images/services/event-management.png",
  },
];
