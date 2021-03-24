/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-24 12:39:41
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-24 18:29:38
 */
// webpack 是基于nodejs 规范
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require("path"); 
module.exports = {
    //上下文 项目打包的相对路径，必须是绝对路径
    // context:process.cwd(),
     // 项目打包入口 支持三种类型，字符串，数组，对象
     entry:"./src/index.js",
     //entry:['./src/index.js','./src/other.js'],
      // entry:{
      //   index:"./src/index.js",
      //   other:"./src/other.js"
      // },
     // 项目出口 是对象
    output:{      
        //构建文件的存放路径
        path:path.resolve(__dirname,'./dist'),
        //构建的文件资源叫什么
        filename:"[name]_[hash:8].js"
        //占位符
        //hash 
        //chunkhash
        //name
        //id   
    },    
    //"development" | "production" | "none
    mode:"development",
    module:{
      rules:[
        {
          test:/\.css$/,
          use:['style-loader','css-loader']
        },
        {
          test:/\.less$/,
          use:[
            "style-loader",
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
        // 字体库
        // {
        //   test:"/\.(eot|ttf|woff|woff2|svg)$/",
        //   use:{
        //     loader:"file-loader"
        //   }
        // }
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",           
          },
        },
        {
          test:/\.vue$/,
          loader:"vue-loader"
        }
      ]
    },
    devtool:"cheap-module-eval-map",//source-map 开启  none 关闭
    devServer:{
      //可以是相对路径
      contentBase:path.resolve(__dirname,"./dist"),
      //自动打开浏览器窗口
      //open:true,
      port:8081, 
      //热更新css,js更改了，保存的时候，浏览器就会自动更新 react vue 都会使用
      hot:true,
      //即便HMR没有生效，浏览器也不会自动刷新
      hotOnly:true,
      //代理解决跨域问题
      proxy:{
        "/api":{
          target:"http://localhost:9092"
        } 
      },
      //hooks 钩子函数
      before(app,server){
        app.get('/api/info',(req,res)=>{
          res.json('hello express')
        })
      }      
    },
    //插件
    plugins:[
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(
        {
          //选择html模版
          title:"首页",
          template:"./src/index.html",
          filename:'index.html', 
          //inject:"head" head,body,             
        }
      ),
      new webpack.HashedModuleIdsPlugin()
    ] 
}