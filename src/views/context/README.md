# Context 使用

```
const ThemeContext = React.createContext()
```

## 第一种方式：
 子组件中添加 static contextType = ThemeContext;

 直接使用this.context 即可获取值

 缺点：只能在类组件上使用，函数组件不行

## 第二种方式：
  ```
  // parent.js 父组件
  <ThemeContext.Provider value={}>
    <Child>
  </ThemeContext.Provider>

  // child.js 子组件
   <ThemeConsumer>
      {
        (value) => <div>{value}</div>
      }
    </ThemeConsumer>
  ```