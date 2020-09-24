const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: path.join(__dirname, 'app', 'index'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        // Compiles Sass to CSS
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'app'),
        historyApiFallback: true,
        port: 4000,
        host: '0.0.0.0',
        compress: true,
        watchContentBase: true,
        progress: true
    },
    plugins: [
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/public', 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }),
    ],
};

module.exports = config;