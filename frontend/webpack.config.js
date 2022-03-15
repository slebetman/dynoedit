const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
	template: "./public/index.html",
	filename: "./index.html"
});

module.exports = {
	mode: "development",
	output: {
		path: path.resolve(__dirname, "build")
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			options: {
				presets: ['@babel/preset-react']
			}
		},
		{
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		}]
	},
	plugins: [htmlPlugin],
	devServer: {
		compress: true,
		allowedHosts: 'all',
		port: 3000
	}
};
