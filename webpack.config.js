const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

const config = {
	entry: [
		'./src/index.js',
		'./src/assets/scss/index.scss',
	],

	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },

	devServer: {
		contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3030,
    hot: true,
	},

	module: {
		rules: [
			{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
			{ test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
			{ test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
		]
	},

	plugins: [
		new HtmlWebpackPlugin({template: './index.html'}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
	],
};

module.exports = config;