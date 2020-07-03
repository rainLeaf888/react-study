// 反转单链表
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

function reverseList(head) {
  let cur = head;
  let pre = null;
  while(cur) {
   let temp = cur.next;
   cur.next = pre;
   pre = cur
   cur = temp;
  }
  return pre;
}

// test demo
const node1 = new ListNode(1)
node1.next = new ListNode(2)
node1.next.next = new ListNode(3)
node1.next.next.next = new ListNode(4)

reverseList(node1)

// 链表有序合并
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function mergeTwoLists(l1, l2) {
  // 借助哨兵
  let preHeadNode = new ListNode(-1);
  let node = preHeadNode;
  //
  while(l1 && l2) {
    if (l1.val < l2.val) {
      node.next = l1;
      l1 = l1.next;
    } else {
      node.next = l2;
      l2 = l2.next;
    }
    node = node.next;
  }
  // 剩余节点
  if (l1) {
    node.next = l1;
  } else {
    node.next = l2;
  }
  return preHeadNode.next;
}

// test
const node = new ListNode(1)
node.next = new ListNode(2);
node.next.next = new ListNode(4);

const node4 = new ListNode(1)
node4.next = new ListNode(3);
node4.next.next =  new ListNode(4)
mergeTwoLists(node, node4);

// 判断环形链表
// 第一种使用对象或者set 判断是否已经有重发节点
// 第二种使用跑圈的方式，slow 跑一步，fast跑两步，如果slow == fast（fast追上slow）即有环
function cricle(head) {
  let slow = head;
  let fast = head;
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// 求x 的平方根  8平方根：4
// 存在整数 a 满足 a^2 < x < (a + 1)^2，称 a 为 xx 的 整数平方根
// 计算并返回 x 的平方根，其中 x 是非负整数。
// 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
// 重要当 x≥2 时，它的整数平方根一定小于 x / 2  且大于 0，即 0 < a < x / 2
// 由于 a 一定是整数，此问题可以转换成在有序整数集中寻找一个特定值，因此可以使用二分查找。
function sqx (x) {
  if (x < 2) return x;
  let left = 2;
  let right = Math.floor(x / 2);
  while(left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    let povit = mid * mid;
    if (x === povit) return mid;
    else if (x > povit) left = mid +1;
    else right = mid -1;
  }
  return right;
}


// 数组元素连续合并
// input: [1, 2, 3, 6, 8, 9,12]
// output: [“1-3", 6, “8-9",12]

function mergeArr(arr = []) {
  let result = [];
  let temp = arr[0];
  arr.forEach((value, i) => {
    if (value + 1 !== arr[i+1]) {
      if (temp !== value) {
        result.push(`${temp}-${value}`)
      } else {
        result.push(temp);
      }
      temp = arr[i+1];
    }
  })
  return result;
}
mergeArr([1, 2, 3, 6, 8, 9,12])

// 区间合并
// 给出一个区间的集合，请合并所有重叠的区间。
// 示例1:
// 输入: [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例2:
// 输入: [[1,4],[4,5]]
// 输出: [[1,5]]
// 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
var mergeRange = (intervals) => {
  if (intervals.length < 2) return intervals;
  const list = intervals.sort((a, b) => a[0] - b[0]); // 数组元素按第一个元素从大到小排序

  return unite(list, 0);

  function unite(arr, i) {
    if (arr.length -1 === i) {
      return arr;
    }
    // 下个区间的开始值在本区间范围内，则合并一次
    if (arr[i][0] <= arr[i+1][0] && arr[i+1][0] <= arr[i][1]) {
      arr[i] = [
        Math.min(arr[i][0], arr[i+1][0]),
        Math.max(arr[i][1], arr[i+1][1])
      ]
      arr.splice(i + 1, 1);
    } else {
      i ++;
    }
    return unite(arr, i);
  }
}

mergeRange([[1,3],[2,6],[8,10],[15,18]])



// 二叉树所有路径 或求和 两者类似
//   1
//  /   \
//  2     3
//  \
//   5
// 输出['1-2-5', '1-3']

function binaryTreePaths(root, arr = []) {
  if (root) {
    binaryTree(root, root.val, arr)
  }
  return arr;
}

function binaryTree(node, str,list) {
  // 节点无左右节点之后，标示一条路径结束
  if (!node.left && !node.right) list.push(str);
  // 遍历所有子节点
  if (node.left) {
    binaryTree(node.left, `${str}-${node.left.val}`, list);
  }
  // 遍历对应右节点
  if (node.right) {
    binaryTree(node.right, `${str}-${node.right.val}`, list)
  }
}

// test
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
const rootNode = new TreeNode(1);
rootNode.left = new TreeNode(2)
rootNode.right = new TreeNode(3)
rootNode.left.right = new TreeNode(3)

binaryTreePaths(rootNode);

// 判断是否为对称二叉树 （左子数反转之后跟右子数一直）
//     1
//   2    2
//  3 4  4 3
function isSymmetric(root) {
  return nodeSymmetric(root, root)
}

function nodeSymmetric(node1, node2) {
  if (!node1 && !node2) return true;
  if (!node1 || !node2) return false;
  if (node1.val !== node2.val) return false;
  return nodeSymmetric(node1.left, node2.right) && nodeSymmetric(node1.right, node2.left);
}

// 判断两颗数是否相同
function isSameTree(node1, node2) {
  if (!node1 && !node2) return true;
  if (!node1 || !node2) return false;
  if (node1.val !== node2.val) return false;
  return isSameTree(node1.left, node2.left) && isSameTree(node1.right, node2.right);
}


// 重复的子字符串
// 例如:abcabc
// 转变:cabcab
// 改变两次:bcabca
// 改变三次:abcabc
// str = s + s
// str 去掉首尾之后，还包含s 即是有重复的子字符串





// 算法： 花花酱 leetcode 刷题系列
// 背包问题 （https://www.bilibili.com/video/av35745001?from=search&seid=17659176198313461764）
// DP1  https://www.bilibili.com/video/av34781776
// DP2  https://www.bilibili.com/video/av35114898

// 时间复杂度：
// 加法规则 : O(n) + O(3n)   时间复杂度 O(3n)
//  如果n 是 ∞ 时，n 和3n是一样的，故时间复杂度是 O(n)
// 乘法规则：O(n^2) + O(3n^2)
// 如果n 是 ∞ 时，n 和3n是一样的，故时间复杂度是 O(n^2)


// 动态规划： x = BDCABA
// y= ABCBDAB
// 1.最长公共子串（连续出现）
// 2.最长公共子序列 （不需要是连续的，只需保持相对顺序一致） 状态转移方程：如下 C[i, j]  如果 x[i] = y[j],  C[ i-1, j-1]+1
//     如果x[i] != y[j], max { C[i, j-1] , C[i-1, j]}
// 3.0001001 最少经过多次反转变成0000011？
// TODO



// 贪心算法：每次寻找最优算法
// 动态规划：子结果的最优解   (重要概念：最优子结构， 边界，状态转移方程)   解题思路：
// 1.先用递归思考，如果有重叠子问题，即用动态规划
// 动态规划解题：
// 1.先列出 状态转移方程   (利用状态转移方程式自底向上求解问题)
// 2.画出矩阵图，计算每一步结果
// 3.然后看矩阵是否可压缩 （变成一位数组方式处理）