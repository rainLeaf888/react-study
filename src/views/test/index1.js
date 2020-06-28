function merge(arr) {
  if (arr.length < 2) return arr;
  
  const newArr = arr.sort((a, b) => a.start - b.start);

  return uqnite(newArr, 0);

  function uqnite (list, i) {
    if (list.length -1 === i) {
      return list;
    }
    if (list[i].start <= list[i+1].start && list[i+1].start <= list[i].end) {
      list[i] = {
        start: Math.min(list[i].start, list[i+1].start),
        end: Math.max(list[i].end, list[i+1].end)
      };
      list.splice(i+1, 1);
    } else {
      i ++;
    }
    return uqnite(list, i);
  }
}
console.log(merge([
  { start: 1, end: 2 },
  { start: 2, end: 5 },
  { start: 3, end: 4 },
  { start: 6, end: 7 },
]));