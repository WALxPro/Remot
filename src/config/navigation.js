export const NAVBAR = {
  brand: {
    src: "/images/logo-remot.png",
    alt: "Studio Remot",
    href: "/",
  },
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
  ],
};

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
