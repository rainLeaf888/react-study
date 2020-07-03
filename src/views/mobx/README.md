# Mobx 使用及原理解析

## mobx4升级到mobx5:
    最大变化是mobx5是采用proxy实现的可劫持整个对象，还不是对象的某个属性
1. shallowMap 废弃了
2. 动态属性可直接使用 plain object，而不是map
3. observable.map 的使用在使用 keys(), values() 返回的是迭代器，不可直接遍历

### Mobx4:
使用defineProperty 实现，故异步调用，@action 和async await 不能解决observable属性改变多次，即触发多次render的结果，必须将 所有observable属性改变放到 runInAction中

### Mobx5 以上：
使用Proxy实现，故异步调用， @action 和async await  可解决observable属性多次改变，只触发一次render的结果，或者用runInAction



## autorun
![图片alt](./mobx.jpeg)

### 源码文章
* [mobx auto 源码解析](https://segmentfault.com/a/1190000013682735)

## bindDependencies 更新依赖 <font style='color:red'>重要</font>
### 借助diffValue，将新旧 observing数组比较算法的复杂度（原朴素算法 时间复杂度为 O(n^2)）降低 O(n)
```
function bindDependencies(derivation: IDerivation) {
  const prevObserving = derivation.observing
  const observing = (derivation.observing = derivation.newObserving!)
  // 记录更新依赖过程中，新观察的 Derivation 的最新状态
  let lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE

  // 遍历新的 observing 数组，使用 diffValue 这个属性来辅助 diff 过程：
  // 所有 Observable 的 diffValue 初值都是0（要么刚被创建，继承自 BaseAtom 的初值0；
  // 要么经过上次的 bindDependencies 后，置为了0）
  // 如果 diffValue 为0，保留该 Observable，并将 diffValue 置为1
  // 如果 diffValue 为1，说明是重复的依赖，无视掉
  let i0 = 0,
    l = derivation.unboundDepsCount
  for (let i = 0; i < l; i++) {
    const dep = observing[i]
    if (dep.diffValue === 0) {
      dep.diffValue = 1
      // i0 不等于 i，即前面有重复的 dep 被无视，依次往前移覆盖
      // derivation.newObserving : [A, B, A, B, C] 初始值diffValue 都为0, A 引用是同一个
      // 遍历到第一个B时， diffValue: [1,1,1,1, 0], 此时 i0 = 2, 判断dep.diffValue = 0,即到C， 故 i0 =2, i = 3, 直接将C移动到数组索引=2的位置，即覆盖了之前重复的项
      if (i0 !== i) observing[i0] = dep
      i0++
    }

    // 更新 lowestNewObservingDerivationState
    if (((dep as any) as IDerivation).dependenciesState > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = ((dep as any) as IDerivation).dependenciesState
    }
  }
  observing.length = i0

    derivation.newObserving = null
  // 遍历 prevObserving 数组，检查 diffValue：(经过上一次的 bindDependencies后，该数组中不会有重复)
  // 如果为0，说明没有在 newObserving 中出现，调用 removeObserver 将 dep 和 derivation 间的联系移除
  // 如果为1，依然被观察，将 diffValue 置为0（在下面的循环有用处）
  l = prevObserving.length
  while (l--) {
    const dep = prevObserving[l]
    if (dep.diffValue === 0) {
      removeObserver(dep, derivation)
    }
    dep.diffValue = 0
  }

  // 再次遍历新的 observing 数组，检查 diffValue
  // 如果为0，说明是在上面的循环中置为了0，即是本来就被观察的依赖，什么都不做
  // 如果为1，说明是新增的依赖，调用 addObserver 新增依赖，并将 diffValue 置为0，为下一次 bindDependencies 做准备
  while (i0--) {
    const dep = observing[i0]
    if (dep.diffValue === 1) {
      dep.diffValue = 0
      addObserver(dep, derivation)
    }
  }

  // 某些新观察的 Derivation 可能在依赖更新过程中过期
  // 避免这些 Derivation 没有机会传播过期的信息（#916）
  if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
    derivation.dependenciesState = lowestNewObservingDerivationState
    derivation.onBecomeStale()
  }
}
```
## 对obserables作出响应

* reaction: 对追踪observable 细粒度的控制
```
  reaction(() => data, (data, reaction) => { sideEffect }, options?)
```
效果函数只 针对表达式返回值发生变化时触发。（或 reaction需要你生产 效果 函数中所需要的东西） 表达式的返回值作为效果函数的参数传入

* autorun：只会观察在执行提供的函数时所使用的数据， 不会产生新的值

所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。

* computed: 只有参与计算的属性变化才会会重新计算


## 改变observables

* action：只会对当前运行的函数作出反应，而不会对当前运行函数所调用的函数（不包含在当前函数之内）做出反应。 故 不会对 action 中存在的setTimeout，promise的then 或 async语句并且在回调函数中某些状态改变了 作出反应。

* 解决异步方式：
  1. 直接使用 @action 装饰方法，内部的异步操作直接使用async  await 处理，
  2. 不使用@action装饰的方法，内部异步返回 操作 state 或 observable 对象，使用 runInAction 包装

* async await:

   await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。