
export const IMAGE_POSITIONS = [
  {
    left: { x: 0, y: 0, rotate: -8 },
    right: { x: 0, y: 0, rotate: 8 },
  },
  {
    left: { x: 30, y: 40, rotate: -4 },
    right: { x: -30, y: 30, rotate: 5 },
  },
  {
    left: { x: 0, y: 0, rotate: 0 },
    right: { x: 0, y: 0, rotate: 0 },
  },
  {
    left: { x: 50, y: 80, rotate: 6 },
    right: { x: -50, y: 60, rotate: -6 },
  },
  {
    left: { x: -20, y: 100, rotate: -6 },
    right: { x: 20, y: 80, rotate: 6 },
  },
  {
    left: { x: 40, y: 120, rotate: 4 },
    right: { x: -40, y: 100, rotate: -4 },
  },
  {
    left: { x: 0, y: 150, rotate: -8 },
    right: { x: 0, y: 130, rotate: 8 },
  },
  {
    left: { x: 30, y: 180, rotate: 5 },
    right: { x: -30, y: 160, rotate: -5 },
  },
  {
    left: { x: -30, y: 200, rotate: -4 },
    right: { x: 30, y: 180, rotate: 4 },
  },
  {
    left: { x: 50, y: 220, rotate: 6 },
    right: { x: -50, y: 200, rotate: -6 },
  },
  {
    left: { x: 0, y: 250, rotate: -5 },
    right: { x: 0, y: 230, rotate: 5 },
  },
  {
    left: { x: 40, y: 280, rotate: 0 },
    right: { x: -40, y: 260, rotate: 0 },
  },
];

export const IMAGE_TRANSITION = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const SERVICE_TRANSITION = {
  duration: 0.4,
};
