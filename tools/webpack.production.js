const path    = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: false,
    entry: {
        main: [
            path.join(process.cwd(), 'client')
        ],
        vendor: [
            'react-dom',
            'react-redux',
            'react-router',
            'react',
            'redux',
            'styled-components'
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
        path: path.join(process.cwd(), 'client/public')
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /(node_modules)/,
            query: {
                cacheDirectory: true,
                plugins: ['transform-object-rest-spread'],
                presets: ['latest', 'react']
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                screw_ie8: true
            }
        })
    ]
};
