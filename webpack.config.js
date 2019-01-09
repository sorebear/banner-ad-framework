var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    horizontal: './src/js/horizontal.js',
    vertical: './src/js/vertical.js',
    vendor: ['./src/js/vendor/iscroll.js', './src/js/vendor/jquery-3.3.1.min.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  // Modules/Loaders - Working with Individual Files
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  // Plugins - Looking at the total sum of input/output
  plugins: [
    // Looks for any overlapping code in Vendor and Bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
