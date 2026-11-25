export const IMAGES = {
  services: {
    animation: "/images/home/animation.webp",
    videoEditing: "/images/home/video-editing.webp",
    branding: "/images/home/branding.webp",
    ebookDesign: "/images/home/ebook-design.webp",
    illustration: "/images/home/illustration.webp",
    socialMedia: "/images/home/social-media.webp",
  },
  about: {
    leftBackground: "/images/home/aboutLeft.webp",
    rightBackground: "/images/home/aboutRight.webp",
    buildHumanBrands: "/images/home/build-human-brands.webp",
    creativeAgency: "/images/home/creative-agency.webp",
  },
  whyUs: {
    whyUs: "/images/home/why-us.webp",
  },
  serviceShowcase: {
    illustrations: "/images/home/illustrations-service.webp",
    bookCover: "/images/home/book-cover-service.webp",
    socialMedia: "/images/home/social-media-service.webp",
    seoDigitalMarketing: "/images/home/seo-digital-marketing-service.webp",
  },
  portfolio: {
    background: "/images/shared/hero.webp",
    mood: "/images/home/mood.webp",
    zine: "/images/home/zine.webp",
    branding: "/images/home/brand.webp",
    shades: "/images/home/shades.webp",
    notToday: "/images/home/not-today.webp",
  },

  clients: {
    isuzu: "/images/home/client-1.webp",
    fujifilm: "/images/home/client-2.webp",
    dubaiLimited: "/images/home/client-3.webp",
    latdour: "/images/home/client-4.webp",
    emiratesSteel: "/images/home/client-5.webp",
  },
  creative: {
    creative1: "/images/home/creative-1.webp",
    creative2: "/images/home/creative-2.webp",
    creative3: "/images/home/creative-3.webp",
    creative4: "/images/home/creative-4.webp",
  },
  pricing: {
    premiumBackground: "/images/shared/pricing-card.webp",
  },
};

export const HERO = {
  titleLines: [
    { light: "YOUR", bold: "CREATIVE TEAM." },
    { light: "ALL IN ONE", bold: "PLACE." },
  ],
  description:
    "From illustration and animation to design, marketing, and web development, Studio Remot brings the right creative people together for your project without the hassle of hiring a different specialist for every task.",
  primaryCta: { label: "Explore Our Services", href: "/services" },
  secondaryCta: { label: "Let's Work Together", href: "/contact" },
};

export const SERVICES = [
  { id: "animation", label: "Animation", icon: IMAGES.services.animation },
  {
    id: "video-editing",
    label: "Video Editing",
    icon: IMAGES.services.videoEditing,
  },
  { id: "branding", label: "Branding", icon: IMAGES.services.branding },
  {
    id: "ebook-design",
    label: "Ebook Design",
    icon: IMAGES.services.ebookDesign,
  },
  {
    id: "illustration",
    label: "Illustration",
    icon: IMAGES.services.illustration,
  },
  {
    id: "social-media",
    label: "Social Media",
    icon: IMAGES.services.socialMedia,
  },
];

export const ABOUT = {
  eyebrow: "A bit about us",
  highlight: "Great work",
  text: " does not need everyone in the same office. At Studio Remot, we connect businesses, authors, creators, and growing brands with a remote team of artists, designers, and digital specialists. One studio, multiple skills, and a simpler way to bring your ideas to life.",
  cta: { label: "Learn More", href: "/about" },

  images: [
    {
      side: "left",
      src: IMAGES.about.buildHumanBrands,
      background: IMAGES.about.leftBackground,
      alt: "Build human brands",
    },
    {
      side: "right",
      src: IMAGES.about.creativeAgency,
      background: IMAGES.about.rightBackground,
      alt: "Creative agency",
    },
  ],
};

export const WHY_US = {
  title: "WHY WORK WITH US?",
  items: [
    {
      id: "one-team",
      title: "ONE TEAM, MANY SKILLS",
      description:
        "Get creative and digital services under one roof instead of managing multiple freelancers.",
    },
    {
      id: "remote",
      title: "BUILT FOR REMOTE COLLABORATION",
      description:
        "Our workflow is designed for remote teamwork, so projects move smoothly across time zones.",
    },
    {
      id: "flexible",
      title: "FLEXIBLE FOR DIFFERENT PROJECTS",
      description:
        "Whether it is a single design or a full brand launch, we scale the team to fit your project.",
    },
    {
      id: "quality",
      title: "CREATIVE QUALITY WITH PRACTICAL THINKING",
      description:
        "We balance strong creative ideas with practical decisions that fit your goals and budget.",
    },
  ],
  image: {
    src: IMAGES.whyUs.whyUs,
    alt: "Abstract pink waves",
  },
  cta: {
    label: "Get In Touch",
    href: "/contact",
  },
};

export const SERVICE_SHOWCASE = {
  eyebrow: "Our Services",
  title: ["This is", "our thing!"],
  description:
    "Whether you need one specialist or a combination of services, we can shape our team around your project.",
  cta: { label: "Explore Our Services", href: "/services" },
  cards: [
    {
      id: "illustrations",
      label: "Illustrations",
      image: IMAGES.serviceShowcase.illustrations,
    },
    {
      id: "book-cover",
      label: "Book Cover",
      image: IMAGES.serviceShowcase.bookCover,
    },
    {
      id: "social-media",
      label: "Social Media",
      image: IMAGES.serviceShowcase.socialMedia,
    },
    {
      id: "branding",
      label: "Branding",
      image: IMAGES.portfolio.branding,
    },
  ],
};

export const PORTFOLIO = {
  title: ["Our", "Portfolio"],
  cta: { label: "View More", href: "/portfolio" },
  items: [
    { id: "mood", label: "Mood Project", image: IMAGES.portfolio.mood },
    { id: "zine", label: "Zine Project", image: IMAGES.portfolio.zine },
    {
      id: "branding",
      label: "Branding Project",
      image: IMAGES.portfolio.branding,
    },
    { id: "shades", label: "Campaign Project", image: IMAGES.portfolio.shades },
    {
      id: "not-today",
      label: "Poster Project",
      image: IMAGES.portfolio.notToday,
    },
  ],
};

export const CLIENTS = {
  title: "OUR CLIENTS",
  logos: [
    { id: "isuzu", name: "Isuzu", image: IMAGES.clients.isuzu },
    { id: "fujifilm", name: "Fujifilm", image: IMAGES.clients.fujifilm },
    {
      id: "dubai-limited",
      name: "Dubai Limited Investment",
      image: IMAGES.clients.dubaiLimited,
    },
    { id: "latdour", name: "Latdour", image: IMAGES.clients.latdour },
    {
      id: "emirates-steel",
      name: "Emirates Steel",
      image: IMAGES.clients.emiratesSteel,
    },
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
  ],
};
