const { createMetroConfiguration } = require('expo-yarn-workspaces');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  ...createMetroConfiguration(__dirname),
  resolver: {
    blacklistRE: blacklist([/lib\/amplify\/.*/])
  }
}