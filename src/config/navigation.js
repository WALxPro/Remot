export const NAVBAR = {
  brand: {
    src: "/images/shared/logo-remot.png",
    alt: "Studio Remot",
    href: "/",
  },

  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", megaMenu: true },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const createCategory = (id, title, services) => ({
  id,
  title,
  href: `/services/${id}`,
  items: services.map((label) => ({
    label,
    href: `/services/${slugify(label)}`,
  })),
});

export const SERVICE_MEGA_MENU = [
  // 01 - ILLUSTRATION & DIGITAL ART
  createCategory("illustration-digital-art", "Illustration & Digital Art", [
    "Children's Book Illustrations",
    "Character Design & Development",
    "Digital Painting & Concept Art",
    "Book Cover Design",
    "Comic Book & Graphic Novel Illustrations",
    "Fantasy & DnD Character Art",
    "Storyboarding",
    "Custom Illustrations",
  ]),

  // 02 - 2D & 3D ANIMATION
  createCategory("2d-3d-animation", "2D & 3D Animation", [
    "2D Character Animation",
    "3D Modeling & Asset Creation",
    "Motion Graphics",
    "Animated Explainer Videos",
    "Logo Animation",
    "Character Rigging & Animation",
  ]),

  // 03 - BOOK DESIGN & PUBLISHING
  createCategory("book-design-publishing", "Book Design & Publishing", [
    "Ebook Design & Formatting",
    "Book Layout & Typesetting",
    "Children's Book Formatting",
    "Print-Ready Book Design",
    "KDP Publishing Formatting",
  ]),

  // 04 - GRAPHIC DESIGN & BRANDING
  createCategory("graphic-design-branding", "Graphic Design & Branding", [
    "Logo Design",
    "Brand Identity Design",
    "Social Media Graphics",
    "Marketing & Advertising Designs",
    "Posters, Flyers & Banners",
    "Business Cards & Stationery",
  ]),

  // 05 - VIDEO EDITING & POST-PRODUCTION
  createCategory(
    "video-editing-post-production",
    "Video Editing & Post-Production",
    [
      "Professional Video Editing",
      "YouTube Video Editing",
      "Social Media Reels & Shorts",
      "Promotional & Advertisement Videos",
      "Color Grading & Visual Effects",
    ],
  ),

  // 06 - WEBSITE DESIGN & DEVELOPMENT
  createCategory("website-design-development", "Website Design & Development", [
    "Website Development",
    "Business Websites",
    "E-Commerce Development",
    "Custom Websites",
    "Landing Pages",
  ]),

  // 07 - CHATBOT DEVELOPMENT
  createCategory("chatbot-development", "Chatbot Development", [
    "AI Chatbot",
    "Rules Based Chatbot",
  ]),

  // 08 - DIGITAL MARKETING
  createCategory("digital-marketing", "Digital Marketing", [
    "Search Engine Optimization (SEO)",
    "Social Media Marketing & Management",
    "Google Ads & PPC Advertising",
    "Meta Ads (Facebook & Instagram)",
    "Content Marketing & Strategy",
    "Email Marketing & Automation",
    "Influencer Marketing & Outreach",
    "Digital Marketing Strategy & Consulting",
    "Conversion Rate Optimization (CRO)",
    "Analytics, Tracking & Performance Reporting",
  ]),

  // 09 - MOBILE APP DEVELOPMENT
  createCategory("mobile-app-development", "Mobile App Development", [
    "Cross-platform Development",
    "Android App Development",
    "iOS App Development",
    "Mobile App Maintenance",
  ]),

  // 10 - SOFTWARE DEVELOPMENT
  createCategory("software-development", "Software Development", [
    "Full Stack Web Apps",
    "Automations & Agents",
    "APIs & Integrations",
    "Databases",
    "QA & Review",
    "User Testing",
  ]),

  // 11 - CLOUD
  createCategory("cloud", "Cloud", ["Cloud Computing", "DevOps Engineering"]),

  // 12 - WEBSITE MAINTENANCE
  createCategory("website-maintenance", "Website Maintenance", [
    "Website Customization",
    "Bug Fixes",
    "Backup & Migration",
    "Speed Optimization",
  ]),

  // 13 - AI DEVELOPMENT
  createCategory("ai-development", "AI Development", [
    "AI Websites & Software",
    "AI Mobile Apps",
    "AI Integrations",
    "AI Agents",
    "AI Technology Consulting",
  ]),
];

export const FOOTER = {
  brand: {
    logo: {
      src: "/images/shared/logo-remot.png",
      alt: "Studio Remot",
    },
    tagline: "Creativity Has No Borders",
  },

  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Contact", href: "/contact" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog", href: "/blog" },
      ],
    },

    {
      title: "Services",
      links: SERVICE_MEGA_MENU.map((category) => ({
        label: category.title,
        href: category.href,
      })),
    },
  ],

  contact: {
    title: "Contact",
    items: [
      {
        label: "hello@kreativon.com",
        href: "mailto:hello@kreativon.com",
      },
      {
        label: "+62 862-3456-9999",
        href: "tel:+628623456999",
      },
      {
        label: "Indonesia",
      },
    ],
  },

  social: {
    title: "Social Links",
    links: [
      {
        id: "instagram",
        label: "Instagram",
        href: "https://instagram.com",
      },
      {
        id: "twitter",
        label: "Twitter",
        href: "https://twitter.com",
      },
      {
        id: "facebook",
        label: "Facebook",
        href: "https://facebook.com",
      },
    ],
  },

  watermark: "Remot Studio",
  copyright: "Studio Remot. All rights reserved.",
};
