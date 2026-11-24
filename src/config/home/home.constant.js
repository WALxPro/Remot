import { IMAGES } from "./home";

export const CREATIVE_IMAGES = [
  {
    src: IMAGES.creative.creative4,
    zIndex: 10,
    scale: 0.82,
    x: -15,
    y: 15,
  },
  {
    src: IMAGES.creative.creative3,
    zIndex: 20,
    scale: 1.1,
    x: 20,
    y: -8,
  },
  {
    src: IMAGES.creative.creative2,
    zIndex: 30,
    scale: 0.94,
    x: -10,
    y: 5,
  },
  {
    src: IMAGES.creative.creative1,
    zIndex: 40,
    scale: 1,
    x: 0,
    y: 0,
  },
];

export const IMAGE_POSITIONS = {
  left: {
    wrapper: "left-0 bottom-[-20%]",
    background: "left-0 top-1/2 -translate-y-1/2 origin-left scale-[0.6]",
    image: "left-0 top-1/2 -translate-y-1/2",
  },
  right: {
    wrapper: "right-0 top-[-15%]",
    background: "right-0 top-1/2 -translate-y-1/2 origin-right scale-[0.65]",
    image: "right-0 top-1/2 -translate-y-1/2",
  },
};
