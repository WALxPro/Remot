
export const IMAGES = {
  journey: {
    team: "/images/journey-about.webp",
  },

  aboutUs: {
    bookmark: "/images/bookmark.webp",
    artist: "/images/artist.webp",
    chess: "/images/chess.webp",
  },

  missionVision: {
    first: "/images/approch-1.webp",
    second: "/images/approch-2.webp",
    third: "/images/approch-3.webp",
  },
};

export const ABOUT_US = {
  segments: [
    { id: 1, type: "text", content: "WE'RE A REMOTE CREATIVE STUDIO" },
    {
      id: 2,
      type: "image",
      src: IMAGES.aboutUs.bookmark,
      alt: "",
      width: 95,
      height: 95,
      className: "h-[1.5em]",
    },
    {
      id: 3,
      type: "text",
      content: "BRINGING",
    },
    {
      id: 4,
      type: "image",
      src: IMAGES.aboutUs.artist,
      alt: "Artist typography",
      width: 190,
      height: 75,
      className: "h-[1.15em]",
    },
    {
      id: 5,
      type: "text",
      content: "DESIGNERS, ANIMATORS, DEVELOPERS AND STRATEGISTS TOGETHER",
    },
    {
      id: 6,
      type: "image",
      src: IMAGES.aboutUs.chess,
      alt: "",
      width: 240,
      height: 100,
      className: "h-[1.35em]",
    },
    {
      id: 7,
      type: "text",
      content: "TO MAKE GREAT THINGS HAPPEN.",
    },
  ],
};

export const ABOUT_HERO = {
  titleLines: [
    { light: "GET TO KNOW", bold: "" },
    { light: "REMOT STUDIO", bold: "" },
  ],
  primaryCta: {
    label: "Explore Our Services",
    href: "/services",
  },
  secondaryCta: {
    label: "Let's Work Together",
    href: "/contact",
  },
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

export const MISSION_VISION = {
  content: {
    mission: {
      number: "01",
      title: "OUR MISSION",
      description:
        "To make professional creative services more accessible and easier to manage by bringing talented remote specialists together under one studio.",
    },

    approach: {
      number: "02",
      title: "OUR APPROACH",
      description:
        "Our approach is straightforward: listen carefully, communicate clearly, and create work that feels right for the people it is made for.",
    },

    vision: {
      number: "03",
      title: "OUR VISION",
      description:
        "To build a trusted creative team that helps ideas travel beyond borders — giving clients the support of multiple disciplines without the complexity of building an in-house team.",
    },
  },

  images: {
    first: {
      src: IMAGES.missionVision.first,
      alt: "Be heard and be seen creative artwork",
    },

    second: {
      src: IMAGES.missionVision.second,
      alt: "Studio Remot creative logo artwork",
    },

    third: {
      src: IMAGES.missionVision.third,
      alt: "Create typography artwork",
    },
  },
};

export const MISSION_VISION_BLOCKS = [
  {
    id: "image-1",
    type: "image",
    data: MISSION_VISION.images.first,
  },
  {
    id: "approach",
    type: "content",
    data: MISSION_VISION.content.approach,
  },
  {
    id: "image-2",
    type: "image",
    data: MISSION_VISION.images.second,
  },
  {
    id: "mission",
    type: "content",
    data: MISSION_VISION.content.mission,
  },
  {
    id: "image-3",
    type: "image",
    data: MISSION_VISION.images.third,
  },
  {
    id: "vision",
    type: "content",
    data: MISSION_VISION.content.vision,
  },
];
