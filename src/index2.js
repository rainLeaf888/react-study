class Publisher{
  constructor(props) {
    this.events = {};
  }
  on = (name, fn) => {
    if (this.events[name]) {
      (this.events[name] = []).push(fn);
    } else {
      this.events[name] = [fn];
    }
    return () => {
      this.off(name, fn);
    }
  }

  off = (name, fn) => {
    if (!arguments.length) {
      this.events = {}
    }
    const eventList = this.events[name];
    if (eventList) {
      this.events[name] = [];
    } else {
      this.events[name] = eventList.filter(n => n !== fn)
    }
  }

  emit = (name) => {
    const eventList = this.events[name] || [];
    eventList.forEach(n => n())
  }

}




function quickSort(arr) {
  if (arr.length < 2) return arr;
  let minVal = arr[0];
  let left = [];
  let right = [];
  for(let i = 0; i < arr.length; i ++) {
    if (arr[i] > minVal) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat(minVal).concat(right);
}