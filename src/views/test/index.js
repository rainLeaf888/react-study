// 1. `18812341234` -> `188****1234`

function replaceStr(phone) {
  return phone.substring(0,2) + '****' +
  phone.substring(phone.length-4, phone.length-1);
}

// fs.readFile(p, o, (err, data) => {})
const fs = require('fs');
function req(p, o) {
  return new Promise((resolve, reject) => {
    fs.readFile(p, o, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}

//var req = promisify(fs.readFile) 
function promisify(fn) {
  return function (..args) {
    return new Promise((resolve, reject) => {
      fs.readFile(...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    });
  }
}

// new 实现
//  connect 
// render 减少渲染次数
//  hooks
//  useMemo()
//  useCallback() 
// 进程和线程
// http https
// MVVM


function getData() {
  return new Promise((resolve, reject) => {
    getList().then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err);
    })
  })
}

function getMaxNum(arr, num) {

  const result = arr.sort((a, b) => b - a );
  return result[num -1]
}

// function convert(str) {
//   return str.replace(/\_(\w\)/g, function(all, letter) {
//     return letter.toUppercase();
//   })
// }

function test(str) {
  const obj = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  const arr = [];
  const values = [];
  for(let i = 0; i < str.length; i ++) {
    if (['(', '{', '['].includes(str[i])) {
      arr.push(str[i]);
    }
    if (obj[arr[arr.length -1]] === str[i]) {
      // arr.pop()
      values.push(str[i]);
    };
  }

  if (arr.length === values.length) {
    while(arr.length) {
      const i = arr.lastIndexOf('(')
      const j = arr.lastIndexOf('[')
      const n = arr.lastIndexOf('{');
      if (i > (j > -1 ? j : (n > -1 ? n : -1))) {
        arr.pop();
      }
    }
    if (arr.length) return false;
    return true;
  } else {
    return false;
  }

  // if (!arr.length) return true;

  // return false;
}
test('2*(1+2)')
test('2*(1+2')
test('2*((1+2)')
test('2*(1+2))')
test('2*1+2)')


// import React from 'react';

// class Singletone {
//   constructor(props) {
//     super(props);
//     this.instance = null;
//   }

//   static getInstances() {
//     if (this.instance) {
//       return this.instance;
//     }
//     return new Singletone();
//   }
// }

// const instance = Singletone.getInstances();


// const fs = require('fs')

// fs.readFile('package.json', (err, data) => {
//   const { dependience, devDependience } = data;

//   // 对比yarn.lock 或者package-lock.json 文件，新增依赖包，更新yarn.lock 或package-lock.json

//   // 读取yarn.lock 或者package-lock.json

//   // 下载 对应版本 依赖包 xx.tar

//   // 创建node_modules

//   // 解压文件并置node_modules 文件中

//   // 递归处理 读取 依赖包 里的package.json ,并下载放到 node_modules 中

//   // 相同包不同版本处理
// })

// class Comp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       menuData: [{
//         title: '一级',
//         value: 'first',
//         path: '',
//         children: [{
//           title: '二级',
//           value: 'second',
//           path: ''
//         }]
//       }],
//       authMap: {
//         '': true, // path: authed
//       }
//       //  [{
//       //   uri: '', // path路径
//       //   authed: true
//       // }]
//     }
//   }

//   handleClick = () => {}

//   handleMenuClick = (menu) => () => {
//     // 跳转
//   }

//   render() {
//     const { menuData = [], authMap } = this.state;
//     return (
//       <div>
//         {
//           menuData.map(item => (
//             <div key={item.value}>
//               <h3>{item.title}</h3>
//               {
//                 item.children && item.children.length && item.children.map(child => (
//                 <div key={child.value}>
//                   <div onClick={this.handleMenuClick(child)}>{child.title}</div>
//                 </div>))
//               }
//             </div>
//           ))
//         }
//       </div>
//     )
//   }
// }



// function test (arr1, arr2) {
//   arr1.filter(n => {
//     // arr2
//   })

//   // return [...new Set(arr1)].filter(n => [...new Set(arr2)].includes(n))
// }

// [1,1,2,3,4]
// [1,1,5,6]

// 浏览器为什么不使用vdom？
// react 引入vdom的目的，更方便后期选型及react或浏览器发展
// filter实现去重复

