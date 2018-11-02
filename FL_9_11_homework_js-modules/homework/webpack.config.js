const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/js/output-module.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //use: [ 'style-loader', 'css-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {loader: 'css-loader', options: {minimize: true}}
                })
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 9000
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })

    ]
};


