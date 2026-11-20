export const IMAGES = {
  // Existing image configurations...

  journey: {
    team: "/images/journey-about.webp",
  },
};
export const ABOUT_HERO = {
  titleLines: [
    { light: "GET TO KNOW", bold: "" },
    { light: "REMOT STUDIO", bold: "" },
  ],
  primaryCta: { label: "Explore Our Services", href: "/services" },
  secondaryCta: { label: "Let's Work Together", href: "/contact" },
};

export const OUR_JOURNEY = {
  title: "OUR JOURNEY",

  description: [
    "Studio Remot started with a simple idea, great creative work should not be limited by location, and finding the right people for a project should not be complicated.",

    "After working remotely with clients across different creative projects, our founder saw how often businesses and individuals needed several specialists at once, an illustrator for one task, a designer for another, an animator for the next. Hiring and coordinating everyone separately takes time, effort, and resources.",
  ],

  cta: {
    label: "Let's Work Together",
    href: "/contact",
  },

  image: {
    src: IMAGES.journey.team,
    alt: "Creative team working together",
  },

  stats: [
    { value: "200+", label: "Project Completed" },
    { value: "9+", label: "Year Experience" },
    { value: "15K", label: "Happy Customer" },
    { value: "56+", label: "Achievements" },
  ],
};