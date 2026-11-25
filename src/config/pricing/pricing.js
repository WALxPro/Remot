export const IMAGES = {
 specificService : {
    service : "/images/pricing/brand.webp"
 }
};

export const PRICING_HERO = {
  titleLines: [
    { light: "PRICING", bold: "" },
  ],
};

export const PRICING = {
  title: "PRICING",

  plans: [
    {
      id: "basic",
      name: "BASIC",
      price: 50,
      currency: "$",
      period: "/mo",
      features: [
        "List item",
        "List item",
        "List item",
        "List item",
        "List item",
      ],
      cta: {
        label: "Get Started",
        href: "/contact",
      },
      variant: "basic",
    },
    {
      id: "premium",
      name: "PREMIUM",
      price: 50,
      currency: "$",
      period: "/mo",
      features: [
        "List item",
        "List item",
        "List item",
        "List item",
        "List item",
      ],
      cta: {
        label: "Get Started",
        href: "/contact",
      },
      variant: "premium",
    },
    {
      id: "special",
      name: "SPECIAL",
      price: 50,
      currency: "$",
      period: "/mo",
      features: [
        "List item",
        "List item",
        "List item",
        "List item",
        "List item",
      ],
      cta: {
        label: "Get Started",
        href: "/contact",
      },
      variant: "special",
    },
  ],
};


export const SPECIFIC_SERVICES = {
  title: "SPECIFIC SERVICES",
  packageTitle: "Make Your Own Package",

  image: {
    src: IMAGES.specificService.service,
    alt: "Creative design sketches",
  },

  services: [
    "Animation",
    "Video Editing",
    "Branding",
    "Ebook Design",
    "Illustration",
    "Social Media",
  ],
};
