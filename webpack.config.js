var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV || 'dev';
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
var appName = 'index';
var host = 'localhost';
var port = '9000';

var plugins = [], outputFile;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = appName + '.min.js';
} else {
    outputFile = appName + '.js';
}

var config = {
    entry: APP_DIR + '/index.js',
    devtool: 'source-map',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/static'
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react','stage-0', 'es2015']
                }
            },
            { test: /\.json$/, loader: 'json' }
            /*,
             {
             test: /(\.jsx|\.js)$/,
             loader: "eslint-loader",
             exclude: /node_modules/
             }*/
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js', '.jsx']
    },
    plugins: plugins
};

if (env === 'dev') {
    new WebpackDevServer(webpack(config), {
        contentBase: './',
        hot: true,
        debug: true,
        historyApiFallback: true
    }).listen(port, host, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
    console.log('-------------------------');
    console.log('Local web server runs at http://' + host + ':' + port);
    console.log('-------------------------');
}

module.exports = config;