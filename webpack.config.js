const path = require('node:path')
const webpack = require('webpack')
const dotenv = require('dotenv')

// Load .env.local (falls back gracefully if missing)
const env = dotenv.config({ path: path.resolve(__dirname, '.env.local') }).parsed || {}

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.POSTHOG_KEY': JSON.stringify(
        env.NEXT_PUBLIC_POSTHOG_KEY || process.env.POSTHOG_KEY || ''
      ),
      'process.env.POSTHOG_HOST': JSON.stringify(
        env.NEXT_PUBLIC_POSTHOG_HOST || process.env.POSTHOG_HOST || ''
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    hot: true,
    open: true,
    port: 3000,
  },
}
