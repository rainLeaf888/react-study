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
