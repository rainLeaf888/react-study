import React, { Component } from 'react'
import store from './store'

export default class ReduxPage extends Component {

  add = () => {
    store.dispatch({ type: 'ADD' })
  }

  minus = () =>{
    store.dispatch({ type: 'MINUS' })
  }

  componentDidMount() {
    const { fn1, fn2, fn3 } = this;
    this.compose(fn1, fn2, fn3)('omg')
    store.subscribe(() => {
      console.log('state value:', store.getState().count)
      this.forceUpdate();
    })
  }

  fn1 = (...args) => {
    console.log('f1', ...args)
    return args;
  }

  fn2 = (...args) => {
    console.log('f2', ...args)
    return args;
  }

  fn3 = (...args) => {
    console.log('f3', ...args)
    return args;
  }

  // fn1(fn2(fn3()))('aaa')
  // redux中中间件组合成chain
  compose = (...funcs) => {
    if (funcs.length === 0) {
      return arg => arg
    }

    if (funcs.length === 1) {
      return funcs[0]
    }

    return [...funcs].reduce((a, b) =>{
      console.log('====================reduce a:', a, 'b:', b);
      return (...args)  => {
        console.log('a', a, 'b:', b);
        return a(b(...args));
      }
    });
  }


  render = () =>{
    console.log('store:', store)
    return (
      <div>
        <div>{store.getState().count}</div>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    )
  }
}