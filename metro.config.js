const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * Excludes Android build / generated directories from Metro file watching.
 * These folders are created by Gradle and do not exist before the first build,
 * causing Metro to crash on Windows with ENOENT when it tries to watch them.
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    blockList: [
      // Exclude all android build output inside node_modules
      /node_modules[/\\].*[/\\]android[/\\]build[/\\].*/,
      // Exclude the project's own android build output
      /android[/\\]build[/\\].*/,
      /android[/\\]app[/\\]build[/\\].*/,
      /android[/\\]\.gradle[/\\].*/,
    ],
  },
  watchFolders: [],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

