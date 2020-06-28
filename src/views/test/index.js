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

