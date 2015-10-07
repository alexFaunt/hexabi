var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var fs = require('fs');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'static')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
            },
            {
                test: /\.svg$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },

    postcss: [
        require('autoprefixer'),
        require('postcss-color-rebeccapurple'),
        require('postcss-inline-comment'),
        require('postcss-for'),
        require('postcss-simple-vars'),
        require('postcss-calc'),
        require('postcss-nested'),
    ],

    resolve: {
        root: __dirname,
        modulesDirectories: ['node_modules', 'components']
    },

    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ]
};
