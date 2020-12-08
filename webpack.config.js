'use strict';

const path = require('path');
const { DefinePlugin, optimize, NoEmitOnErrorsPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const sharedConfig = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'encode-parameter.js',
    library: 'encode-parameter',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    symlinks: false,
  },
}

const developmentConfig = {
  devtool: 'eval',
  cache: true,
  output: {
    pathinfo: true
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    mangleExports: false,
    nodeEnv: 'development',
    flagIncludedChunks: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    emitOnErrors: true,
    checkWasmTypes: false,
    minimize: false,
    removeAvailableModules: false
  },
  performance: {
    hints: false
  },
  plugins: [
    new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ]
}

const productionConfig = {
  devtool: false,
  performance: {
    hints: 'warning'
  },
  output: {
    pathinfo: false
  },
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    mangleExports: 'deterministic',
    nodeEnv: 'production',
    flagIncludedChunks: true,
    concatenateModules: true,
    splitChunks: {
      hidePathInfo: true,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    },
    emitOnErrors: false,
    checkWasmTypes: true,
    minimize: true,
  },
  plugins: [
    new TerserPlugin({
      terserOptions: {
        compress: true
       }
    }),
    new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new optimize.ModuleConcatenationPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
}


module.exports = (env, args) => {
  const isProduction = env.production
  const currentConfig = isProduction ? productionConfig : developmentConfig
  const config = sharedConfig

  Object.keys(currentConfig).forEach(key => {
    const type = typeof currentConfig[key]
    if (type !== 'object') {
      config[key] = currentConfig[key]
    } else {
      if (Array.isArray(currentConfig[key])) {
        config[key] = [
          ...(config[key] && config[key]),
          ...currentConfig[key],
        ]
      } else {
        config[key] = {
          ...(config[key] && config[key]),
          ...currentConfig[key],
        }
      }
    }
  })

  return config
};
