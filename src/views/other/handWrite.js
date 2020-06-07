// promise 实现原生XMLHttpRequest的异步请求

function getJson(url) {
  return new Promise((resolve, reject) => {
     const handle = function () {
         console.log(this)
         // 返回一个XMLHttpRequest 代理当前所处的状态
         // 0 UNSENT 代理被创建，但尚未调用open方法
         // 1 OPENED open 方法已调用
         // 2 HEADERS_RECEIVED send 方法已调用，并头部和状态已经可获取
         // 3 下载中，responseText属性已经包含部分数据
         // 4 标示下载完毕
         if (this.readyState !==4) {
             return;
         }
         // status 响应状态
         if (this.status === 200) {
             resolve(this.response)
         } else {
             // statusText 字符串，包含http服务器返回的响应状态
             reject(new Error(this.statusText))
         }
     }

      const request = new XMLHttpRequest()
      // open(method, url, async=true)
      request.open('GET', url)
      // readyState属性发生变化，调用此函数，如果 XMLHttpRequest被abort，不会调用
      request.onreadystatechange= handle
      // 设置返回值类型
      request.responseType = 'json'
      // 设置请求header
      request.setRequestHeader('Accept', 'application/json')
      request.send()
  })
}

// getJson('http://xx/baseinfo/productImage/201908/27/af9e81bde5623b5fc6f4ce01.medium.png').then((json) => {
//    console.log('json:', json)
// }, (error) => {
//     console.log('error', error)
// })

// rxjs 实现并发请求12个
// 主要是mergeMap 控制内部订阅数量
// (function () {
// RxJS v6+
//   const {form, from, interval } = rxjs;
//   const { mergeMap } = rxjs.operators

//   const reqList = []
//   Array.from({length: 12}, (v, i) => {
//     const req = () =>new Promise((resovle) => {
//       fetch(`https://xxx/mock/298/api/demo/detail?id=1&_time=${new Date().getTime()}`)
//       .then(res => {
//         setTimeout(() => {
//           resovle(res.json())
//         }, (i+1)*1000)
//       })
//     })
//     reqList.push(req);
//   })

//   from(reqList).pipe(mergeMap(result => result(), null, 10)).subscribe(val => console.log(val))
// })();


// promise实现批量请求并发，但最多只有3个请求
// Promise.race 替换即可改变状态的promise
function limitLoad(urls, handler, limit) {
  // 对数组做一个拷贝
  const sequence = [].concat(urls)
  let promises = [];

  //并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
      // 这里返回的 index 是任务在 promises 的脚标，
      //用于在 Promise.race 之后找到完成的任务脚标
      return handler(url).then(() => {
          return index;
      });
  });

  (async function loop() {
      let p = Promise.race(promises);
      // TODO i 应该从limit开始
      for (let i = 0; i < sequence.length; i++) {
          p = p.then((res) => {
              promises[res] = handler(sequence[i]).then(() => {
                  return res
              });
              return Promise.race(promises)
          })
      }
  })()
}
// limitLoad(urls, loadImg, 3)



// async await 函数实现原理
// 本质上是generator的语法糖，与generator相比，async await的优点
// 1.内置执行器，无需手动执行next() 方法
// 2.await 后面的函数可以是promise对象也可以是普通function，而
// yield关键字后面必须是thunk函数或promise对象

// async await demo
const testPromise = Promise.resolve(2)
const testAwait = async () => {
  const val = await 1;
  console.log('result:', val)
  const val2 = await testPromise
  console.log('result2:', val2)
}

testAwait()


// generator demo
//   function * gen() {
//       const val = yield 2;
//       console.log('====',val)
//   }
//   var g = gen()
//   g.next()

// generator 实现async await
// generator 和 自动执行器 组成一个函数
// genF 是generator函数
function __awaiter (genF) {
    return new Promise((resolve, reject) => {
        const gen = genF()

        function step (nextF) {
            let next = null;
            try {
              next = nextF() //generator.next() 返回值 {value: '', done: 'true/false'}
            }catch(e) {
                return reject(e)
            }
            if (next.done) { // 执行结束
                return resolve(next.value)
            }
            // done：false，继续next调用
            Promise.resolve(next.value).then(function (v) {
               step(function () { return gen.next(v) })
            }, function (e) {
                 step(function () { return gen.throw(e) })
            })
        }

        step(function () {
            return gen.next()
        })
     })
}



// 手写Promise.all 实现
// Promise.all 当所有任务都执行完成，Promise.all 返回resolve，
// 但当有一个reject时，整个都返回失败

function promiseAll (list) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(list)) {
      return reject(new TypeError('argument must be an array'))
    }
    // 所有任务都执行完才返回
    let len = list.length;
    let num = 0;
    let returnArr = []
    for (let i = 0; i < len; i++) {
      // list[i] 是promise 可直接使用
      Promise.resolve(list[i]).then((value) => {
        num++
        returnArr[i] = value;
        if (num === len) {
          return resolve(returnArr)
        }
      }, (err) => {
        return reject(err)
      })
    }
  })
}

// test promiseAll method
var pr1 = Promise.resolve(1)
var pr2 = Promise.resolve(2)
promiseAll([pr1, pr2]).then((result) => {
   console.log('promise all:', result)
})

// 手写Promise.race 只要有一个返回整个即返回
function promiseRace (list) {
  return new Promise((resolve, reject) => {
    list.forEach((item) => {
      Promise.resolve(item).then(resolve, reject)
    })
  })
}

// 手写Promise.finally
// 1. 不接收任何参数，原来的value或者Error在finally里是收不到的
// 2. 处理后不影响原Promise的状态，该reject还是reject，该resolve还是resolve
// 3. 不影响Promise向后传递的传，resolve状态还是传递原来的value，reject状态还是传递原来的Error
Promise.prototype.finally = function(callback) {
  let P = this.constructor; // 执行Promise函数本身
  // this 执行Promise实例
  return this.then((value) => {
    return P.resolve(callback).then(() => value)
  }, (reason) => { // 还是reject状态，不变化
    return P.resolve(callback).then(() => throw reason);
  })
}



// 基于ES6 手写 call实现
// eslint-disable-next-line
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
      throw new TypeError('Error')
  }
  // (指向demo中Child)
  context = context || window;
  // this 指向调用call的函数（demo中Parent函数）
  context.fn = this;
  const args = [...arguments].slice(1)
  // context.fn函数中的this 指向 demo中的 new Child() 实例
  const result = context.fn(...args)
  delete context.fn;
  return result;
}

// test demo
function Parent(name) {
this.name = name;
   console.log('parent this:', this)
}
function Child (name) {
  Parent.myCall(this, name)
  this.category = 'aaa'
}
new Child('test')

// 基于ES6 手写 apply实现 同call 实现，只是参数args=argument[1]
// eslint-disable-next-line
Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments][1];
  const result = context.fn(...args)
  delete context.fn;
  return result;
}

// 基于ES3 手写bind实现
// eslint-disable-next-line
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') throw new Error('---')
  // 调用bind的函数
  let fnToBind = this;
  let args = [...arguments].slice(1)

  let fnBound = function () {
     // 获取函数的参数
     var bindArgs = Array.prototype.slice.call(arguments);
    // 返回函数的执行结果
    // 判断函数是作为构造函数还是普通函数
    // 构造函数this instanceof fNOP返回true，将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值。
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return fnToBind.apply(this instanceof fNOP ? this: context, args.concat(bindArgs))
  }
   // 创建空函数
  let fNOP = function () {};
    // fNOP函数的prototype为绑定函数的prototype
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }
   // 返回函数的prototype等于fNOP函数的实例实现继承
  fnBound.prototype = new fNOP()
  return fnBound;
}

// 基于ES6 手写bind 实现
// eslint-disable-next-line
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') throw new TypeError('invalid invoked!');
  const me = this; // 这个this指向的是myBind的调用者
  const args = [...arguments].slice(1);
  return function Result() {
    // myBind最后return了Result方法，但是没有运行，这里的this指向运行时的环境
    if(this instanceof Result) {
      // Result可能被当做构造函数来使用
      // 兼容使用new来创建Result实例
      // 既可以在myBind调用时传参，也可以实例化的时候传参
      return new me(...args, ...arguments);
    }
    return me.apply(context, args.concat(...arguments));
  }
}


// 防抖简写版
function debounce(fn, delay) { // fn 参数问题及this指向
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    const args = [...arguments];
    const self = this;
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay)
  }
}
// 截流 简写版
function throttle(fn, delay) {
  let timer = null;
  let startTime = new Date().getTime();
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    let currentTime = new Date().getTime()
    if (currentTime - startTime > delay) {
      startTime = currentTime;
      fn();
    } else {
      timer = setTimeout(fn, delay);
    }
  }
  // 第二种
  // let flag = true;
  // return (...args) => {
  //   clearTimeout(timer)
  //   if (!flag) return;
  //   flag = false;
  //   setTimeout(() => {
  //     fn.apply(this, args)
  //     flag = true;
  //   }, delay);
  // }
}


// 实现 Event Bus 发布订阅模式 借助第三方实现调度
class EventCenter {
  constructor() {
    this.events = Object.create(null)
  }

  on(name, callback) {
    // 因为其他的类可能继承自EventEmitter，子类的events可能为空，保证子类必须存在此实例属性
    if(!this.events) {
      this.events = Object.create(null);
    }
    const arr = this.events[name] || (this.events[name] = [])
    arr.push(callback)
    return () => this.off(name, callback)
  }

  off(name, callback){
    if (!arguments.length) {// name，callback 为空移除所有
      this.events = Object.create(null);
    } else {
      if (!callback) {
        delete this.events[name];
      } else {
        const result = this.events[name].filter(n => n !== callback);
        if (result.length > 0){ // 移除指定callback
          this.events[name] = result;
        } else {
         delete this.events[name];
        }
      }
    }
  }

  emit(name, ...args){
    const arr = this.events[name] || [];
    arr.forEach(n => {
      if (typeof n === 'function') n.apply(this, args)
    })
  }
}

// test deom
var eventCenter = new EventCenter()
eventCenter.on('test', (p) => {
  console.log('===event bus', p)
})
eventCenter.emit('test', 'test on')

// 实现一个观察者模式， 主体和观察者相互感知
var subject = {
	observers: [],
	notify() {
		this.observers.forEach(observer =>{
			observer.update()
		})
	},
	attach (observer) {
		this.observers.push(observer)
	}
}
var observer = {
	update(){
		alert('updated')
	}
}
subject.attach(observer)
subject.notify()


// 实现一个new [ function P () {}  var a = new P(); ]
function _new(fn, ...args) {
  var o = Object.create(fn.prototype); // 创建空对象，且空对象的__proto__属性指向构造函数的原型对象
//     var o = Object.create({}) // 创建空对象
//     o.__proto__ = fn.prototype; // 空对象的__proto__属性指向构造函数的原型对象
  var result = fn.call(o, ...args) // 指定this指向
  // P函数return 一个对象，那a实例即是return的对象
  return Object.prototype.toString.call(result) === '[object Object]' ? result: o;
}


// 实现 instanceof
function myInstanceOf (left, right) {
  let prototype = right.prototype; // 类型的原型
  left = left.__proto__; // 对象的原型
  while(true) {
    //原型链最终是null
    if (left === null || left === undefined) {
      return false;
    }
    if (left === prototype) {
      return true;
    }
    left = left.__proto__;
  }
}


// 手写Promise
// 定义状态 pending，resolved rejected 只能有一种状态变更到另一种，不可逆转; then函数实现
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(constructor) {
  const me = this;
  me.status = PENDING; // 默认初始化状态
  me.value = null;
  me.reason = null;
  me.resolveTasks = [];
  me.rejectTasks = [];
  // 成功状态
  function resolve(value) {
    if(me.status === PENDING) {
      me.value = value;
      me.status = RESOLVED;
      me.resolveTasks.map(cb => cb(me.value));
    }
  }
  // 失败状态
  function reject(reason) {
    if(me.status === PENDING) {
      me.reason = reason;
      me.status = REJECTED;
      me.rejectTasks.map(cb => cb(me.reason));
    }
  }
  try {
    constructor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
// 重要
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const me = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : e => {
    throw e;
  }

  if(me.status === RESOLVED) {
    onFulfilled(me.value);
  }
  if(me.status === REJECTED) {
    onRejected(me.reason);
  }
  if(me.status === PENDING) {
    me.resolveTasks.push(onFulfilled);
    me.rejectTasks.push(onRejected);
  }
}

// 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个。
// 完善下面代码中的 Scheduler 类，使得以下程序能正确输出。
class Scheduler {
  add(promiseCreator) { }
  // ...
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// TODO 最后的顺序 2，3，1，4
// 队列实现


// 实现一个el
const el = require('./element.js');
const ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
])
const ulRoot = ul.render();
document.body.appendChild(ulRoot);

function CreateEl(type, props, children) {
  return {
      render: () => {
       const node = document.createElement(type);
      const childs = children.map(child => {
      if (typeof child === 'string') { // 字符串
        return  document.createTextNode(child)
      } else { // 返回object
         return  child.render()
      }
       })
       node.appendChild(childs)
    }
  }
}


