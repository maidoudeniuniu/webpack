/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-24 17:30:07
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-24 17:34:08
 */
const express = require('express');
const app = express()


app.get('/api/info',(req,res)=>{
  res.json('hello express')
})

app.listen(9092,()=>{
  console.log("启动....")
})