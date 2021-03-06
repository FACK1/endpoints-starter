const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const common = {
  entry: {
    bundle: ['./src/frontEnd/index.js']
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js',
    publicPath: 'public'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },

};
const development = {
  devtool:'inline-source-map'
};
const production = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        }
      }
    })
  ],
};

module.exports =
  Object.assign(
    common,
    process.env.NODE_ENV === 'production'
      ? production
      : development
  );
