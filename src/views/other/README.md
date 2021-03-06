# 面试积累
* [基础](#基础)
* [CSS和移动端](./css.md)
* [浏览器Event Loop](#浏览器EventLoop)
* [http及网络](./net.md)
* [React源码及优化](../react/README.md)
* [Vue](#Vue)
  * [vue框架是如何检测数组变化的？](#vue框架是如何检测数组变化的？)
  * [vue双向绑定如何实现的？](#vue双向绑定如何实现的？)
  * [vueEventBus的$once实现？](#vueEventBus的$once实现？)
* [ES6](#ES6)
  * [Promsie实现](#Promsie实现)
  * [Promise.race实现](#Promise.race实现)
  * [Promise.finally实现](#Promise.finally实现)
* [跨域](#跨域)
* [缓存](#缓存)
* [安全](#安全)
* [nginx](./nginx.md)
* [webpack babel](#webpack)
* [webpack及webpack优化](../webpack/README.md)
* [node](#node)
## 基础
* html5 语义标签
  * 语义标签: header、article、nav、main、section、footer
  * Video ： play() 和 pause()
    支持格式：MP4, WebM, 和 Ogg
    * MP4 = 带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件
    * WebM = 带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件
    * Ogg = 带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件
  * Audio
    支持格式：mp3、ogg、wav
  * canvas
    1. html中引入canvas
    2. document.getElmentById('id').getContext('2d')
    3. 在使用2上实例方法
  * Canvas 和 Svg 区别
* jpg 和png 区别
  * jpg: 使用的一种失真压缩标准方法，24 bit真彩色，内容比GIF丰富，不支持动画、不支持透明色
  * png: 格式是无损数据压缩的,PNG格式有8位、24位、32位三种形式,其中8位PNG支持两种不同的透明形式

* 防抖(debounce) : 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时

  应用场景：
  * resize/scroll 触发统计事件
  * 文本输入验证，不用用户输一个文字调用一次ajax请求，随着用户的输入验证一次就可以
* 节流(throttle)：在一段固定的时间内只触发一次回调函数


* for...in , for...of, Object.keys, Object.getOwnPropertyNames, Reflect.ownKeys 区别？

  1. for...in: 遍历对象的可枚举属性（包含自有属性、继承自原型的属性），不包含Symbol属性
  2. Object.keys: 遍历对象的可枚举属性(不包含继承自原型的属性及不可枚举的属性和Symbol属性)
  3. Object.getOwnPropertyNames: 返回对象的自有属性（包括可枚举和不可枚举的，不包含继承自原型的属性 和Symbol属性）
  4. for...of: 遍历实现过Symbol.iterable的属性，遍历数组时，输出的是 '值'；上述1，2，3 的方法， 输出是索引
  5. Reflect.ownKeys: 返回枚举和不可枚举的属性，包括Symbol属性，不包括继承自原型的属性
```
function test () {
  var arr = ['a', 'b', 'c'];
  var obj = {name: 'test', sex: 'male'}
  // symbol 属性
  var symbolProp = Symbol('symbol');
  obj[symbolProp] ='symbol';
  // 设置不可枚举属性
  Object.defineProperty(obj, 'age', {
    enumerable: false,
    value: 19
  })
  // 添加继承属性
  Object.prototype.address = '北京市';
  Object.prototype.sayHi = function () {
    console.log('hellow')
  }
   //console.log name sex address sayHi
  for(var n in obj) {
    console.log('for...in:', n);
  }
  //console.log ["name", "sex"]
  console.log('Object.keys:', Object.keys(obj))
  //console.log ["name", "sex", "age"]
  console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))
  // for(var m of obj) { } // 报错，遍历属性需要内部实现Symbol.iterable
  //console.log ["name", "sex", "age", Symbol(symbol)]
  console.log('Reflect.ownKeys:', Reflect.ownKeys(obj));
  // console.log a b c
  for (var t of arr) {
    console.log('for...of:', t);
  }
  // console.log  "0", "1", "2", 'address', 'sayHi'
  for(var tn in arr) {
    console.log('for...in 遍历数组：',tn)
  }
  //console.log ["0", "1", "2", "length"]
  console.log('Reflect.ownKeys 获取数组属性：', Reflect.ownKeys(arr))
  //console.log ["0", "1", "2", "length"]
  console.log('Object.getOwnPropertyNames 获取数组属性：', Object.getOwnPropertyNames(arr))
  // console.log  ["0", "1", "2"]
  console.log('Object.keys获取数组属性：', Object.keys(arr))
}
```
* prefetch 和 preload

  preload：预加载（对当前页面所需的脚本、样式等资源进行预加载，而无需等到解析到 script 和 link 标签时才进行加载）

  prefetch: 加载的资源一般不是用于当前页面的，即未来很可能用到的这样一些资源 利用浏览器空闲时间来下载，当进入下一页面，就可直接从 disk cache 里面取，既不影响当前页面的渲染，又提高了其他页面加载渲染的速度

## 浏览器EventLoop
  1. 宏任务: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering
  2. 微任务：Promise.then, process.nextTick, MutationObserver
  * 整段脚本script作为宏任务开始执行
  * 遇到微任务将其推入微任务队列，宏任务推入宏任务队列
  * 宏任务执行完毕，检查有没有可执行的微任务
  * 发现有可执行的微任务，将所有微任务执行完毕
  * 开始新的宏任务（凡是在执行宏任务过程中遇到微任务都将其推入微任务队列中执行，此宏任务执行完会检测微任务队列），反复如此直到所有任务执行完毕
  * [执行效果](../css/css.html)


## Vue
### vue框架是如何检测数组变化的？
  1. 用Object.defineProperty 检测数组的7个方法 ['push','pop','shift','unshift','splice','sort','reverse']
  2. push, unshift 添加新值， splice 移除返回值，进行数组响应化处理
  3. 触发dep.notify()
  ```
  const arrayProto = Array.prototypel
  const arrayMethods = Object.create(arrayProto);
   function def (obj: Object, key: string, val: any, enumerable?: boolean) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    })
  }

  const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ]

  /**
  * Intercept mutating methods and emit events
  */
  methodsToPatch.forEach(function (method) {
    // cache original method
    const original = arrayProto[method]
    def(arrayMethods, method, function mutator (...args) {
      const result = original.apply(this, args)
      const ob = this.__ob__
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
      if (inserted) ob.observeArray(inserted)
      // notify change
      ob.dep.notify()
      return result
    })
  })
  ```
### vue双向绑定如何实现的？
1. 发布订阅模式(借助Dep, Dep 管理所有Watcher对象)
2. Object.defineProperty get，set数据劫持
### vueEventBus的$once实现？
```
  Vue.prototype.$once = function (event, fn) {
     const vm = this
      function on () {
        vm.$off(event, on); // 只绑定一次，故解绑
        fn.apply(vm, arguments);
      }
      on.fn = fn; // 在移除事件需要使用
      vm.$on(event, on)
  }
```

## ES6
### Promsie实现
[如何实现一个Promise？（Promise A+）](https://www.jianshu.com/p/459a856c476f)
### Promise.race实现
  ```
  Promise.race = function (list) {
    return new Promise((resolve, reject) => {
      list.forEach(item => {
        Promise.resolve(item).then(resolve, reject)
      })
    })
  }
  ```
### Promise.finally实现
  ```
    // 手写Promise.finally
    // 1. 不接收任何参数，原来的value或者Error在finally里是收不到的
    // 2. 处理后不影响原Promise的状态，该reject还是reject，该resolve还是resolve
    // 3. 不影响Promise向后传递的传，resolve状态还是传递原来的value，reject状态还是传递原来的Error

    Promise.prototype.finally = function(callback) {
      let P = this.constructor; // 执行Promise函数本身
      // this 执行Promise实例
     return this.then((value) => {
        return P.resolve(callback).then(() => value)
      }, (reason) => { // 还是reject状态，不变化
        return P.resolve(callback).then(() => throw reason);
      })
    }
  ```

  ### Map 、Set、WeakMap、WeakSet
  * Set 不重复的集合
  * WeakSet 不重复的集合
    * 只能放置对象
    * 对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，其他对象不再引用该对象，垃圾回收机制会自动回收
  * Map
    * 可接受各种类型的值类型的值（包括对象）都可以当作键
  * WeakMap
    * 它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制
    * 键名是对象的弱引用，即垃圾回收机制不考虑WeakMap对该对象的引用
  * Map 和 Object区别：
    1. Map 的键名可接受各种类型的值，且可用for...of 遍历（内部部署了Symbol.iterator属性）
    2. Object的键名只能接受字符串


## 跨域
* jsonp 跨域实现原理？是否可以实现post？
  jsonp 实现：是一种脚本注入的方式; 不支持post
  1. 当需要通讯时，本站脚本创建一个script元素，地址指向第三方的API网址，形如：
  ```
   <script src="http://www.example.net/api?param1=1&param2=2"></script>
  ```
  2. 并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。
  3. 第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如：
  ```
  callback({"name":"hax","gender":"Male"})
  ```
  这样浏览器会调用callback函数，并传递解析后json对象作为参数。
  4. 本站脚本可在callback函数里处理所传入的数据
* CORS 域资源共享

  [chorme 80 版本设置跨域会不起作用?](https://juejin.im/post/5e69fdb16fb9a07cb96b0253)

  原因：cookie属性中的SameSite（用来限制第三方cookie的属性）默认Lax
  * strict 只有当前网页的URL与请求目标一致，才会带上cookie
  * Lax 稍稍放宽，大多数情况也是不发送第三方cookie
  * none 显式关闭SameSite属性，必须同时设置Secure属性（cookie只能通过HTTPS协议发送），否则无效

* nginx跨域实现具体详情？

  发送请求方式OPTIONS的<font color="red">预检请求</font>，<font color='red'>请求header中有Origin字段</font>；

  预检请求Response Header返回字段判断是否可跨域;
  1. Access-Control-Allow-Credentials: 是否跨域时携带cookie信息和http认证信息
  2. Access-Control-Allow-Headers:服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
  3. Access-Control-Allow-Methods: 服务器支持的所有跨域请求的方法
  4. Access-Control-Allow-Origin: 允许跨域的请求
  ```
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Headers: higher_priority_type,source,wpage_config,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Origin,Content-Type,Accept,Authorization,rbac_source,deviceid,token,method,x-source,x-pingother,ws_app_source
    Access-Control-Allow-Methods: GET, POST, OPTIONS
    Access-Control-Allow-Origin: http://www.baidu.com
  ```

## 缓存
### 浏览器缓存
* 强缓存
  * Cache-Control (优先级高于Expires)

    max-age: 表示在这个时间范围内缓存是新鲜的无需更新

    no-cache：不使用本地缓存。需要使用协商缓存

    no-store：直接禁止浏览器缓存数据，每次请求资源都会向服务器要完整的资源

  * Expires

* 协商缓存
  *  Last-Modified 响应；

     (最后资源修改时间，只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间)

     If-Modified-Since 请求

     (被请求资源的最后修改时间进行比对，如最后修改时间比较新，则说明最近改动过，响应200；否则响应304)
  * ETag/If-None-Match (优先级高于Last-Modified) 根据内容计算的哈希值
* <font color='red'>Vary (属于http缓存控制协议头 )</font>

  字段用于列出一个响应字段列表，告诉缓存服务器遇到同一个 URL 对应着不同版本文档的情况时，如何缓存和筛选合适的版

### 服务端缓存
* CDN 缓存图片、文件等静态资源
* CDN 加速通过将网站的内容缓存在网络边缘（离用户接入网络最近的地方），然后在用户访问网站内容的时候，通过调度系统将用户的请求路由或者引导到离用户接入网络最近或者访问效果最佳的缓存服务器上，有该缓存服务器为用户提供内容服务；相对于直接访问源站，这种方式缩短了用户和内容之间的网络距离，从而达到加速的效果

### 本地存储
* cookie

  <font color='red'>浏览器会自动携带cookie</font>

  缺点：大小4kb，可删除，安全性不好，以纯文本的形式记录于文件中需加密
* sessionStorage

  会话级别存储，当会话结束的时，存储值会被清空；

  不同窗口（包括同源下的不同窗口）值不能共享，窗口关闭值被清空session；

* localStorage

  持久化存储，大小一般5m，存储的值为string；

  同源下的不同页面是可共享的相同loaclStorage；

  实现跨域localStorage共享：postMessage和iframe相结合的方法

* IndexDB

  浏览器提供的本地数据库，不属于关系数据库，接近NoSQL数据库

## 安全
  * XSS:

     用户输入的文本框中包含脚本如script,eval等；需要对用户输入的内容进行转义
  * Sql注入：

    用户输入的文本框中包含sql语句；需要对用户输入的进行转义
  * [CRSF：（Cross-site request forgery）跨站请求伪造](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

    用户登录某网站之后，未退出登录，然后访问第三方网站（危险网站），第三方网站中存在隐藏（访问用户登录的网站，浏览器会自动带上cookie，达到冒充用户进行操作）脚本。
    ![avatar](./csrf.png)

    常用的攻击类型：

    1. Get类型，用户访问的图片中含有第三方连接
    2. Post类型，表单自动提交

    解决方案：

    1. 阻止不明外域的访问

        同源检测（Origin Header，Referer Header确定来源域名） / Samesite Cookie

    2. 提交时要求附加本域才能获取的信息

        CSRF Token / 双重Cookie验证


## webpack
  * .babelrc 中present 和 plugin区别
    present: 预设
    plugin：

    执行顺序：
    * 先执行完所有Plugin，再执行Preset。
    * 多个Plugin，按照声明次序顺序执行。
    * 多个Preset，按照声明次序逆序执行。
    ```
      {
        "presets": [
          "env"
          "react",
          "stage-0",
        ],
        "plugins": [
            ["import", { "libraryName": "antd", "style": "css" }],
            "transform-runtime", // 转译JS最新的api
            "transform-decorators-legacy", // 转译es7的@修饰器
        ]
    }
    ```
  * babel-plugin-import 插件是如何实现按需加载的？
    * 实现按需加载方式：
      1. .babelrc 中的plugins中添加import 插件信息
      2. webpack的babel loader的query参数中配置import 插件信息
    * 第三方库能使用按需加载需要实现哪些？
      1. lib 或其他目前下，需要有index.js 导出所有组件
      ```
        // lib/index.js
        export { default as Button } from './button';
        export { default as Input } from './input';
      ```
      2. 项目中使用第三方组件库
      ```
        import {Button, Input} from 'antd';
      ```
      3. babel编译之后
      ```
        var _Input2 = require("./node_modules/antd/lib/Input.js");
      ```
  * webpack打包后的bundle为什么能在浏览器中运行？

    bundle.js 能直接运行在浏览器中的原因：
    webpack通过__webpack_require__ 函数模拟了模块的加载（类似于node中的require语法），把定义的模块内容挂载到module.exports上。同时__webpack_require__函数中也对模块缓存做了优化，防止模块二次重新加载，优化性能

    * __webpack_require__.e (require.ensure) 异步加载模块(源码是通过promise实现的异步)
  * webpack 如何编译成es5 浏览器可识别的代码？

    Bable 执行过程和原理：

    1. Parse （使用babylon库将源代码转换为AST）
        1. 分词 （按语法规则及estree（或其他tree） api 生成tokens）
        2. 语义分析 （遍历tokens，检查语义错误）
    2. transform （利用各种插件进行代码转换，babel内置jsx，typescript的插件转换）
    3. generator （再利用代码生成工具，将AST转换成代码。）

    AST ：
    1. 代码转换
    2. linting （eslint，tslint） 3. webpack 依赖跟踪
    4. 代码混淆 uglify 5. vscode 高亮
    6. 代码覆盖率检测 converge

    [在线生成AST工具](https://astexplorer.net/)

    [estree api](https://github.com/estree/estree)

  * webpack tree shaking
    1. 所有 import 标记为 /* harmony import */
    2. 被使用过的 export 标记为 /* harmony export ([type]) */，其中 [type] 和 webpack 内部有关，可能是 binding, immutable 等等。
    3. 没被使用过的 export 标记为 /* unused harmony export [FuncName] */，其中 [FuncName] 为 export 的方法名称

    UglifyJSPlugin 把标记的无用代码删除

    作用：找出 JavaScript 上下文中的未引用代码(dead-code)
    1. 程序中没有执行的代码 (如不可能进入的分支，return 之后的语句等)
    2. 导致 dead variable 的代码(写入变量之后不再读取的代码)

    ### 不能被移除的代码：
      1. webpack tree shaking 只处理顶层内容，例如类和对象内部都不会再被分别处理
      2. 函数调用之后的副作用
      ```
      // webpack 并没有删除这行代码，至少没有删除全部。它确实删除了 result2，但保留了 bye() 的调用（压缩的代码表现为 Object(r.a)()）以及 bye() 的定义.

      let result1 = hello()
      let result2 = bye()

      console.log(result1)
      // util.js
      export function hello () {
        return 'hello'
      }

      export function bye () {
        return 'bye'
      }
      ```

  * webpack loader如何执行，如何实现？
  ## node
  * [node require 如何加载文件？](http://www.ruanyifeng.com/blog/2015/05/require.html)
    * require 加载顺序？
    1. 如果 X 是内置模块（比如 require('http'）)
      * 返回该模块
      * 不再继续执行
    2. 如果 X 以 "./" 或者 "/" 或者 "../" 开头
     * 根据 X 所在的父模块，确定 X 的绝对路径。
     * 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
       * X
       * X.js
       * X.json
       * X.node
     * 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
       * X/package.json（main字段）
       * X/index.js
       * X/index.json
       * X/index.node
    3. 如果 X 不带路径
     * 根据 X 所在的父模块，确定 X 可能的安装目录。
     * 依次在每个目录中，将 X 当成文件名或目录名加载。
    4. 抛出 "not found"

  * require 其实内部调用 Module._load 方法
   ```
    Module._load = function(request, parent, isMain) {
      //  计算绝对路径
      var filename = Module._resolveFilename(request, parent);

      //  第一步：如果有缓存，取出缓存
      var cachedModule = Module._cache[filename];
      if (cachedModule) {
        return cachedModule.exports;

      // 第二步：是否为内置模块
      if (NativeModule.exists(filename)) {
        return NativeModule.require(filename);
      }

      // 第三步：生成模块实例，存入缓存
      var module = new Module(filename, parent);
      Module._cache[filename] = module;

      // 第四步：加载模块
      try {
        module.load(filename);
        hadException = false;
      } finally {
        if (hadException) {
          delete Module._cache[filename];
        }
      }

      // 第五步：输出模块的exports属性
      return module.exports;
    };
   ```




