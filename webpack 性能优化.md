# webapck性能优化

#### loader 模块优化 

 loader 是大户，处理的文件比较多的，所以针对的目录查找文件，减少查找文件的时间，

//例子：没有include的 打包5.9 ~ 6.1S  ，加了include 直接到2.5~2.7s 之间 ，提升了40%以上

。每个loader 都加上include 

```
{
    test:/\.css$/,
    include:path.resolve(__dirname,'./src'), //只在这个目录下查找文件
    use:['style-loader','css-loader']
},
```

#### resolve 模块优化

##### 1.alias参数模块

```
例子：打包2.5~2.7s 加了alias 参数处理 打包时间2.2~2.4之间  提升20%左右
resolve:{
      alias:{
        react:path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
        'react-dom':path.resolve(__dirname,'./node_modules/react-dom/umd/react-dom.production.min.js')
      }
    },
```

##### 2.modules参数模块

  **resolve.modules**配置webpack去哪些目录下寻找第三方模块。默认是去**node_modules**目录下寻找。有时你的项目中会有一些模块大量被其他模块依赖和导入，由于其他模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径，这个路径有时候会很长，

```
例子原先打包2.2~2.4  现在打包2.2-2.24左右，提升5%以上
```

