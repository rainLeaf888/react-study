function debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const self = this;
    const args = [...arguments]
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, delay)
  }
}

function throltte(fn, delay) {
  let timer;
  let start = new Date().getTime()
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const now = new Date().getTime();
    if (now - start > delay) {
      start = now;
      fn()
    } else {
      timer = setTimeout(fn, delay);
    }
  }
}


function roundSort(arr) {
  // let newArr = [];
  for (let i = 0; i < arr.length; i ++) {
    const index = Math.floor(Math.random() * arr.length);
    // newArr.push(arr[index]);
    // arr.splice(index, 1);
    // i--;
    let temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
  // return newArr;
  return arr;
}