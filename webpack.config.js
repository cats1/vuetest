const path = require('path');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const utils = require('./utils');
//console.log(process.dev);
const config = {
	target: 'web',
	entry: Merge(utils.getEntries(utils.resolve(utils.path.views), `**/*.js`),
		utils.getEntries(utils.resolve(utils.path.views), `**/*.css`), {
			main: [utils.resolve(utils.path.app, `index.js`)]
		}),
	resolve: {
		alias: { // 索引某些依赖
			'~': utils.resolve(utils.path.app)
		},
		extensions: ['.js', '.jsx']
	},
	plugins: [
		//new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './app/index.html'
		})
	],
	output: {
		filename: 'public/js/[name].js',
		path: utils.resolve(utils.path.dist),
		publicPath: utils.isServer ?
			utils.dev.assetsPublicPath : utils.build.assetsPublicPath
	},
	devServer: {
		contentBase: './'
	},
	module: {
		noParse: [/jquery$/], // 不解析某些模块
		rules: [{
			test: /\.css$/,
			include: /node_modules/,
			use: [
				'style-loader',
				'css-loader'
			]
		}]
	}
}
module.exports = config

// 添加多页
const pages = utils.getEntries(utils.resolve('./app/views'), '**/*.html')
//utils.createPages(module.exports.plugins, pages)