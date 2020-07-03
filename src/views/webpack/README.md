# Webpack
* [webpack 优化](#webpack优化)
* [webpack插件介绍](#webpack插件介绍)
* [webpack打包分析](#webpack打包分析)
## webpack优化
* loader 缩小范围 使用includes缩写文件范围
* resolve.modules 指定去哪里查询第三方模块
* resolve.alias 设置别名；减少查找过程
  ```
    resolve: {
       alias: {
         '@': path.resolve(__dirname,'./src/views'), //设置别名
         'react': './node_moudes/react/umd/react.production.min.js' // 减少查找过程
       }
    }
  ```
* extenstions 不建议写很多， 不带后缀的文件引入，需要匹配extenstions中的后缀
* external 优化cdn静态资源，bundle中打包之后不会有这个依赖，体积会小
* MincssExtractPlugin 抽离css到单独文件
* OptimizeCSSAssetsPlugin 压缩css
* 压缩html

  设置环境变量 cross-env process.env
* tree shaking 清除无用代码（js, css）
  * 只支持ES moudle 引入方式，不支持common.js 方式引入
  * 代码不会被执行，不可到达
  * 代码执行的结果不会被用到
  * 代码只会影响到死变量（只写不读）

  * sideEffect （package.json中添加）设置哪些文件不被清除掉
* splitChunks 使用它的cacheGroups 自定义代码分割 优先级数字越大越高
* 按需加载
  * 魔法注释 import(/* webpackPrefetch: true */ 'LoginModal');  webpackPrefetch/webpackPreload
* speed-measure-webpack-plugin 测量各个插件和loader消耗的时间
* webpack-bundle-analyzer 分析webpack打包后模块依赖关系(能知道依赖包的大小)
* DllPlugin 提升webpack打包的速度，提升开发体验（将依赖的基础模块抽离出来打包到dll文件中，当导入的模块存在dll文件中，就不再被打包，而是去dll中取）
  * manifest.json 中查找
  * dll的config中的output.library 和 plugin 中new DllPlugin.name 两者名称需要一致
* hard-source-webpack-plugin 提升构建速度（缓层）第一次构建成功后，第二次速度会变快
* happypack 多线程打包
 * MincssExtractPlugin 跟happypack 配合有bug

## Webpack ，webpack 插件，webpack分析

## Tappable 事件监听机制

## compiler

## compilation  两者关系及生命周期

## yargs 跟commander 类型，用户终端交互


## webpack插件介绍

* webpack.DllPlugin：
     1. 根据entry，生成一份vendor文件
     2. 生成一份manifest.json文件

* HtmlWebpackPlugin：往生成的html文件中插入打包生成的文件地址

* webpack.DefinePlugin：允许创建一个在编译时可以配置的全局常量

* webpack.ContextReplacementPlugin：允许覆盖webpack打包时的查找规则
例：限定查找 moment/locale 上下文里符合 /zh-cn/ 表达式的文件，只会打包这几种本地化内容
```
new webpack.ContextReplacementPlugin(
      /moment[\\/]locale$/,
      /^\.\/(zh-cn)$/
    )
```

* webpack. IgnorePlugin:  防止在 import 或 require 调用时，生成以下正则表达式匹配的模块

```
  // 例：忽略 moment 的本地化内容
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```

* 打包输出带颜色进度
```
webpack --config ./config/dist.js --color --progress --hide-modules
```

* autodll-webpack-plugin:

[描述解决less 等其他问题 链接](https://github.com/asfktz/autodll-webpack-plugin/issues/37)

```
  new AutoDllPlugin({
    inject: true,
    filename: '[name]@[chunkhash].js',
    // context: path.resolve(__dirname, '../'),
    entry: {
      vendors,
      dynamic: ['@wnpm/dynamic-form'],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin({
        filename: 'styles@[contenthash:20].css',
        allChunks: true,
      })
    ],
    inherit: true, // 将当前用户配置的webpack的config配置 拷贝到DLL config，除 entry，devServer，plugins 不拷贝

  })
```

## webpack打包分析
1. 安装webpack-bundle-analyzer，分析各包大小
2. [运行构建可参考链接](https://mp.weixin.qq.com/s/FvSt4zvN1GKBfl8Wp2V-sA)
