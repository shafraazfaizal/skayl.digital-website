// Privacy Policy and Terms of Service — written for how this site actually
// works: no analytics or advertising cookies, fonts self-hosted, the contact
// form sent through Resend, the site hosted on Vercel, email on Hostinger.
// If any of that changes (e.g. analytics are added), update the policy too.

export type LegalBlock = { type: "p"; text: string } | { type: "list"; items: string[] };
export type LegalSection = { id: string; heading: string; blocks: LegalBlock[] };
export type LegalDoc = {
  title: string;
  updated: string;
  summary: string[];
  sections: LegalSection[];
};

const EMAIL = "hello@skayl.digital";
const UPDATED = "28 September 2026";

// The legal name of the business behind SKAYL. If SKAYL is registered as a
// company, put its registered name and number here (e.g. "SKAYL Ltd, company
// no. 12345678") — it then appears in both documents.
export const legalEntity = "SKAYL";

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  updated: UPDATED,
  summary: [
    "We only collect what you send us, and use it to reply and do the work.",
    "No tracking, no analytics or advertising cookies, and we never sell your data.",
    "You can ask us to see, correct or delete your data at any time.",
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${legalEntity} (“SKAYL”, “we”, “us”) is a creative studio working across the UK and Sri Lanka. We’re responsible for the personal data described in this policy. If you have any question about it, email ${EMAIL}.`,
        },
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect",
      blocks: [
        { type: "p", text: "When you use our contact form, we collect what you enter:" },
        {
          type: "list",
          items: [
            "Your name and email address",
            "What you need help with, and your timeline and budget if you choose to share them",
            "Your message about the project",
          ],
        },
        {
          type: "p",
          text: "If you email, call or message us, we keep that correspondence. If you become a client, we also hold what’s needed to deliver the project and bill for it — contact details, project materials you share, quotes and invoices.",
        },
        {
          type: "p",
          text: "Like any website, our hosting provider records basic technical information (such as your IP address, browser and the pages requested) in server logs, to keep the site running and secure. Our contact form also briefly uses your IP address to block spam; it isn’t stored.",
        },
      ],
    },
    {
      id: "how-we-use-it",
      heading: "How we use it — and why we’re allowed to",
      blocks: [
        {
          type: "list",
          items: [
            "To reply to your enquiry and discuss a possible project — because you asked us to (steps before a contract / our legitimate interests)",
            "To deliver the work you’ve hired us for — to perform our contract with you",
            "To keep business, tax and accounting records — because the law requires it",
            "To keep the website secure and free of spam — our legitimate interests",
          ],
        },
        {
          type: "p",
          text: "We don’t send marketing emails unless you’ve asked to receive them, and we never sell or rent your personal data to anyone.",
        },
      ],
    },
    {
      id: "who-we-share-it-with",
      heading: "Who we share it with",
      blocks: [
        { type: "p", text: "We use a small number of trusted providers to run the studio. They only process your data to provide their service to us:" },
        {
          type: "list",
          items: [
            "Resend — sends the emails from our contact form",
            "Vercel — hosts this website",
            "Hostinger — hosts our domain and email",
            "Google (Gmail) — where we read and reply to email",
          ],
        },
        {
          type: "p",
          text: "Some of these providers store data outside the UK, including in the United States. Where that happens, the transfer is protected by the safeguards UK data protection law requires, such as standard contractual clauses.",
        },
        { type: "p", text: "We may also share information where the law requires us to." },
      ],
    },
    {
      id: "cookies",
      heading: "Cookies",
      blocks: [
        {
          type: "p",
          text: "This website doesn’t use analytics, advertising or tracking cookies, and our fonts are served from our own site rather than a third party. If that ever changes, we’ll update this policy and ask for your consent where required.",
        },
      ],
    },
    {
      id: "how-long",
      heading: "How long we keep it",
      blocks: [
        {
          type: "list",
          items: [
            "Enquiries that don’t become projects — up to 24 months, then deleted",
            "Client and project records — for as long as the law requires for tax and accounting purposes (typically six years)",
            "Server logs — kept by our hosting provider for a short period, for security",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        { type: "p", text: "You can ask us to:" },
        {
          type: "list",
          items: [
            "See the personal data we hold about you",
            "Correct anything that’s wrong",
            "Delete your data, where we don’t need to keep it",
            "Restrict or object to how we use it",
            "Give you your data in a portable format",
          ],
        },
        {
          type: "p",
          text: `Email ${EMAIL} and we’ll respond within one month. If you’re unhappy with how we’ve handled your data, you can complain to the UK Information Commissioner’s Office (ico.org.uk). If you’re in Sri Lanka, you also have rights under the Personal Data Protection Act, No. 9 of 2022.`,
        },
      ],
    },
    {
      id: "security",
      heading: "Keeping it safe",
      blocks: [
        {
          type: "p",
          text: "We use reputable providers, encrypted connections and access limited to the people doing the work. No system is perfectly secure, but we take care to protect what you share with us.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [{ type: "p", text: "If we change how we handle personal data, we’ll update this page and the date at the top." }],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of Service",
  updated: UPDATED,
  summary: [
    "These terms cover using this website.",
    "Project work is agreed separately, in writing, before anything starts.",
    "Our site and its content are ours; client work shown here belongs to our clients.",
  ],
  sections: [
    {
      id: "about",
      heading: "About these terms",
      blocks: [
        {
          type: "p",
          text: `These terms apply to your use of skayl.digital, run by ${legalEntity} (“SKAYL”, “we”, “us”). By using the site, you agree to them. If you don’t agree, please don’t use the site.`,
        },
      ],
    },
    {
      id: "working-with-us",
      heading: "Working with us",
      blocks: [
        {
          type: "p",
          text: "Sending an enquiry doesn’t create a contract. Every project starts with a written quote setting out the scope, timeline and cost. The work, payments and ownership of what we make are governed by that quote and any agreement we sign together — and if anything there differs from these terms, the project agreement wins.",
        },
      ],
    },
    {
      id: "our-content",
      heading: "Our content and work shown here",
      blocks: [
        {
          type: "p",
          text: "The design, code, text, graphics and the SKAYL name and wordmark on this site belong to SKAYL. You’re welcome to share links to our pages, but please don’t copy, republish or reuse our content without permission.",
        },
        {
          type: "p",
          text: "Client names, logos and project work shown in our portfolio belong to those clients and are shown to illustrate the work we did for them.",
        },
      ],
    },
    {
      id: "articles",
      heading: "Articles and information",
      blocks: [
        {
          type: "p",
          text: "Our Studio Notes and other content are shared for general information. They aren’t professional, legal or financial advice. Where an article discusses Islamic principles, it explains why we work the way we do; for religious rulings, please refer to qualified scholars.",
        },
      ],
    },
    {
      id: "using-the-site",
      heading: "Using the site",
      blocks: [
        { type: "p", text: "Please don’t:" },
        {
          type: "list",
          items: [
            "Use the site for anything unlawful or harmful",
            "Try to break, overload or gain unauthorised access to the site",
            "Send spam or misleading information through our contact form",
          ],
        },
      ],
    },
    {
      id: "links",
      heading: "Links to other sites",
      blocks: [
        {
          type: "p",
          text: "We link to client websites and other services. We’re not responsible for their content or how they handle your data.",
        },
      ],
    },
    {
      id: "liability",
      heading: "Our responsibility",
      blocks: [
        {
          type: "p",
          text: "We work hard to keep the site accurate and available, but it’s provided “as is”, and we can’t promise it will always be error-free or uninterrupted. As far as the law allows, we’re not liable for any loss arising from using this website. Nothing in these terms limits liability that can’t legally be limited, such as for fraud or for death or personal injury caused by negligence.",
        },
      ],
    },
    {
      id: "privacy",
      heading: "Your privacy",
      blocks: [{ type: "p", text: "How we handle personal data is explained in our Privacy Policy." }],
    },
    {
      id: "law",
      heading: "Governing law",
      blocks: [
        {
          type: "p",
          text: "These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction over any dispute about them — unless a project agreement says otherwise.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes and contact",
      blocks: [
        {
          type: "p",
          text: `We may update these terms from time to time; the date at the top shows the latest version. Questions? Email ${EMAIL}.`,
        },
      ],
    },
  ],
};
