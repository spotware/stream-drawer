var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'example/example_rx.ts'),
    output: {
        filename: 'bundle-example.js',
        path: path.resolve(__dirname, 'example/js')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      ]
    }
};
