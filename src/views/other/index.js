// 手动实现new
 function myNew(fun) {
  const obj = {}; // 创建一个空对象
  obj.__proto__ = fun.prototype; // 实例对象__proto__ 指向函数原型
  const result = fun.apply(obj, [...arguments].splice(1)); // 绑定this指向
  // 函数如果return {test: '1'} 对象, new 的实例对象为return的对象
  return typeof result === 'object' ? result : obj;
}

function Person(name) {
  this.name = name;
}
console.log(myNew(Person, 'aaa'));


// 手动实现call /apply
// eslint-disable-next-line
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') throw new Error('xxx')
  context = context || window;
   // this 指向调用call的函数（demo中Parent函数）
  context.fn = this;
  // call 实现 除第一个参数，后续可有多个参数
  const args = [...arguments].splice(1);
  // apply 实现 第二个参数是数组
  // const args = [...arguments][1]
   // context.fn函数中的this 指向 demo中的 new Child() 实例
  const result = context.fn(...args)
  delete context.fn;
  return result;
}

function Parent(name) {
  this.name = name;
  console.log('parent this:', this)
}
function Child (name) {
  Parent.myCall(this, name)
  this.category = 'aaa'
}
new Child('test')

function test () {
  var arr = ['a', 'b', 'c'];
  var obj = {name: 'test', sex: 'male'}
  // symbol 属性
  var symbolProp = Symbol('symbol');
  obj[symbolProp] ='symbol';
  // 设置不可枚举属性
  Object.defineProperty(obj, 'age', {
    enumerable: false,
    value: 19
  })
  // 添加继承属性
  Object.prototype.address = '北京市';
  Object.prototype.sayHi = function () {
    console.log('hellow')
  }
   //console.log name sex address sayHi
  for(var n in obj) {
    console.log('for...in:', n);
  }
  //console.log ["name", "sex"]
  console.log('Object.keys:', Object.keys(obj))
  //console.log ["name", "sex", "age"]
  console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))
  // for(var m of obj) { } // 报错，遍历属性需要内部实现Symbol.iterable
  //console.log ["name", "sex", "age", Symbol(symbol)]
  console.log('Reflect.ownKeys:', Reflect.ownKeys(obj));
  // console.log a b c
  for (var t of arr) {
    console.log('for...of:', t);
  }
  // console.log  "0", "1", "2", 'address', 'sayHi'
  for(var tn in arr) {
    console.log('for...in 遍历数组：',tn)
  }
  //console.log ["0", "1", "2", "length"]
  console.log('Reflect.ownKeys 获取数组属性：', Reflect.ownKeys(arr))
  //console.log ["0", "1", "2", "length"]
  console.log('Object.getOwnPropertyNames 获取数组属性：', Object.getOwnPropertyNames(arr))
  // console.log  ["0", "1", "2"]
  console.log('Object.keys获取数组属性：', Object.keys(arr))
}