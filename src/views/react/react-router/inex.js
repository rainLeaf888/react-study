import React, { Component } from 'react'
import store from './store'

export default class ReactRouterPage extends Component {

  // history 通过listen监听url变化
  // hash 通过onHashChange 监听url的hash变化


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