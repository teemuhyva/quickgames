module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          'assets': './assets',
        }
      },
    ],
    'react-native-reanimated/plugin'
  ]
};
