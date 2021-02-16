const { createMetroConfiguration } = require('expo-yarn-workspaces'); // eslint-disable-line
const { getDefaultConfig } = require('metro-config'); // eslint-disable-line
const blacklist = require('metro-config/src/defaults/blacklist'); // eslint-disable-line

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    ...createMetroConfiguration(__dirname),
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      blacklistRE: blacklist([/lib\/amplify\/.*/]),
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
