const path = require('path');
const dotenv = require('dotenv').config();
const webpack = require('webpack');
const merge = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
    const { PLATFORM, VERSION } = env;
    return merge([
        {
            entry: ['@babel/polyfill', APP_DIR],
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                    {
                        test: /\.css$/,
                        loaders: [PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
                    },
                    {
                        test: /\.scss$/,
                        loaders: [PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({ 
                    template: './src/index.html', 
                    filename: './index.html',
                    //favicon: './assets/images/favicon.ico',
                }),
                new webpack.DefinePlugin({ 
                    'process.env.VERSION': JSON.stringify(env.VERSION),
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
                    'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
                }),
                new CopyWebpackPlugin([ { from: 'src/static' } ]),
                new CompressionPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                    threshold: 10240,
                    minRatio: 0.8
                }),
            ]
        }
    ])
}