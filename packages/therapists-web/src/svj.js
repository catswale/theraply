const webpack = require('webpack');

module.exports = {
  entry: '', // React Module location
  module: {
    rules: [
      // ...
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },

};
