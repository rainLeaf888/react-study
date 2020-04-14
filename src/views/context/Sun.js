import React, { Component } from 'react'
import { ThemeConsumer } from './ThemeContext'


class  SunPage extends Component {
 state = {}
 render() {
  return(
    <ThemeConsumer>
      {
        (value) => <div style={{color: value.color}}>SunPage 第二种使用方式：Context.Consumer</div>
      }
    </ThemeConsumer>
    )
   }
 }

export default SunPage