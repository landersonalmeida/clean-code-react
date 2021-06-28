const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [{
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        }]
      }
    }
  }
  on('file:preprocessor', webpackPreprocessor(options))
}
