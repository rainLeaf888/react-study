
// ES6:  尾调用，尾递归, 拉平数组, 箭头函数
// 1.尾调用概念：
//  某个函数的最后一步是调用另一个函数, 如 function test(x) {  return g(x) }

 function test (x) { g(x) }
  function test(x) {  g(x)  return undefined }
// 故不是尾调用

// 2.递归概念： 函数调用本身；
  //最多需要保存n个调用记录，复杂度 O(n) 
  function factorial(n) {
     if (n === 1) return 1;
     return n * factorial(n - 1);
  }
  factorial(5)

// 2.尾递归概念： 尾调用调用本身
  // 只需要保存一个调用记录，复杂度O(1)
  function factorial(n, total=1) {      if (n === 1) return total
     return factorial(n-1, n *total)   }
  factorial(5)


// 拉平数组： // 不管嵌套多少层，都可变成一维数组
[1,2, [3,4]].flat(Infinity) // [1,2,3,4]
// 将2层嵌套数组转化为一维数组
[1,2,[3,[4,5]]].flat(2) // [1,2,3,4,5]


class Test {
   a = () => {}
   render() {}
}
// 箭头函数 的方法 是挂载到实例上的， this.a = function () {}
// render(){} 是挂载到prototype上的，Test.prototype.render = function(){}

