var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    entry: 'server.js',

    target: 'node',

    output: {
        filename: 'server-bundle.js'
    },

    externals: nodeModules,

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
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

    node: {
        __dirname: true
    },

    plugins: []
};
