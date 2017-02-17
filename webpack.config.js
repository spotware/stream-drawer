var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'lib/marble-drawer.ts'),
    output: {
        filename: 'marble-drawer.js',
        path: path.resolve(__dirname, 'lib')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css']
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' },
        { test: /\.css$/, loader: 'css-loader' }
      ]
    }
};
