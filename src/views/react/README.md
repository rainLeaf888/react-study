## diff 算法
  * 算法复杂度 O(n) 深度优先
## diff 策略
1. 同级比较, web ui 中Dom节点跨层级移动操作很少，可忽略不计
2. 两个不同类型的元素会生成不同的树

  例如：A --> B, CompA --> CompB
3. 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定（保证key的稳定性）

## react fiber
* 能够把可中断的任务切片处理。
* 能够调整优先级，重置并复用任务。
* 能够在父元素与子元素之间交错处理，以支持 React 中的布局。
* 能够在 render() 中返回多个元素
* 更好地支持错误边界

## fiber 结构
* child
* sibling
* return

## React 优化
 
  * 减少不必要渲染
    * shouldComponentUpdate 处理哪些情况不需要渲染
    * PureComponent class组件，shouldComponentUpdate中处理 props 和 state浅比较
    * React.memo function的pure组件，比较两次的props 和ref，如果相等即认为没有变化，就不需要update

  * map 遍历组件添加key（唯一值，不建议使用index）(目的：组件复用)
  * 数据缓存
    * useMemo 缓存参数
    ```
      // 伪代码
      const prevState = hook.memoizedState;
      const prevDeps = deps;
      // 比较依赖项
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
      // 依赖项变化，重新计算赋值
      const nextValue = nextCreate();
      hook.memoizedState = [nextValue, nextDeps];
    ```
    * useCallback 缓存函数
    ```
      // 伪代码
      const nextDeps = deps;
      const prevState = hook.memoizedState;
      const prevDeps = prevState[1];
       // 比较依赖项
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
      // 依赖项变化, 重新赋值
      hook.memoizedState = [callback, nextDeps]
    ```
  * 函数、对象 尽量不要使用内联方式 (function, ref, context的value)
  ```
    handleClick = () => {}
    render() {
      return (
        // bad 每次render时，会导致此函数的重新初始化和卸载
        <button onClick={() => {}}>click</button>
        // good
        <button onClick={this.handleClick}>click</button>
      )
    }
  ```
  * Router中的<font color='red'>内联函数</font>渲染时使用render或者children，不要使用component
    * 使用component时，Router会使用组件和React.createElement 创建新的元素，当提供的是一个内联函数时，会先卸载，然后在挂载一个新的组件
  
  * 不要滥用功能项 （context，props）
  * 懒加载 （长页列表分页加载）
  * 减少http 请求