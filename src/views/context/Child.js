import React, { Component } from 'react';
import { ThemeContext } from './ThemeContext';


class  ChildPage extends Component {
  // 第一种Context使用 使用static 这方式
  // 或 ChildPage.contextType = ThemeContext;
  static contextType = ThemeContext;

 render() {
  const {color} = this.context;
  console.log('child context:', this)
  return(
    <div style={{color: color}}>ChildPage 第一种使用方式：static contextType</div>
      )
   }
 }

export default ChildPage