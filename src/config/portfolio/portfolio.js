export const IMAGES = {
  featured: {
    feature1: "/images/feature-1.webp",
    feature2: "/images/feature-2.webp",
    feature3: "/images/feature-3.webp",
    feature4: "/images/feature-4.webp",
    feature5: "/images/feature-5.webp",
  },
};

export const PORTFOLIO_HERO = {
  titleLines: [
    { light: "A COLLECTION OF THOUGHTS", bold: "" },
    { light: "TURNED INTO DESIGN!", bold: "" },
    
  ],
  primaryCta: { label: "Let's Work Together", href: "/contact" },
};
 
export const FEATURED_WORK = {
  title: "FEATURED WORK",
  description:
    "Whether you need one specialist or a combination of services, we can shape our team around your project.",

  cta: {
    label: "Let's Work Together",
    href: "/contact",
  },

  images: [
    { id: 1, src: IMAGES.featured.feature1, alt: "Creative branding artwork" },
    { id: 2, src: IMAGES.featured.feature2, alt: "Sanford branding project" },
    { id: 3, src: IMAGES.featured.feature3, alt: "Illustration project" },
    { id: 4, src: IMAGES.featured.feature4, alt: "Character illustration" },
    { id: 5, src: IMAGES.featured.feature5, alt: "Brand identity design" },
  ],
};
