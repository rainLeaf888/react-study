import React, { useState, useEffect, useRef, useReducer, useContext, useMemo } from 'react'
import { ThemeContext } from '../context/ThemeContext';

function reducer(state, action) {
  switch(action.type) {
    case 'ADD':
      return {count: state.count +1}
    case 'MINUS':
      return {count: state.count -1}
    default:
      return {...state}
  }
}

function Child () {
  const context = useContext(ThemeContext);
  return <div style={{color: context.color}}>useContext hook</div>
}


const Num = () => {
  const [num] = useState(1000);
  return num;
}

export default function HookPage () {
  const [count, setCount] = useState(0)
  const inputEl = useRef(null);
  const [state, dispatch] = useReducer(reducer, {count: 0})
  useEffect(() => {
    // count 变化时执行
    console.log('useEffect count')
    document.title = `点击了${count}`;
  }, [count]); // 依赖项变化时执行

  useEffect(() => {
    return () => {
      // 卸载时拿到的数据不是最新的
      console.log('=====document.title:', document.title);
    }
  }, []);

  return (
    <div>
      <div><span>useState hook使用：{count}</span>
        <button onClick={() => {
          setCount(count+1)
        }}>Click</button>
        <div>自定义hook: {useClock()}</div>
      </div>
      <div>
        <input ref={inputEl} />
        <button onClick={() => {
          inputEl.current.focus();
        }}>useRef hook</button>
      </div>
      <Num ref={(v) => {
        console.log('num ref', v);
      }}/>
      {/* <span>{useNum()}</span> */}
      <div>
        <span>useReducer hook: {state.count}</span>
        <button onClick={() => dispatch({type: 'ADD'})}>+</button>
        <button onClick={() => dispatch({type: 'MINUS'})}>-</button>
      </div>
      <div>
        <ThemeContext.Provider value={{color: 'red'}}>
          <Child />
        </ThemeContext.Provider>
      </div>
    </div>
  )
}

// 自定义hook，命名要求必须以use开头，可调用其他hook
function useClock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    // 只需要didMount执行
    console.log('useEffect timer')
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000);
    // 清除定时器，类型在willUnMount 执行
    return () => clearInterval(timer);
  }, []);
return <span style={{color: 'red'}}>{date.toLocaleTimeString()}</span>
}