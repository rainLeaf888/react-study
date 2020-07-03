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

// new 实现
//  connect 
// render 减少渲染次数
//  hooks
//  useMemo()
//  useCallback() 
// 进程和线程
// http https
// MVVM


// event loop setInterval 回调会丢失
// promise async await 优缺点
//
// BFC 块级格式化上下文
// 会形成单独的块，跟其他的元素不相互影响

// XSS 跨站脚本攻击

// graphQL
// http缓存last-modified 缺点
// http缓存 强缓存 如何命中协商缓存

// 线程通讯，
// .baidu.com,  baidu.com cookie的区别，
// cookie里有哪些设置，
// 写个不爆栈的递归(没有跳出条件)
// 一个div 中，有个图片，为什么会有一个空白条
// vertical-middle
// float修饰的行标签宽高，border,margin,padding会生效吗  ---生效
// 箭头函数和普通函数区别，箭头函数的指向是在编译还是运行确认的？
// 重排和重回
// 哪些css可以开启硬件加速


// hook 原理
// this.state  useState 区别
// webpack 打包原理  （css是如何打包，是字符串还是对象）
// 搜索框 和按钮，不定宽实现  如何实现（可参考antd的实现）
// 100万数字取最大的5个数
// 分块，找出每块中最大的5个数，然后比较最大值跟另外一个块的最小值比较
// 最大堆

// ts type 和interface区别
// ts 忽略属性怎么定义pick，includes，ignore
// es6 class 编译之后是 什么样子的
// babel-poillify 怎么 实现 map，set
// babel-core 如何配置浏览器版本
// hook useMemo 和useCallback  useCallback 底层实现（useMemo）
// vue 和 react 区别， 
// react diff 时间复杂度 O(n^3)  n^2 两个颗树，两层循环，最后 一个n 查找节点
// react diff firbe 时间复杂度 O(n), 使用链表，只需要遍历一次

