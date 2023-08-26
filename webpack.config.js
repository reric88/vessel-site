const path = require('path');

module.exports = {
  // Other Webpack configurations ...
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    fallback: {
      timers: require.resolve('timers-browserify')
    }
  }
};
