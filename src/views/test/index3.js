const obj = {

  "errmsg": "OK",

  "errno": 0,

  "data": {

    "rowData": {

      "rowHeader": [

        {

          "dimName": "product_category",

          "dimValue": "car",

          "subDimValues": [

            {

              "dimName": "region",

              "dimValue": "china",

              "subDimValues": [

                {

                  "dimName": "os",

                  "dimValue": "IOS",

                  "subDimValues": []

                },

                {

                  "dimName": "os",

                  "dimValue": "Android",

                  "subDimValues": []

                },

              ]

            },

            {

              "dimName": "region",

              "dimValue": "us",

              "subDimValues": [

                {

                  "dimName": "os",

                  "dimValue": "IOS",

                  "subDimValues": []

                },

                {

                  "dimName": "os",

                  "dimValue": "Android",

                  "subDimValues": []

                },

              ]

            },

          ]

        },

          {

          "dimName": "product_category",

          "dimValue": "bike",

          "subDimValues": [

            {

              "dimName": "region",

              "dimValue": "uk",

              "subDimValues": [

                {

                  "dimName": "os",

                  "dimValue": "IOS",

                  "subDimValues": []

                },

                {

                  "dimName": "os",

                  "dimValue": "Android",

                  "subDimValues": []

                },

              ]

            },

            {

              "dimName": "region",

              "dimValue": "japan",

              "subDimValues": [

                {

                  "dimName": "os",

                  "dimValue": "IOS",

                  "subDimValues": []

                },

                {

                  "dimName": "os",

                  "dimValue": "Android",

                  "subDimValues": []

                },

              ]

            },

          ]

        },

      ],

    },
  },
}

const { rowHeader = [] } = obj.data.rowData;
let arr = iterArr(rowHeader);
console.log(arr);
// 方法一
function iterArr(arr) {
  let result = [];
  function loop(item, index) {
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(item.dimValue);
    if (item.subDimValues.length) {
      item.subDimValues.forEach(cItem => {
        loop(cItem, index + 1);
      });
    }
  }
  arr.forEach((item) => {
    loop(item, 0)
  });
  return result;
}
// 方法二 暂未实现
let finalArr = [];
iterArr2(rowHeader, finalArr, [], -1);
console.log('方法二：', finalArr);
function iterArr2 (arr, totalArr = [], levelArr = [], index) {
  index ++;
  arr.forEach(({ dimValue, subDimValues: children }) => {
    levelArr.push(dimValue);
    if (children && children.length) {
      iterArr(children, totalArr, totalArr[index], index);
    }
  });
  totalArr.push(levelArr);
}

// const t = [[car, bike], [us, china,uk, japan], [IOS, android,IOS, android,IOS, android,]]


// 斐波拉契数列 1,1,2,3,5,8  // fn(n-1) + fn(n-2)
// 普通递归
// function fn (n) {
//   if (n === 1 || n === 2) return 1;
//   return fn(n-1) + fn(n-2);
// }

// 动态规划
function fn(n) {
  const result = [];
  result[1] = 1;
  result[2] = 1;
  for(let i = 3; i <= n; i ++) {
    result[i] = result[i -1] + result[i -2];
  }
  return result[n]
}


// 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
// 例：“ababac” —— “ababa”
// “aabbcef” —— “aabb”

function str(str) {
  const obj = {}
  for(let i = 0; i < str.length; i++) {
    const val = obj[str[i]];
    if (val) {
      obj[str[i]] = val + 1
    } else {
      obj[str[i]] = 1;
    }
  }
  // 得到最小值
  const min = Math.min(...Object.values(obj));
  Object.keys(obj).forEach(key => {
    if (obj[key] === min) {
      var reg = new RegExp(key, 'g'); // 正则
      const arr =  str.split('');
      str = str.replace(reg, ''); // 替换
    }
  })
}
