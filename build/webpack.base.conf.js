var path = require('path'),
  webpack = require('webpack'),
  NyanProgressPlugin = require('nyan-progress-webpack-plugin');

// 在任何模块文件内部，可以使用__dirname变量获得当前模块所在目录的完整路径
var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src'), // 开发源码目录
    // Node.js中的process.env.NODE_ENV可以设置环境变量，默认为development
  env = process.env.NODE_ENV.trim(); // 当前环境
var commonPath = {
  rootPath: rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
};

module.exports = {
  commonPath: commonPath,// 公共目录定义
  entry: {
    // ================================
    // 框架 / 类库 分离打包
    // ================================
    vendor: [
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk'
    ],
    app: path.join(src, 'app.js'),
  },
  output: {
    path: path.join(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    //定义资源的默认后缀名
    extensions: ['', '.js', '.jsx','.scss','.json','.css'],
    alias: {
      // =============================
      // 自定义路径别名
      // ================================
      ASSET: path.join(src, 'assets'),
      COMMON: path.join(src, 'common'),
      COMPONENT: path.join(src, 'components'),
      ACTION: path.join(src, 'redux/actions'),
      REDUCER: path.join(src, 'redux/reducers'),
      STORE: path.join(src, 'redux/store'),
      CONSTANTS: path.join(src, 'redux/constants'),
      VIEW: path.join(src, 'views')
    },
    //设置默认搜索的目录名
    modulesDirectories: ['node_modules']
  },
  resolveLoader: {
    root: path.join(rootPath, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: (function() {
        var _loaders = ['babel?' + JSON.stringify({
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            production: {
              presets: ['react-optimize']
            }
          }
        }), /*'eslint'*/];

        // 开发环境下引入 React Hot Loader
        if (env === 'development') {
          _loaders.unshift('react-hot');
        }
        return _loaders;
      })(),
      include: src,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
    }]
  },
  /*eslint: {
   formatter: require('eslint-friendly-formatter')
   },*/
  externals: {
    jquery: '$'
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin({//主要用来定义全局的环境变量，以便我们在自己的程序中引用它
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production')
      },
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: env === 'development',
      __PROD__: env === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false ,// 是否检测不必要的组件重渲染
      __SERVER__:"",//服务器地址
    })
  ]
};
