/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-24 13:55:16
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-24 14:09:35
 */
const autoprefixer = require('autoprefixer');
module.exports = {
  plugins:[
    autoprefixer({
      // 大于最新的2个版本
      //全球占比1%的浏览器
      overrideBrowserslist:['last 2 versions','>1%']
    })
    // autoprefixer("IE 10")
  ]
}