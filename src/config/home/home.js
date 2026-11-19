export const IMAGES = {
  hero: "/images/hero.webp",

  services: {
    animation: "/images/animation.webp",
    videoEditing: "/images/video-editing.webp",
    branding: "/images/branding.webp",
    ebookDesign: "/images/ebook-design.webp",
    illustration: "/images/illustration.webp",
    socialMedia: "/images/social-media.webp",
  },
  about: {
    leftBackground: "/images/aboutLeft.webp",
    rightBackground: "/images/aboutRight.webp",
    buildHumanBrands: "/images/build-human-brands.webp",
    creativeAgency: "/images/creative-agency.webp",
  },
  whyUs: {
    whyUs: "/images/why-us.webp",
  },
  serviceShowcase: {
    illustrations: "/images/illustrations-service.webp",
    bookCover: "/images/book-cover-service.webp",
    socialMedia: "/images/social-media-service.webp",
    seoDigitalMarketing: "/images/seo-digital-marketing-service.webp",
  },
  portfolio: {
    background: "/images/portfolio-bg.webp",
    mood: "/images/mood.webp",
    zine: "/images/zine.webp",
    branding: "/images/brand.webp",
    shades: "/images/shades.webp",
    notToday: "/images/not-today.webp",
  },

clients: {
  isuzu: "/images/client-1.webp",
  fujifilm: "/images/client-2.webp",
  dubaiLimited: "/images/client-3.webp",
  latdour: "/images/client-4.webp",
  emiratesSteel: "/images/client-5.webp",
},
creative: {
  creative1: "/images/creative-1.webp",
  creative2: "/images/creative-2.webp",
  creative3: "/images/creative-3.webp",
  creative4: "/images/creative-4.webp",
},
pricing: {
  glow: "/images/pricing-glow.webp",
  leftDecoration: "/images/pricng-left.webp",
  rightDecoration: "/images/pricng-right.webp",
  premiumBackground: "/images/portfolio-bg.webp",
},

  // IMAGES object ke andar add karein
  faq: {
    background: "/images/faq-bg.webp",
  },
  contact: {
    image: "/images/contact.webp",
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

export const FAQ = {
  title: { light: "Most asked", bold: "Questions!" },
  defaultOpenId: "services",
  items: [
    {
      id: "services",
      question: "What digital services do you offer?",
      answer:
        "We offer a range of creative and digital services, including branding, graphic design, website development, mobile app development, digital marketing, animation, and social media design.",
    },
    {
      id: "process",
      question: "How does your creative process work?",
      answer:
        "We start with a short discovery call, then move through concept, design, and revisions. You stay in the loop at every stage, and we only finalize once you are happy.",
    },
    {
      id: "brand-identity",
      question: "Can you create a brand identity from scratch?",
      answer:
        "Yes. From logo and color palette to typography and brand guidelines, we build a complete identity that fits your audience and goals.",
    },
    {
      id: "timeline",
      question: "How long does a typical project take?",
      answer:
        "It depends on the scope. A single design can take a few days, while a full brand launch usually takes a few weeks. We share a clear timeline before we start.",
    },
  ],
};

export const CONTACT = {
  title: "Have an idea\nin mind?",
  description:
    "Tell us what you need, and we'll help you figure out the next step.",
  image: { src: IMAGES.contact.image, alt: "Abstract pink 3D ribbon" },
  submitLabel: "Send",
  successMessage: "Thank you! We will get back to you soon.",
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      autoComplete: "given-name",
    },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
    {
      name: "service",
      label: "Service",
      type: "select",
      options: [
        "Animation",
        "Video Editing",
        "Branding",
        "Ebook Design",
        "Illustration",
        "Social Media",
      ],
    },
    { name: "message", label: "Message", type: "textarea", fullWidth: true },
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
