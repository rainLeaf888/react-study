import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { connect } from './kreact-redux';
import { bindActionCreators } from 'redux'

export default connect(
  // mapToStateToProps(state, [ownProps]), // ownProps 组件本身的props，
  // 谨慎使用，ownProps发生变化的时候，mapToStateToProps会重新执行，state会重新计算, 会影响性能
  state => ({ count: state}),
  // mapToDispatchToProps(Object|function)
  // 如果不指定mapToDispatchToProps，默认props会被注入dispatch本身
  // Object 内部使用dispatch包装了action
  // {
  //   add: () => ({type: 'ADD'}),
  //   minus: () => ({type: 'MINUS'})
  // },
  // function   // ownProps 组件本身的props，
  // 谨慎使用，ownProps发生变化的时候，mapToStateToProps会重新执行, 会影响性能
  (dispatch, ownProps) => {
    // 自己用dispatch包装很麻烦
    // const rest = {
    //   add: () => dispatch({type: 'ADD'}),
    //   minus: () => dispatch({type: 'MINUS'})
    // }
    // 
    let rest = {
      add: () => ({type: 'ADD'}),
      minus: () => ({type: 'MINUS'})
    }
    rest = bindActionCreators(rest, dispatch);
    return {
      dispatch,
      ...rest
    }
  },
  // mergeProps
  // (stateProps, dispatchProps, ownProps) => {
  //   return {omg: 'omg', ...stateProps, ...dispatchProps, ...ownProps}
  // }
)(
  class ReduxPage extends Component {

  render = () =>{
    console.log('react-redux-page props:', this.props)
    const { dispatch, count = {}, add, minus } = this.props;
    return (
      <div>
        <div>加法结果：{count.count}</div>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
        <button onClick={() => dispatch({type: 'ADD'})}>add use dispatch</button>
        <button onClick={() => dispatch({type: 'MINUS'})}>minus use dispatch</button>
      </div>
    )
  }
})