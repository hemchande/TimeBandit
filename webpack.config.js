import path from 'path'

module.exports = {
  entry: {
    google:'./src/pages/google.js' ,
    popup: './src/pages/login.js',
    // Add more entries if needed
  },
  output: {
    path: path.resolve(__dirname, './chrome-extension/build'),
    filename: '[name].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      // Add more rules for handling other file types or loaders as necessary
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};






