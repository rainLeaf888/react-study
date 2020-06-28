import React, { Component } from 'react'
import { Provider} from 'react-redux'
// import { Provider } from './kreact-redux';
import Page from './page'
import store from '../store'

export default class ReactReduxPage extends Component {

  render(){
    console.log('store:', store)
    return (
      <Provider store={store}>
        <Page />
      </Provider>
    )
  }
}