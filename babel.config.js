module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Required by Reanimated 4 — transforms worklet functions for native thread execution
    'react-native-reanimated/plugin',
  ],
};
