import React from "react";
import { bindActionCreators } from "redux";

const ValueContext = React.createContext();

// connect 作用连接 store 和 组件
export const connect = (mapStateToProps = state => state,
   mapDispatchToProps) => (WrapperComponent) => {

  return class Comp extends React.Component{
    static contextType = ValueContext; // 拿到store
    constructor(props) {
      super(props);
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const { subscribe} = this.context;
      this.update();
      subscribe(() => {
        this.update();
      })
    }

    update = () => {
      const { getState, dispatch} = this.context;
      const stateProps = mapStateToProps(getState());
      let dispatchProps;
      if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch); // 将普通对象包装为dispatch({type: ''})
      } else if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
      } else {
        dispatchProps = dispatch
      }
      this.setState({
        props: {
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render() {
      return (<WrapperComponent {...this.state.props}></WrapperComponent>)
    }
  }
}

export class Provider extends React.Component {
  render() {
    return (<ValueContext.Provider value={this.props.store}>
      {this.props.children}
    </ValueContext.Provider>)
  }
}
