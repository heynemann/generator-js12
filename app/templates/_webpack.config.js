const path = require('path')
const fs = require('fs')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(x =>
    ['.bin'].indexOf(x) === -1
  )
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`
  })

module.exports = {
  entry: {
    <%= packageName %>: ['babel-polyfill', './src/cmd.js'],
  },
  target: 'node',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json',
    }],
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
  },
  externals: nodeModules,
  devtool: 'sourcemap',
}
