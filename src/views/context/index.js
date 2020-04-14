import React, { Component } from 'react';
import ChildPage from './Child';
import { ThemeProvider } from './ThemeContext'
import SunPage from './Sun';


export default class ContextPage extends Component {
  state = {
    theme: {color: 'red'}
  }

 render() {
  return(
    <ThemeProvider value={this.state.theme}>
      <div>ContextPage</div>
      <ChildPage />
      <SunPage />
    </ThemeProvider>
    )
   }
 }

