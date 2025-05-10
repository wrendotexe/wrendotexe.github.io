const path = require('path');

module.exports = {
  entry: {
    app: './js/scripts.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/scripts.js',
  },
};
