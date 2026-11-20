
export const NAVBAR = {
  brand: {
    src: "/images/logo-remot.png",
    alt: "Studio Remot",
    href: "/",
  },

  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", megaMenu: true },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
  ],
};


// Generate URL-friendly slugs
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Creates a category and its subservice links
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
  // 01
  createCategory(
    "illustration-digital-art",
    "Illustration & Digital Art",
    [
      "Children's Book Illustrations",
      "Character Design & Development",
      "Digital Painting & Concept Art",
      "Book Cover Design",
      "Comic Book & Graphic Novel Illustrations",
      "Fantasy & DnD Character Art",
      "Storyboarding",
      "Custom Illustrations",
    ]
  ),

  // 02
  createCategory(
    "2d-3d-animation",
    "2D & 3D Animation",
    [
      "2D Character Animation",
      "3D Modeling & Asset Creation",
      "Motion Graphics",
      "Animated Explainer Videos",
      "Logo Animation",
      "Character Rigging & Animation",
    ]
  ),

  // 03
  createCategory(
    "book-design-publishing",
    "Book Design & Publishing",
    [
      "Ebook Design & Formatting",
      "Book Layout & Typesetting",
      "Children's Book Formatting",
      "Print-Ready Book Design",
      "KDP Publishing Formatting",
    ]
  ),

  // 04
  createCategory(
    "graphic-design-branding",
    "Graphic Design & Branding",
    [
      "Logo Design",
      "Brand Identity Design",
      "Social Media Graphics",
      "Marketing & Advertising Designs",
      "Posters, Flyers & Banners",
      "Business Cards & Stationery",
    ]
  ),

  // 05
  createCategory(
    "video-editing-post-production",
    "Video Editing & Post-Production",
    [
      "Professional Video Editing",
      "YouTube Video Editing",
      "Social Media Reels & Shorts",
      "Promotional & Advertisement Videos",
      "Color Grading & Visual Effects",
    ]
  ),

  // 06 - DUMMY
  createCategory(
    "website-design-development",
    "Website Design & Development",
    [
      "Custom Website Development",
      "WordPress Development",
      "Ecommerce Website Design",
      "Landing Page Design",
      "Website Redesign",
      "Website Maintenance",
    ]
  ),

  // 07 - DUMMY
  createCategory(
    "ui-ux-design",
    "UI/UX Design",
    [
      "Website UI Design",
      "Mobile App UI Design",
      "User Experience Research",
      "Wireframing & Prototyping",
      "Dashboard Design",
    ]
  ),

  // 08 - DUMMY
  createCategory(
    "digital-marketing",
    "Digital Marketing",
    [
      "Digital Marketing Strategy",
      "Social Media Marketing",
      "Email Marketing",
      "Content Marketing",
      "Influencer Marketing",
    ]
  ),

  // 09 - DUMMY
  createCategory(
    "seo-search-marketing",
    "SEO & Search Marketing",
    [
      "On-Page SEO",
      "Technical SEO",
      "Keyword Research",
      "Link Building",
      "Local SEO",
    ]
  ),

  // 10 - DUMMY
  createCategory(
    "content-writing-copywriting",
    "Content Writing & Copywriting",
    [
      "Website Copywriting",
      "Blog & Article Writing",
      "Product Descriptions",
      "Advertising Copywriting",
      "SEO Content Writing",
    ]
  ),

  // 11 - DUMMY
  createCategory(
    "social-media-management",
    "Social Media Management",
    [
      "Social Media Strategy",
      "Content Calendar Planning",
      "Instagram Management",
      "Facebook Page Management",
      "Social Media Content Creation",
    ]
  ),

  // 12 - DUMMY
  createCategory(
    "photography-retouching",
    "Photography & Retouching",
    [
      "Product Photography",
      "Photo Retouching",
      "Background Removal",
      "Image Color Correction",
      "Creative Photo Manipulation",
    ]
  ),

  // 13 - DUMMY
  createCategory(
    "presentation-design",
    "Presentation Design",
    [
      "PowerPoint Presentation Design",
      "Pitch Deck Design",
      "Business Presentation Design",
      "Investor Deck Design",
    ]
  ),

  // 14 - DUMMY
  createCategory(
    "packaging-label-design",
    "Packaging & Label Design",
    [
      "Product Packaging Design",
      "Food Packaging Design",
      "Label & Sticker Design",
      "Box & Carton Design",
    ]
  ),

  // 15 - DUMMY
  createCategory(
    "advertising-campaign-design",
    "Advertising & Campaign Design",
    [
      "Google Ads Creatives",
      "Facebook Ads Creatives",
      "Instagram Ads Design",
      "Banner Advertising Design",
      "Campaign Visual Design",
    ]
  ),

  // 16 - DUMMY
  createCategory(
    "audio-editing-production",
    "Audio Editing & Production",
    [
      "Podcast Editing",
      "Audio Cleanup",
      "Voiceover Editing",
      "Sound Design",
    ]
  ),

  // 17 - DUMMY
  createCategory(
    "mobile-app-development",
    "Mobile App Development",
    [
      "Android App Development",
      "iOS App Development",
      "Cross-Platform App Development",
      "App Maintenance",
    ]
  ),

  // 18 - DUMMY
  createCategory(
    "3d-visualization-rendering",
    "3D Visualization & Rendering",
    [
      "3D Product Rendering",
      "Architectural Visualization",
      "Interior 3D Rendering",
      "3D Environment Design",
    ]
  ),

  // 19 - DUMMY
  createCategory(
    "merchandise-apparel-design",
    "Merchandise & Apparel Design",
    [
      "T-Shirt Design",
      "Hoodie & Sweatshirt Design",
      "Custom Merchandise Artwork",
      "Print-On-Demand Design",
    ]
  ),

  // 20 - DUMMY
  createCategory(
    "creative-strategy-consulting",
    "Creative Strategy & Consulting",
    [
      "Creative Direction",
      "Brand Strategy",
      "Visual Content Strategy",
      "Creative Campaign Planning",
      "Brand Audit & Consultation",
    ]
  ),
];

export const FOOTER = {
  brand: {
    logo: { src: "logo.png", alt: "Studio Remot" },
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
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Illustration", href: "/services/illustration" },
        { label: "Book Cover Design", href: "/services/book-cover-design" },
        { label: "Social Media Design", href: "/services/social-media-design" },
        {
          label: "SEO & Digital Marketing",
          href: "/services/seo-digital-marketing",
        },
        { label: "2D Explainer Videos", href: "/services/2d-explainer-videos" },
        { label: "Motion Graphics", href: "/services/motion-graphics" },
        {
          label: "Hand-Drawn 2D Animation",
          href: "/services/hand-drawn-2d-animation",
        },
        { label: "3D Assets", href: "/services/3d-assets" },
        { label: "Video Editing", href: "/services/video-editing" },
        { label: "Web Development", href: "/services/web-development" },
      ],
    },
  ],
  contact: {
    title: "Contact",
    items: [
      { label: "hello@kreativon.com", href: "mailto:hello@kreativon.com" },
      { label: "+62 862-3456-9999", href: "tel:+628623456999" },
      { label: "Indonesia" },
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
