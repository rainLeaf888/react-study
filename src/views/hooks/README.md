### hook 概览
* 让函数组件里“钩入”state 及生命周期等特性的函数
### React引入hook解决什么问题？
* 在组件之间复用复杂状态逻辑很难
  * 高阶组件，render props, 在 React DevTools中provider，consumer，高阶组件，render props 等抽象组合的组件形成嵌套

* 生命周期带来的重复逻辑
  * 目前一般放在高阶组件中处理
  * componentDidMount componentDidUpdate 中都可获取数据，但componentDidMount 中还可能包含很多其他逻辑
* 逐渐废弃class
### hook使用注意事项
* 只能在函数组件最顶层调用hook，不能在循环，条件判断，子函数中使用
* 只能在React函数组件(自定义hook)中调用,不要在普通的 JavaScript 函数中调用 Hook
### hook API
### 基本hook
* useState
```
const [state, setState] = useState(initialState);
```
  1. 极简的方式渲染组件
  2. 让stateless component组件拥有state
* useEffect
```
 useEffect(didUpdate, [source])
```
  1. 生命周期的替换（componetDidMount,componetDidUpdate）
  2. 第二个参数effect依赖的数组项
  3. 在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用
* useContext
### 高级hook
* useReducer
```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
* useCallback

它将返回该回调函数的 memoized 版本;事件绑定可使用，状态值变化，函数组件重新render时，不会在重新创建一次事件绑定函数
```
const memoizedCallback = useCallback(() => {}[deps]);
```
* useMeo
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
1. 参数一 函数会在渲染期间执行，函数内部不要作与渲染无关的操作
2. 参数二 是依赖项，在某个依赖项改变时才重新计算 memoized 值； 如果不传此参数，useMemo 在每次渲染时都会计算新的值。
* useRef
```
const refContainer = useRef(initialValue);
```
  1. useRef 会在每次渲染时返回同一个 ref 对象.
  2. 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染
* useImperativeHandle
* useLayoutEffect
  1. 在所有的 DOM 变更之后同步调用 effect