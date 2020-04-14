import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReduxPage from './views/redux';
import ContextPage from './views/context';
// react hook
import HookPage from './views/hooks';
// create-app 创建项目不支持js中使用装饰器
// import MobxPage from './views/mobx';
// 手写js
 import './views/other';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <article>
        <h2>Redux 使用及源码</h2>
        <ReduxPage />
        <h2>React Context 使用</h2>
        <ContextPage />
        <h2>mobx 原理解析</h2>
        {/* <MobxPage /> */}
        <h2>react hook</h2>
        <HookPage />
      </article>
    </div>
  );
}

export default App;
