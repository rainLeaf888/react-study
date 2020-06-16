# CSS 问题
## BFC
  1. 哪些情况会出现BFC？

    * float的值不为none。
    * overflow的值不为visible。
    * position的值不为relative和static。
    * display的值为table-cell, table-caption, inline-block中的任何一个
  2. BFC作用？
     * 清除float
     * 防止同一 BFC 容器中的相邻元素间的外边距重叠问题
     * 形成了BFC的区域不会与float box重叠 (可实现左图右文字效果)
     * 计算BFC高度时，浮动元素也参与计算（解决了高度塌陷问题）
    ```
      <div class='parent'>
          <div class='float'>浮动元素</div>
      </div>
      .parent {
          overflow:hidden;
      }
      .float {
          float:left;
      }
    ```
### 浏览器渲染
![avatar](./browser-render.png)

HTML --加载解析---> DOM
CSS ------> CSSOM
==> Render Tree ----根据节点和样式计算确切的在浏览器的大小和位置----- -> Layout Render------- > Panit 

#### [渲染图层](https://juejin.im/post/5da52531518825094e373372)
1. 默认复合图层
* 普通文档流就可以理解为一个复合图层 (默认复合层) 里面不管添加多少元素, 都是在这一个复合图层中
* absolute 和 fixed 布局虽然可以脱离普通文档流, 但仍然属于 默认复合层
2. 新建复合图层
* 可以通过<font color='red'>硬件加速的方式</font>声明一个新的复合图层, 它会单独分配资源 (也会脱离普通文档流)
* 由于GPU是单独绘制各个复合图层的, 这样不管复合图层里怎么变化, 都不会触发默认复合层的重排与重绘

### CSS 硬件加速
1. 硬件加速原理 

   首先transform和绝对定位都会产生新的图层，所以都不存在重排，图层在GPU中transform又不会引起重绘，这就是硬件加速的原理。另外，transform3D和2D的区别在于3D渲染前便会产生新的图层，而2D是在运行时产生图层，运行结束时删除图层。
2. 哪些属性会出发硬件加速？
  * transform: transform的3D属性(<font color='red'>translateZ,rotateZ</font>)强制开启GPU加速
  * opacity < 1
  * filter
  * will-change: 告知浏览器哪一个属性即将发生变化，从而为浏览器对该属性进行优化提供了时间
  * video、iframe、canvas 元素 和 flash 插件

### CSS 解析规则
1. 从右到左 （目的：尽早过滤掉一些无关的样式规则和元素）


## css 实现文本溢出省略效果
  1. 单行
    ```
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    ```
## em, rem vw 和vh
  * em: 参考父元素font-size计算, 具有继承特性
  * rem: 相对于root节点（html）font-size计算；会给根节点设置一个基础font-size 这种比例，如：1rem = 12px，其他根据这个基准计算
  * vw 和vh：视口单位  1vw 等于视口宽度的1%
## 移动端300ms点击延迟

  原因：为了区分是双击缩放，双击滚动，还是打开一个连接

  解决方案:

  1.禁用缩放
  ```
  <meta name="viewport" content="user-scalable=no">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1">
  ```
  2. CSS touch-action
  3. FastClick:
  实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉

### 移动端点击穿透问题
  原理：在这 300ms 以内，因为上层元素隐藏或消失了，由于 click 事件的滞后性，同样位置的 DOM 元素触发了 click 事件（如果是 input 则触发了 focus 事件）
  解决方案：
  1.只使用touch 替换所有click（最简单）
* css 实现 点击穿透，虚化
  pointer-events: none; // 上次是透明图片，下侧button按钮，点击透明图片，能触发button事件

