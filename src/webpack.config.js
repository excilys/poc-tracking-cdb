var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var target = '../../../target/classes/static/';

var plugins;
if (process.env.NODE_ENV !== 'production') {
    plugins = [
        new webpack.HotModuleReplacementPlugin()
    ];
}

module.exports = {
    output: {
        path: target,
        filename: 'bundle.js'
    },
    entry: {
        app: ['./src/App.jsx']
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                loaders: ['babel']
            },
            // Global less files
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            // Component scoped CSS
            {
                test: /\.css$/,
                loader: 'style!css?module&sourceMap!postcss'
            },
            // the url-loader uses DataUrls.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            // the file-loader emits files.
            {
                test: /\.(ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=' + target + '[name].[ext]'
            }
        ]
    },
    // Add vendor prefixes for css
    postcss: function () {
        return [autoprefixer];
    },
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:8080'
            }
        },
        plugins: plugins
    }
};