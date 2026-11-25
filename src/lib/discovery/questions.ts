// ─────────────────────────────────────────────────────────────────────────────
// SKAYL Discovery — question bank.
//
// Everything the client sees in the form comes from this file: sections, intro
// text, questions, options and when a question is shown. Add a section or
// change a question here and the form, the validation, the admin view, the PDF
// and the emails all follow.
//
// Per-link changes (a different intro, other website areas, a custom label)
// are stored on the link as `overrides` and applied by `resolveForm()` in
// ./form.ts. Only questions marked `configurable` can be overridden.
// ─────────────────────────────────────────────────────────────────────────────

export type QuestionType = "text" | "textarea" | "radio" | "checkbox" | "email" | "tel" | "url";

/** Show a question only when another answer matches. */
export type ShowIf =
  | { question: string; equals: string }
  | { question: string; notEquals: string }
  | { question: string; includes: string }
  | { question: string; answered: true };

export type Question = {
  id: string;
  section: SectionId;
  label: string;
  help?: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
  showIf?: ShowIf;
  placeholder?: string;
  autoComplete?: string;
  /** An option that gets a small "Recommended" tag. */
  recommended?: string;
  /** Checkbox options that can't be combined with others (e.g. "None yet"). */
  exclusive?: string[];
  /** What the admin may change per link. */
  configurable?: { label?: boolean; options?: boolean };
  /** Short label used in the admin summary and email. */
  short?: string;
};

export type SectionId = "details" | "website" | "design" | "app" | "choice";

/** Sections the admin can pick per link (Your details and Your choice are always included). */
export const SELECTABLE_SECTIONS = ["website", "design", "app"] as const;
export type SelectableSectionId = (typeof SELECTABLE_SECTIONS)[number];

export type Visual = "scope" | "formats" | "app";

export type Section = {
  id: SectionId;
  /** Name used in lists, the admin and the PDF. */
  title: string;
  /** Big headline on the step (an orange full stop is added after it). */
  heading: string;
  intro: string;
  visual?: Visual;
  /** The service this section adds to "Which services would you like us to quote for?". */
  service?: string;
  /** Rough minutes to answer, used for the time estimate on the welcome screen. */
  minutes: number;
};

export const NOT_SURE = "Not sure, let's discuss";

export const SECTIONS: Record<SectionId, Section> = {
  details: {
    id: "details",
    title: "Your details",
    heading: "First, a little about you",
    intro: "So we know who we’re talking to, and where to send your copy of these answers.",
    minutes: 1,
  },
  website: {
    id: "website",
    title: "Website",
    heading: "Your website",
    intro:
      "Whether your website needs a few fixes or a completely fresh start, we’ll match the work to what you actually need. Pick the option that’s closest to what you have in mind. It doesn’t need to be exact.",
    visual: "scope",
    service: "Website",
    minutes: 3,
  },
  design: {
    id: "design",
    title: "Graphic design & social media",
    heading: "Design and social media",
    intro:
      "One design can work everywhere: on your feed, in your stories and printed on the noticeboard. Tell us roughly how much you need and how you’d like to work, and we’ll plan around it.",
    visual: "formats",
    service: "Graphic design & social media",
    minutes: 3,
  },
  app: {
    id: "app",
    title: "App / platform",
    heading: "Your app",
    intro:
      "Native iOS and Android apps from day one cost considerably more to build and to keep running. We usually recommend starting with a PWA: a web app people install from their browser and use just like a normal app. Launch it, test it with real people and learn what works. If it does well, we build the iOS and Android apps from the same codebase.",
    visual: "app",
    service: "App / platform",
    minutes: 3,
  },
  choice: {
    id: "choice",
    title: "Your choice",
    heading: "Your choice",
    intro:
      "We want to be upfront and genuine from day one, giving you complete flexibility and the freedom to decide exactly what you’d like us to take care of.",
    minutes: 1,
  },
};

/** Extras always offered in "Which services would you like us to quote for?". */
export const EXTRA_SERVICES = ["Video & photography", "Branding & logo design"];

/* ── Presets the admin can apply per link ─────────────────────────────────── */

export const WEBSITE_AREA_PRESETS: Record<string, { label: string; options: string[] }> = {
  general: {
    label: "General business",
    options: [
      "Homepage",
      "About / story",
      "Services or products",
      "Events",
      "News or blog",
      "Photos & gallery",
      "Bookings or online shop",
      "Contact & enquiries",
      "Mobile experience",
      "Updating it ourselves (admin)",
      "Speed & Google search",
      "Branding / logo",
      "Other",
    ],
  },
  masjid: {
    label: "Masjid / charity",
    options: [
      "Homepage",
      "About / story",
      "Prayer times / timetables",
      "Donations & building fund",
      "Events",
      "News or blog",
      "Photos & gallery",
      "Contact & enquiries",
      "Mobile experience",
      "Updating it ourselves (admin)",
      "Speed & Google search",
      "Branding / logo",
      "Other",
    ],
  },
  restaurant: {
    label: "Restaurant / café",
    options: [
      "Homepage",
      "About / story",
      "Menu",
      "Bookings",
      "Online ordering",
      "Photos & gallery",
      "Events",
      "Contact & location",
      "Mobile experience",
      "Updating it ourselves (admin)",
      "Speed & Google search",
      "Branding / logo",
      "Other",
    ],
  },
};

export const RECURRING_PRESETS: Record<string, { label: string; question: string; options: string[] }> = {
  general: {
    label: "General",
    question: "Do you need any recurring designs, like a monthly price list or schedule?",
    options: ["Yes, every month", "Only occasionally", "No", "Not sure"],
  },
  masjid: {
    label: "Masjid",
    question: "Do you need a monthly prayer timetable designed?",
    options: ["Yes, every month", "Only occasionally (e.g. Ramadan)", "No", "Not sure"],
  },
  restaurant: {
    label: "Restaurant",
    question: "Do you need menus or price lists designed and kept up to date?",
    options: ["Yes, every month", "Only occasionally (e.g. new dishes or offers)", "No", "Not sure"],
  },
};

export const AUDIENCE_PRESETS: Record<string, { label: string; options: string[] }> = {
  general: {
    label: "General",
    options: ["Our customers or members only", "Anyone in our community", "Anyone at all", NOT_SURE],
  },
  masjid: {
    label: "Masjid",
    options: ["Masjid members only", "Wider community", "Any UK Muslim", NOT_SURE],
  },
};

/* ── Questions ────────────────────────────────────────────────────────────── */

export const QUESTIONS: Question[] = [
  // Your details
  {
    id: "details_name",
    section: "details",
    label: "Your name",
    type: "text",
    required: true,
    autoComplete: "name",
    short: "Name",
  },
  {
    id: "details_role",
    section: "details",
    label: "Your role",
    help: "For example: trustee, owner, manager.",
    type: "text",
    autoComplete: "organization-title",
    short: "Role",
  },
  {
    id: "details_email",
    section: "details",
    label: "Email",
    help: "We’ll send a PDF copy of your answers here.",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "you@example.com",
    short: "Email",
  },
  {
    id: "details_phone",
    section: "details",
    label: "Phone or WhatsApp",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+44 7…",
    short: "Phone",
  },
  {
    id: "details_contact",
    section: "details",
    label: "Best way to reach you",
    type: "radio",
    options: ["WhatsApp", "Phone call", "Email"],
    required: true,
    short: "Contact by",
  },

  // Website
  {
    id: "website_url",
    section: "website",
    label: "Current website link",
    help: "Leave this blank if you don’t have a website yet.",
    type: "url",
    placeholder: "yourwebsite.com",
    short: "Current site",
  },
  {
    id: "website_scope",
    section: "website",
    label: "Which is closest to what you have in mind?",
    type: "radio",
    options: [
      "Refine the existing website",
      "Improve specific pages and sections",
      "Complete redesign or rebrand",
      NOT_SURE,
    ],
    required: true,
    short: "Website scope",
  },
  {
    id: "website_areas",
    section: "website",
    label: "Which areas need improvement?",
    help: "Tick as many as you like.",
    type: "checkbox",
    options: WEBSITE_AREA_PRESETS.general.options,
    configurable: { options: true },
    short: "Areas",
  },
  {
    id: "website_areas_other",
    section: "website",
    label: "What else needs improving?",
    type: "text",
    showIf: { question: "website_areas", includes: "Other" },
    short: "Other areas",
  },
  {
    id: "website_details",
    section: "website",
    label: "Tell us more: what isn’t working, and what should the website do?",
    type: "textarea",
    short: "Website notes",
  },

  // Graphic design & social media
  {
    id: "design_volume",
    section: "design",
    label: "About how many posters or designs do you need per month?",
    type: "radio",
    options: ["1–4", "5–8", "9–12", "More than 12", NOT_SURE],
    required: true,
    short: "Designs per month",
  },
  {
    id: "design_frequency",
    section: "design",
    label: "Regular every month, or as needed?",
    type: "radio",
    options: ["Regular every month", "Ad hoc, as needed", "Not sure"],
    short: "Frequency",
  },
  {
    id: "design_recurring",
    section: "design",
    label: RECURRING_PRESETS.general.question,
    type: "radio",
    options: RECURRING_PRESETS.general.options,
    configurable: { label: true, options: true },
    short: "Recurring designs",
  },
  {
    id: "design_accounts",
    section: "design",
    label: "Which social accounts do you already have?",
    type: "checkbox",
    options: ["Instagram", "Facebook", "YouTube", "TikTok", "WhatsApp channel", "LinkedIn", "None yet"],
    exclusive: ["None yet"],
    short: "Accounts",
  },
  {
    id: "design_setup",
    section: "design",
    label: "Do you need help setting accounts up?",
    type: "radio",
    options: ["Yes, please", "No, already set up", NOT_SURE],
    showIf: { question: "design_accounts", answered: true },
    short: "Account setup",
  },
  {
    id: "design_video",
    section: "design",
    label: "Graphics only, or shot and edited video too?",
    type: "radio",
    options: ["Graphics only", "Graphics and video", "Not sure"],
    short: "Graphics / video",
  },
  {
    id: "design_manage",
    section: "design",
    label: "Should we post and manage your social media?",
    type: "radio",
    options: ["Yes, please manage it", "No, we’ll post ourselves", "Not sure"],
    short: "Manage socials",
  },

  // App / platform
  {
    id: "app_approach",
    section: "app",
    label: "Which approach would you prefer?",
    type: "radio",
    options: ["PWA first, then iOS & Android if it works well", "Native iOS & Android from day one", NOT_SURE],
    recommended: "PWA first, then iOS & Android if it works well",
    required: true,
    short: "App approach",
  },
  {
    id: "app_purpose",
    section: "app",
    label: "What should the app do, and who is it for?",
    type: "textarea",
    short: "App purpose",
  },
  {
    id: "app_audience",
    section: "app",
    label: "Who should be able to use it?",
    type: "radio",
    options: AUDIENCE_PRESETS.general.options,
    configurable: { label: true, options: true },
    short: "Who can use it",
  },
  {
    id: "app_users",
    section: "app",
    label: "Roughly how many users in the first year?",
    type: "text",
    placeholder: "e.g. 200",
    short: "Users, year one",
  },
  {
    id: "app_owner",
    section: "app",
    label: "Who on your side would oversee it?",
    type: "text",
    short: "Owner",
  },
  {
    id: "app_rules",
    section: "app",
    label: "Anything it must do, or must never do?",
    type: "textarea",
    short: "Musts",
  },

  // Your choice (options for choice_services are generated per link)
  {
    id: "choice_services",
    section: "choice",
    label: "Which services would you like us to quote for?",
    help: "Tick as many as you like.",
    type: "checkbox",
    options: [],
    required: true,
    short: "Services",
  },
  {
    id: "choice_notes",
    section: "choice",
    label: "Anything else we should know?",
    help: "Budget, timings, people we should speak to: anything that helps.",
    type: "textarea",
    short: "Notes",
  },
];

/** Key answers shown at the top of the SKAYL notification email and the admin. */
export const SUMMARY_QUESTIONS = ["choice_services", "website_scope", "app_approach", "design_volume"];
