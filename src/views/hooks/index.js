import React, { useState, useEffect, useRef, useReducer, useContext } from 'react'
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

export default function HookPage () {
  const [count, setCount] = useState(0)
  const inputEl = useRef(null);
  const [state, dispatch] = useReducer(reducer, {count: 0})
  return (
    <div>
      <div><span>useState hook使用：{count}</span>
        <button onClick={() => {
          setCount(count+1)
        }}>Click</button>
      </div>
      <div>
        <input ref={inputEl} />
        <button onClick={() => {
          inputEl.current.focus();
        }}>useRef hook</button>
      </div>
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