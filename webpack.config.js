/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-24 12:39:41
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-25 11:09:06
 */
// webpack 是基于nodejs 规范
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html 模版
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清楚文件夹内容
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离css 文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css 文件的
const Cssnano = require("cssnano") //Cssnano 就是这样的一个缩减器，
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
        filename:"[name]_[hash:8].js",
        //publicPath:"http://www.baidu.com" //cdn
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
          include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
          use:[
            // 'style-loader',
            MiniCssExtractPlugin.loader, //抽离单独的css 文件
            'css-loader']
        },
        {
          test:/\.less$/,
          include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
          use:[
            // "style-loader",
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
        // 字体库
        // {
        //   test:"/\.(eot|ttf|woff|woff2|svg)$/",
        //   use:{
        //     loader:"file-loader"
        //   }
        // }
        {
          test: /\.js$/,
          include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
          //exclude:"/node_modules",
          use: {
            loader: "babel-loader",           
          },
        },
        {
          test:/\.vue$/,
          //include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
          loader:"vue-loader"
        }
      ]
    },
    devtool:"cheap-module-eval-map",//source-map 开启  none 关闭
    resolve:{
      alias:{
        react:path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
        'react-dom':path.resolve(__dirname,'./node_modules/react-dom/umd/react-dom.production.min.js')
      },
      modules:['node_modules'], //如果有自定义模块的，就加上自定义的模块的路径 ./src/components
    },
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
       // 清楚文件夹里面内容
      new CleanWebpackPlugin(),
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