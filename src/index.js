/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-24 12:39:41
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-25 10:53:34
 */
// import Vue from 'vue'

// const vm = new Vue({
//   render:(h)=>{
//     return ('div',"hello vue")
//   }
// }).$mount(document.getElementById("app"))

import css from './css/index.less'
import React, { Component } from "react";
import ReactDom from "react-dom";

class App extends Component {
  render() {
    return <div>hello world React</div>;
  }
}

ReactDom.render(<App />, document.getElementById("app"));


// import "@babel/polyfill"

// const arr = [new Promise(() => {}), new Promise(() => {})];

// arr.map((item) => {
//   console.log(item);
// });


//HMIjs 热更新的
// import counter from './counter'
// import number from './number'

// counter()
// number()

// if(module.hot){
//   module.hot.accept('./number.js',function(){
//     document.body.removeChild(document.getElementById("number"))
//     number()
//   })
// }


// var btn = document.createElement("button");
// btn.innerHTML = "新增"
// document.body.appendChild(btn);

// btn.onclick = function () {
//   var div = document.createElement("div")
//   div.innerHTML = "item"
//   document.body.appendChild(div)
// }








// import axios from 'axios';

// // import pic from './images/bikesite.png'
// console.log("css")

// // var ele = `<div class="${css.ele}">dddd</div>`

// // document.write(ele)

// // let img = new Image() 
// // img.src = pic

// // let root = document.getElementById("imgBox")
// // console.log(root)
// // root.append(img)

// //console.log("webpack")



// axios.get("/api/info").then((res)=>{
//   console.log(res)
// })