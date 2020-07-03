# React-Router
## v3
* 路由集中在一个地方。
* 布局和页面嵌套是通过 Route标签 组件的嵌套而来的。
* 布局和页面组件是完全纯粹的，它们是路由的一部分

## v4
1. 需要使用 Router 标签 包裹
2. Route 三种方式：
 * children 是不关心path是否匹配，都会执行；
 * children 可以是函数，也可以是节点（如路由嵌套）
 * render： path 匹配时执行component： path 匹配时执行

 以上三种方式都能获取到 location，history, match
 优先级 children > component > render，
  ```
  <Route path="" component={() =><Chid count={count}/>} />

  ```
 count 变化时，会重复挂在和卸载组件;

 原因：渲染compoent的时候，会调用React.createElement,  如果是这种匿名函数的形式，导致生成的组件的type值不同  ，会产生重发挂在和卸载
 ```
  <Route path=‘’ render={() => <Chid count={count} />} />
 ```
 渲染时，render 是函数直接执行render(props)

3. 获取redirect 的参数值
```
<Redirect to={{pathname: '', search: '?name=aa'}} state={{ redirect: '/login'}}/>
```
this.props.location.state.redirect

## 对比v3 和 v4 路由的生命周期：

在react-router V4中去掉了on****的路由生命周期的钩子，但是你可以在组件中用componentDidMount或 componentWillMount 代替 onEnter，可以用componentWillUpdate 或 componentWillReceiveProps代替 onUpdate，你可以用componentWillUnmount 代替 onLeave

## react-router 不同路由对应同一组件
组件不会重新构建，只重新render，不走生命周期，
但组件内部引用的组件会重新构建，所有生命周期都会执行  使用react ref 替换refers，只框架中使用refers 之前 table willMount 中判断refers及赋值，form 是放到constructor中，最终将判断及赋值refers 放到DidMount 之后即没有问题 （可能跟同一页面，多组件生命周期渲染有关）

## react-router 提供Prompt 支持router 切换提示window.onbeforeunload 页面关闭 提示