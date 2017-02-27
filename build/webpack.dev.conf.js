var webpack = require('webpack'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  SOURCE_MAP = true; // 是否使用source map

// 如果定义了source_map就使用eval-source-map模式，否则不使用
config.devtool = SOURCE_MAP ? 'eval-source-map' : false;
config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';


// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
  config.entry.app
];

config.output.publicPath = '/';

// 开发环境下直接内嵌 CSS 以支持热替换
// autoprefixer自动补齐浏览器前缀
config.module.loaders.push({
  test: /\.css$/,
  loader: 'style!css!autoprefixer'
}, {
  test: /\.less$/,
  loader: 'style!css!less!autoprefixer'
}, {
  test: /\.scss$/,
  loader: 'style!css!sass!autoprefixer'
});

config.plugins.push(

    //优化插件，为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
  new webpack.optimize.OccurenceOrderPlugin(),
    //修改组件代码后，自动刷新实时预览修改后的效果
  new webpack.HotModuleReplacementPlugin(),
    //不被错误中断
  new webpack.NoErrorsPlugin(),
    //分离CSS和JS文件
  new ExtractTextPlugin('[name].css'),
    // 生成HTML页面
  new HtmlWebpackPlugin({
    filename: 'index.html',// 输出文件名
    template: config.commonPath.indexHTML, //文件路径
    chunksSortMode: 'auto'
  }),
    // 实时刷新页面
  new BrowserSyncPlugin({
    host: '127.0.0.1',
    port: 9090,// 浏览器监听地址
    proxy: 'http://127.0.0.1:9000/',
    logConnections: false,
    notify: false
  }, {
    reload: false
  })
);

module.exports = config;
