const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: {
		app: './src/js/index.js',
		admin: './src/js/admin.js'
	},
	output: {
		filename: './assets/js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: '[name].[ext]',
							publicPath: '../img/',
							outputPath: './assets/img'
						}
					}
				]
			},
			{
				test: /\.js$/,
				use: [
					'babel-loader'
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					'vue-style-loader',
					MiniCssExractPlugin.loader,
					
					//"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test: /\.pug$/,
				oneOf: [
					// this applies to `<template lang="pug">` in Vue components
					{
						resourceQuery: /^\?vue/,
						use: ["pug-plain-loader"]
					},
					// this applies to pug imports inside JavaScript
					{
						use: [
							{
								loader: "pug-loader",
								options: {
									pretty: true
								}
							}
						]
					}
				]

			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExractPlugin({
			filename: './assets/css/[name].css'
		}),
		new HtmlWebpackPlugin({
			chunks: ['app'],
			filename: './index.html',
			template: './src/index.pug'
		}),
		new HtmlWebpackPlugin({
			chunks: ['admin'],
			filename: './admin.html',
			template: './src/admin.pug'
		})
	],
	devServer: {
		port: 9000
	}
}