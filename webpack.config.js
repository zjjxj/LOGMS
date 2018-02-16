const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: {
        vendor: ["react", "react-dom"],
        index: "./public/js/main.js"
    },
    output: {
        path: path.resolve("./public/dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=1000&name=image/[name].[ext]'
            }
        ]
    }
};