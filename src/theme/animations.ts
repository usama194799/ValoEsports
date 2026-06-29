export const AnimationConfig = {
  // Timing configs (ms)
  timing: {
    fast: 120,
    normal: 220,
    slow: 300,
  },

  // Scale values for press animations
  press: {
    scaleDown: 0.98,
    scaleUp: 1.0,
    cardScale: 0.98,
  },

  // Fade values
  fade: {
    hidden: 0,
    visible: 1,
  },
} as const;
