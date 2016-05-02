const path = require('path')

module.exports = {
  context: __dirname,
  entry: './src',
  output: {
    library: 'hotkeyCommander',
    libraryTarget: 'umd',
    path: path.join(__dirname, '/dist'),
    filename: 'hotkeyCommander.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
