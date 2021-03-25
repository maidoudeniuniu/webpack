/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-24 12:39:41
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-25 11:43:33
 */
//base 公共配置
const path = require("path"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {   
    entry:"./src/index.js",     
    output:{            
        path:path.resolve(__dirname,'./dist'),        
        filename:"[name]_[hash:8].js",        
    }, 
    resolve:{
      alias:{
        react:path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
        'react-dom':path.resolve(__dirname,'./node_modules/react-dom/umd/react-dom.production.min.js')
      },
      modules:[path.resolve(__dirname),'./node_modules'], //如果有自定义模块的，就加上自定义的模块的路径 ./src/components
    },   
    //插件
    plugins:[
      new CleanWebpackPlugin()
    ] 
}