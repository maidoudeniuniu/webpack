/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-25 11:12:37
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-25 11:51:13
 */
const baseConfig = require("./webpack.config.base.js")
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html 模版
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离css 文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css 文件的
const Cssnano = require("cssnano") //Cssnano 就是这样的一个缩减器，
const {merge}  =  require("webpack-merge") //合并
const webpack = require('webpack');
const path = require("path");

const ProConfig = {
  mode:"production",
  devtool:"none",//source-map 开启  none 关闭
  module:{
    rules:[        
      {
        test:/\.less$/,
        include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
        use:[
          //"style-loader",
          MiniCssExtractPlugin.loader, //抽离单独的css 文件
          {
            loader:"css-loader",
            options:{
              modules:true
            }
          },
          {
            loader:"postcss-loader"
          },
          "less-loader"
        ]
      },{
        test:/\.(png|jpe?g|gif)$/,
        include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
        use:{
          loader:"url-loader",
          options:{
            name:"[name]_[hash:6][ext]",
            //outputPath:"http://www.baidu.com/images/" //为了cdn
            //打包存放的位置
            outputPath:"images/",
            //推荐使用url-loader 因为url-loader 支持linmit
            //推荐小体积的，大体积的
            limit:10*1024  //单位是字节  1024 = 1k 少于多少大的才会生成base64
          }
        }
      },       
      {
        test: /\.js$/,
        include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
        //exclude:"/node_modules",
        use: {
          loader: "babel-loader",           
        },
      }        
    ]
  },
  //插件
  plugins:[  
    // 单独抽离css 文件
    new MiniCssExtractPlugin({
      filename:"css/[name]_[contenthash:6].css",
      chunkFilename:"[id].css"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor:Cssnano, //Cssnano 就是这样的一个缩减器，
      cssProcessorOptions:{
        discardComments:{remoteAll:true}
      }
    }),     
    // 选择html 模版
    new HtmlWebpackPlugin(
      {
        //选择html模版
        title:"首页", //生成的HTML模板的title，如果模板中有设置title的名字，则会忽略这里的设置
        template:"./src/index.html", //模板来源文件（html文件）
        filename:'index.html', //生成的模板文件的名字
        //压缩文件
        minify:{
          removeComments:true, // 移除html 中的注释
          collapseWhitespace:true,// 删除空白符号和换行符
          minifyCSS:true //压缩内联css
        }          
        //inject:"head" head,body,             
      }
    ),
    // 选择热更新
    new webpack.HashedModuleIdsPlugin()
  ] 
} 

module.exports = merge(baseConfig,ProConfig)