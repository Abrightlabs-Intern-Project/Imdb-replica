const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: './src/lambda.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'webpack'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  mode: 'production',
};
