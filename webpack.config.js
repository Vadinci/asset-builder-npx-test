const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.ts',
	target: 'node',
	//devtool: '',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'cli.js',
		path: path.resolve(__dirname, 'bin'),
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true
		})
	]
};