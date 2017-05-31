const webpack = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
// console.log(process.env.NODE_ENV);

const config = {
  // 入口文件
  entry: resolve(__dirname, 'src/js'),
  // 输出文件
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.[hash].js'
  },
  // 模块
  module: {
    // 加载器
    loaders: [
      // CSS
      {test: /\.css$/, loader: 'style-loader!css-loader!less-loader'},
      // JS
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader!eslint-loader'},
      // HTML
      {test: /\.html$/, exclude: /node_modules/, loader: "raw-loader"}
    ]
  },
  // 插件
  plugins: [
    // 在输出文件的头部添加注释
    new webpack.BannerPlugin('Created by bergwhite.'),
    // 热更新模块
    new webpack.HotModuleReplacementPlugin(),
    // 热更新信息友好命名
    new webpack.NamedModulesPlugin(),
    // HTML插件
    new HtmlWebpackPlugin({filename: 'index.html',template: 'index.html'}),
    // 每次构建之前删除文件
    new CleanWebpackPlugin(
        ['dist/index.*.js'],　 //匹配删除的文件
        {
          root: __dirname,       　　　　　　　　　　//根目录
          verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
          dry:      false        　　　　　　　　　　//启用删除文件
        }
      )
  ],
  // 热更新服务器
  devServer: {
    // 开启热更新
    hot: true,
    inline: true,
    // 站点路径
    contentBase: resolve(__dirname, 'dist'),
    // 站点地址
    publicPath: '/'
  }
}

module.exports = config