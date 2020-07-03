
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
  function factorial(n, total=1) {
     if (n === 1) return total
     return factorial(n-1, n *total)
   }
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

// Decorator (装饰器)：
// 1.可修饰类, target 指向装饰的类本身
function test(isTest) {
   return function (target) {
       target.isTest = isTest
   }
}
@test(false)
class Mytestable{
}
Mytestable.isTest
// 2.可修饰类的属性, target 指向MyTest.prototype, 第二个参数name修饰的属性名，第三个参数descriptor修饰的描述对象
// 同一个方法多个装饰器时，先从外到内进入，然后由内向外执行。
// 装饰器修饰实例方法：第一个参数traget是原型对象
// 装饰器修饰静态方法：第一个参数是构造器 constructor

export function namedActionDecorator(name: string) {
    return function(target, prop, descriptor: BabelDescriptor) {
        if (descriptor) {
            // @action method() { }
            if (descriptor.value) {
                // typescript
                return {
                    value: createAction(name, descriptor.value), // 这里会执行fn.apply(scope, args) 装饰的方法
                    enumerable: false,
                    configurable: true, // See #1477
                    writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)
                }
            }
            // babel only: @action method = () => {}
            const { initializer } = descriptor
            return {
                enumerable: false,
                configurable: true, // See #1477
                writable: true, // See #1398
                initializer() {
                    // N.B: we can't immediately invoke initializer; this would be wrong
                    return createAction(name, initializer!.call(this))
                }
            }
        }
        // bound instance methods
        return actionFieldDecorator(name).apply(this, arguments)
    }
}

export function actionFieldDecorator(name: string) {
    // Simple property that writes on first invocation to the current instance
    return function(target, prop, descriptor) {
        Object.defineProperty(target, prop, {
            configurable: true,
            enumerable: false,
            get() {
                return undefined
            },
            set(value) {
                addHiddenProp(this, prop, action(name, value))
            }
        })
    }
}


class MyTest {
  @log
  add(a, b) {
    return a + b;
  }
}
function log(target, name, descriptor) {
  const oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };
  return descriptor;
}
new MyTest().add(3, 4);


