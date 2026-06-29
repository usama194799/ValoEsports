export const AnimationConfig = {
  // Spring configs
  spring: {
    gentle: {
      damping: 15,
      stiffness: 120,
      mass: 0.8,
    },
    bouncy: {
      damping: 10,
      stiffness: 180,
      mass: 0.6,
    },
    snappy: {
      damping: 20,
      stiffness: 200,
      mass: 1,
    },
  },

  // Timing configs (ms)
  timing: {
    fast: 150,
    normal: 250,
    slow: 400,
    verySlow: 600,
  },

  // Scale values for press animations
  press: {
    scaleDown: 0.94,
    scaleUp: 1.0,
    cardScale: 0.96,
  },

  // Fade values
  fade: {
    hidden: 0,
    visible: 1,
  },
} as const;
