import React, { Component } from 'react';
import { observable, autorun } from 'mobx';
import { observer } from 'mobx-react';

// create-app 创建的react项目中，不能使用装饰器，
// 安装babel 装饰器相关插件且配置babelrc 也不行

// @observer
class MobxParse extends Component {

  // @observable.ref bankUser = {
  //   name: '张三',
  //   income: 3
  // }

  // dispose = autorun(() => {
  //   console.log('=======', this.bankUser.income);
  // })

  // onUpdate = () => {
  //   const { income } = this.bankUser;
  //   this.bankUser.income = +income + 5;
  // }

  // render = () => (
  //   <div>
  //     银行账户余额：{this.bankUser.income}
  //     <button onClick={this.onUpdate}>变更余额</button>
  //   </div>
  // )
}

export default  MobxParse