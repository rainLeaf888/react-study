
//-------------- 排序算法  --------------------
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

//-. 冒泡排序时间复杂度：  O(n) ～ O(n²)

// 普通冒泡排序
function bubbleSort(arr) {
  for(let i = 0; i< arr.length;i++) {
    // j < arr.length -1 -i, -i 是因为最大值已放到最后，不需要在比较
    for(let j=0; j< arr.length -1 - i; j++) {
      if (arr[j] > arr[j+1]) {
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  console.log('sort after:', arr)
}

bubbleSort(arr)


// 优化冒泡排序
function sort1 (arr) {
   var i = arr.length -1;
   while(i > 0) {
     var pos = 0;
     for (var j =0; j < i; j++) {
        if (arr[j] > arr[j +1]) {
          var temp = arr[j]
          arr[j] = arr[j +1]
          arr[j +1] = temp;
          pos = j; // 记录最后一次进行交换的位置
        }
     }
     i = pos; // 下一躺排序只扫面到pos位置即可
   }
   console.log('sort after hot arr:', arr)
}
sort1(arr)


// 二. 选择排序（Selection Sort） 时间复杂度O(n²)
// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，
// 然后放到已排序序列的末尾。以此类推

function selectionSort(arr) {
 for(let i = 0; i< arr.length; i++) {
   let minIndex = i; // 当作是最小值，在剩余数组中找最小值
   for(let j = i+1; j < arr.length; j++) {
     if (arr[j] < arr[minIndex]) {
       minIndex = j;
     }
   }
   let temp = arr[i]
   arr[i] = arr[minIndex];
   arr[minIndex] = temp
 }
 console.log('selection sort after:', arr)
}


// 三. 插入排序（Insertion Sort）时间复杂度： O(n) ～ O(n²)
// V8 Array.prototype.sort 数组length小于10时采用此种排序方式

function InsertionSort(arr) {
 for(let i = 1; i < arr.length; i++) {
    let result = arr[i]
    let j = i -1 // 当i的值跟i左侧的数组比较
    while(j >=0 && arr[j] > result) {
      arr[j+1]=arr[j] // 往后移动
      j--
    }
    arr[j+1] = result
 }
 console.log('insertion sort after:', arr)
}
InsertionSort(arr)

//四. 归并排序 Merge Sort 时间复杂度 O(n) ～ O(nlogn)
// ===*******采用分治法 稳定排序
//1.把长度为n的输入序列分成两个长度为n/2的子序列;
//2.对这两个子序列分别采用归并排序；
//3.将两个排序好的子序列合并成一个最终的排序序列

function mergeSort(arr) {
if (arr.length < 2) return arr;
let middle = Math.floor(arr.length/2);
let left = arr.slice(0, middle)
let right = arr.slice(middle)
return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
let result = []
while(left.length && right.length) {
  if (left[0] < right[0]) {
    result.push(left.shif())
  } else {
    result.push(right.shif())
  }
}
while (left.length)
   result.push(left.shift());

  while (right.length)
    result.push(right.shift());
 return result;
}

//五. 快速排序 Quick Sort 时间复杂度 O(n²) ～ O(nlogn)
// 分治法，v8的Array.prototype.sort 数组长度>10, 用此种方法
// 选择数组中一个元素（中间）为基准，所有元素比基准值大的排在基准后面，递归处理
// Array.prototype.splice 效率不高，每次删除操作都涉及大量元素重新排序，而插入元素，
// 引入一个队列管理；故取基准值时，直接用数组下标

function quickSort (nums) {
  var len = nums.length;
  if(len < 2){
      return nums;
  }
  let curr = nums[0];
  let left = [];
  let right = [];
  for(let i = 1; i < len; i++){
      if(nums[i] < curr){
          left.push(nums[i]);
      }else{
          right.push(nums[i]);
      }
  }
  return quickSort(left).concat(curr).concat(quickSort(right));
}

//六.TODO 堆排序 Head Sort 时间复杂度： O(nlogn)
// 建堆
