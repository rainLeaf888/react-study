// 使用Promise A+规范实现
// 1.then
// 2.value 是 promise状态成功时的值，包括undefined/thenable或是promise
// 3.reason 是 promise状态失败时的值
// 4.expcetion 是一个使用throw抛出的异常值
// promise状态：pending, fulfilled, rejected

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  that.status = PENDING;
  //resolve
  that.value = '';
  that.resolveCbTask = []; // 回调函数
  // reject
  that.reason = '';
  that.rejectCbTask = []; // 回调函数

  function resolve (value) {
    if(that.status === PENDING) {
      that.status = FULFILLED;
      that.value = value;
      that.resolveCbTask.forEach(cb => cb(that.value))
    }
  }
  function reject (error) {
    if(that.status === PENDING) {
      that.status = REJECTED;
      that.reason = error
      that.resolveCbTask.forEach(cb => cb(that.reason))
    }
  }

  try {
    fn(resolve, reject);
  } catch (error) {

  }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const me = this.that;
  onFulfilled = (typeof onFulfilled === 'function') ? onFulfilled : v => v;
  onRejected = (typeof onRejected === 'function') ? onRejected : e => {
    throw new Error('xx')
  };
  if (me.status === FULFILLED) {
    onFulfilled(me.value);
  }
  if (me.status === REJECTED) {
    onRejected(me.reason);
  }
  if (me.status === PENDING) {
    me.resolveCbTask.push(onFulfilled);
    me.rejectCbTask.push(onRejected);
  }
}