TV端焦点处理框架 focus.js V1.0.0
========================

这个框架运用非常的简单，简单使用就3步，适用于用原生写TV端需求的前端，即使从来没开发过TV端的看完基本使用也可以掌握,非常好用！
## I.基本使用

#### 1.预先写好页面，保证你所有能够获取焦点的dom元素拥有一个统一开头的id 一般为 "item?",其中?为数字，从0开始,上不封顶

```javascript
        <!--     保证元素拥有定位     -->
<div class="dom" id="item0" style="position: absolute;left:200px;top:200px;width:150px;height:150px">这是第个0dom</div>
<div class="dom" id="item1" style="position: absolute;left:400px;top:200px;width:150px;height:150px">这是第个1dom</div>
<div class="dom" id="item2" style="position: absolute;left:600px;top:200px;width:150px;height:150px">这是第个2dom</div>
<div class="dom" id="item3" style="position: absolute;left:200px;top:400px;width:150px;height:150px">这是第个3dom</div>
<div class="dom" id="item4" style="position: absolute;left:400px;top:400px;width:150px;height:150px">这是第个4dom</div>
<div class="dom" id="item5" style="position: absolute;left:600px;top:400px;width:150px;height:150px">这是第个5dom</div>
```
对应css:
```javascript
        .focus {
            border: 2px solid #0f0f0f; /*这里就是获取焦点的实现原理了，Focus.js会给获取焦点的元素添加一个名字叫做 focus 的class类*/
        }
```

#### 2.从源码里下载focus.js([**点击下载**](https://simplerobort.github.io/TV-Focus.js/demo/donload.html))，在你的html页面中引入 

```javascript
<script src="./focus.js"></script>
```

 #### 3.在引入之后创建一个script标签，new一个FOCUS对象并且传入参数
-----------------------------
```javascript
<script>
        var vm = new FOCUS({
            focusId: 'item3', // 页面首先获取焦点的dom元素的Id,不传默认item0
            event: {
                keyOkEvent: function (focusId) {
                    console.log("点击了确认键，当前获得焦点的索引为：" + focusId)
                    switch (focusId) {
                        case 0:
                           
                            break
                    }
                },
                keyBackEvent: function (focusId) {
                    console.log("点击了返回键，当前获得焦点的索引为：" + focusId)
                    switch (focusId) {
                        case 6:
                        case 7:
                            
                            break
                    }
                }
            }
        })

</script>
```
到这里最简单的焦点移动已经被添加好了，你就可以打开页面看效果了
##### [基本使用测试地址](https://simplerobort.github.io/TV-Focus.js/demo/demo1.html)

## II.进阶使用

#### 1.使用后代选择器显示隐藏图片与dom元素
基本使用里我们只是简单的给focus添加了一个边框，非常的简便，但是当我们需要通过焦点与否显示不同的图片的时候，只是简单的给focus添加边框并不够用，这时候就需要css的后代选择器了

css:
```javascript
.dom .select {
  position: absolute; /*需要添加定位，不然会被未选中显示的内容挤下去*/
  display: none; /*未被选中时隐藏选中才显示的内容*/
}

.dom .unselect {
  display: block; /*未获取焦点时显示没被选中需要显示的内容*/
}

.focus .select {
  display: block; /*获取焦点时显示被选中的需要显示的内容*/
}

.focus .unselect {
  visibility: hidden; /*获取焦点时隐藏未被选中需要显示的内容*/
}
```
html:
```javascript
<!-- 以下图片为本地数据，如复制使用请修改-->
<div id="bg">
    <div class="dom" id="item0" style="position: absolute;left:890px;top:100px;width:150px;height:150px">
        <div class="unselect"><img src="../image/unselect/gengduo.png" alt=""></div>
        <div class="select" style="left:0px;top:0px;"><img src="../image/select/gengduo.png" alt=""></div>
    </div>
    <div class="dom" id="item1" style="position: absolute;left:200px;top:200px;width:150px;height:150px">
        <div class="unselect"><img src="../image/unselect/1.png" alt=""></div>
        <div class="select" style="left:0px;top:0px;"><img src="../image/select/1.png" alt=""></div>
    </div>
    <div class="dom" id="item2" style="position: absolute;left:500px;top:200px;width:150px;height:150px">
        <div class="unselect"><img src="../image/unselect/2.png" alt=""></div>
        <div class="select" style="left:0px;top:0px;"><img src="../image/select/2.png" alt=""></div>
    </div>
    <div class="dom" id="item3" style="position: absolute;left:800px;top:200px;width:150px;height:150px">
        <div class="unselect"><img src="../image/unselect/3.png" alt=""></div>
        <div class="select" style="left:0px;top:0px;"><img src="../image/select/3.png" alt=""></div>
    </div>
    <div class="dom" id="item4" style="position: absolute;left:200px;top:400px;width:150px;height:150px">
        <div class="unselect"><img src="../image/unselect/4.png" alt=""></div>
        <div class="select" style="left:0px;top:0px;"><img src="../image/select/4.png" alt=""></div>
    </div>
    <div class="dom"  id="item5" style="position: absolute;left:500px;top:400px;width:150px;height:150px">
        <div class="unselect"><img src="../image/unselect/5.png" alt=""></div>
        <div class="select" style="left:0px;top:0px;"><img src="../image/select/5.png" alt=""></div>
    </div>
    <div class="dom"  id="item6" style="position: absolute;left:800px;top:400px;width:150px;height:150px">
        <div class="unselect"><img src="../image/unselect/5.png" alt=""></div>
        <div class="select" style="left:0px;top:0px;"><img src="../image/select/5.png" alt=""></div>
    </div>
</div>
```
js:
```javascript
   var vm = new FOCUS({
        focusId: 'item3', // 页面首先获取焦点的dom元素的Id
        event: {
            keyOkEvent: function (focusId) {
                console.log("点击了确认键，当前获得焦点的索引为：" + focusId)
                switch (focusId) {
                    case 0:

                        break
                }
            },
            keyBackEvent: function (focusId) {
                console.log("点击了返回键，当前获得焦点的索引为：" + focusId)
                switch (focusId) {
                    case 6:
                    case 7:

                        break
                }
            }
        }
    })
```
##### [使用后代选择器示例地址](https://simplerobort.github.io/TV-Focus.js/demo/demo2.html)
#### 2.使用强制焦点变换 (forceMove)
适用的场景一般有两个：

1.你需要这个元素按某一个方向键不切换焦点或者切换到自己想要的焦点（哪怕隔了一座山哈哈）

2.你的ui设计稿非常的不规律（焦点默认的逻辑无法满足需求，焦点默认移动的逻辑是以dom的宽高位置发射一道射线，第一个触碰到的dom元素就会成为下一个焦点）

![示例图片](https://simplerobort.github.io/TV-Focus.js/image/example/example01.png) 

显然没有别的元素的话，这个两个元素无法相互跳转，有人问我为什么不把判定范围改大一点，我也试过，自然是解决了，但是有更多的问题出现了，我这就不一一举例了哈哈，
回到正题，使用方法很简单，只需要在new FOCUS传入的对象里新增一个属性focusMove即可

```javascript
var vm = new FOCUS({
            focusId: 'item3',
            forceMove: {
                // 需要被强制的焦点id:[上，左，下，右]
                item0: [-1,-1,"item1",-1],
                item1: ["item0",-1,-1,-1],
            }
        })
```

forceMove也是一个对象，需要传入属性，属性值为一个数组，依次为方向键上左下右，参数有三种取值，如下

|   取值   | 描述 |
|:----:|:----:|
|-1| 不做处理，随框架判断逻辑自动切换焦点 |
|-2| 禁止移动，即使对应的方向有焦点  |
|   其他dom的id   | 强制移动到对应的dom  |

#### 3.事件处理 (event)
tv端除了上下左右方向键与数字键，还有其他的事件，这里也提供了api

```javascript
 var vm = new FOCUS({
        focusId: 'item3',
        event: {
            keyOkEvent: function (focusId) {
                console.log("点击了确认键，当前获得焦点的索引为：" + focusId)
                switch (focusId) {
                    case 0:

                        break
                }
            }
        }
    })
```
|   事件名称(都是函数,如上)   | 描述 |
|:----:|:----:|
|keyNumberEvent| 遥控器数字点击，有两个传参:(对应的数字，当前获取焦点的索引) |
|keyOkEvent| 遥控器确认键，有一个传参(当前获取焦点的索引)  |
|keyBackEvent| 遥控器返回键，有一个传参(当前获取焦点的索引)  |

#### 4.二级以上页面 (pageState)
当页面有若干个焦点是在触发某一个事件才能够被获取焦点的，在事件未触发时不应该被获取焦点，如果通过上面的强制事件频繁的添加-2，那可太麻烦了，这时候就pageState就出现了

使用方法：
```javascript
 var vm = new FOCUS({
        pageState: {
                // 特殊焦点:页面索引(默认为1)
                item4: 2,
                item5: 2
            },
    })
```

同样也是在传入的对象里添加一个新的属性pageState,属性为一个对象，取值为 id：page，原理很简单，不同级别的焦点不会默认互相选中,只能通过提供的FOCUS下的requireFocus（参考第五条）切换焦点

##### [二级以上页面示例地址](https://simplerobort.github.io/TV-Focus.js/demo/demo4.html)
#### 5.切换焦点 (requireFocus)
这个在事件会被频繁使用,也是非常简单的api
使用方法：
```javascript
        var vm = new FOCUS({
            event: {
                keyOkEvent: function (focusId) {
                    console.log("点击了确认键，当前获得焦点的索引为：" + focusId)
                    switch (focusId) {
                        case 0:
                            // 在更多精彩看这里按钮点击确认会进入二级页面
                            this.requireFocus(6)
                            break
                    }
                },
                keyBackEvent: function (focusId) {
                    console.log("点击了返回键，当前获得焦点的索引为：" + focusId)
                    switch (focusId) {
                        case 6:
                        case 7:
                            // 在二级页面点击返回认会进入回到第0个焦点也就是id为 item0 的元素
                            this.requireFocus(0)
                            break
                    }
                }
            }
        })
```
参数为索引（即id的最后一位数字）
## III new FOCUS传参
```javascript
var vm = new FOCUS({ })
```
传参为一个对象，其中对象内部的属性如下:

|   属性名称  | 类型 | 描述 |
|:----:|:----:|:----:|
|domIdName| string |统一id,默认为"item",如希望统一id为 ("focusDom0"、"focusDom1"...),即该参数值为 "focusDom" |
|focusId| string |需要首先聚焦的id，默认索引为0的元素  |
|focusClass| string |聚焦dom增加的class,默认为"focus"  |
|pageState| int|设置页面等级，详情参考II.4  |
|forceMove|object| 修改dom的方向键逻辑，详情参考II.2  |
|event| object|按键处理事件,详情参考II.3  |

## 其他
我是来自宁波的00后，如果这个框架能够被很多使用到，我想我会非常的开心，如果你有什么觉得框架需要增加的好的建议，我很荣幸能够知道，这是我的联系方式，请表明来意

vx:DoubleU-_

QQ:1026990903
