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
    store.subscribe(() => {
      this.forceUpdate();
    })
  }

  render = () =>{
    console.log('store:', store)
    return (
      <div>
        <div>{store.getState()}</div>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    )
  }
}