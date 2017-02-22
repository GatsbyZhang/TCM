var express = require('express'),
  webpack = require('webpack'),
  // favicon = require('express-favicon'),
  config = require('./webpack.dev.conf'),
  app = express();
//允许跨域访问
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
var compiler = webpack(config);

// for highly stable resources
app.use('/static', express.static(config.commonPath.staticDir));

// app.use(favicon(path.join(__dirname, '../favicon.ico')));

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
    err && console.log(err);
});
