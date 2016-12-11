const path    = require('path');
const webpack = require('webpack');

module.exports = {
    debug: process.env.NODE_ENV === 'development',
    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
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
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
        new webpack.NoErrorsPlugin()
    ]
};
