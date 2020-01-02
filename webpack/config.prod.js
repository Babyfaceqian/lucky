const merge = require('webpack-merge');
const common = require('./config.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     minSize: 200000,
  //     minChunks: 2,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     name: true
  //   }
  // },
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ]
});