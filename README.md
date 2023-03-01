TV端焦点处理 focus.js V1.0.7
========================

这个库运用非常的简单，简单使用就3步，适用于用原生写TV端需求的前端，即使从来没开发过TV端的看完基本使用也可以掌握,非常好用！
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
            },
            changeIndexBeforeFind: function (dir,focusId) {
                // 两个传参(dir代表方向：上左下右依次为0123,当前焦点id)
                // Focus会在自动寻找下一个焦点前触发这个事件，如果这个函数返回了一个指定索引
                // 那么框架就不会浪费时间去寻找下一个焦点，直接使用你返回的索引
                // 例：
                if (dir == 3 && focusId == 0) {
                    return 2
                } 
                // 当在焦点索引为0的dom按下 右方向键，返回一个索引2，框架会放弃计算
                // 直接让索引为2的获取焦点
            },
            changeIndexAfterFind: function (dir,focusId,nextId) {
                 // 三个传参(前两个同上，nextId为计算完成的焦点，如果没有合适的焦点就会返回-1)
                 // Focus会在寻找完焦点后触发这个事件，如果这个函数返回了一个指定索引
                 // 那么框架就抛弃本来应该成为焦点的nextId，直接使用你返回的索引
           
             },
            
        }
    })
```
|   事件名称(都是函数,如上)   | 描述 |
|:----:|:----:|
|keyNumberEvent| 遥控器数字点击，有两个传参:(对应的数字，当前获取焦点的索引) |
|keyOkEvent| 遥控器确认键，有一个传参(当前获取焦点的索引)  |
|keyBackEvent| 遥控器返回键，有一个传参(当前获取焦点的索引)  |
|focusEvent| 获取焦点后事件，有一个传参(当前获取焦点的索引)  |
|unfocusEvent| 失去焦点后事件，有一个传参(失去焦点的索引)  |
|darkFocusEvent| 获取暗焦点后事件，有一个传参(失去焦点的索引)  |
|undarkFocusEvent| 失去暗焦点后事件，有一个传参(失去焦点的索引)  |
|changeIndexBeforeFind| 按任意方向键后触发，详情见上图  |
|changeIndexAfterFind| 按任意方向键后触发，详情见上图  |

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

设置完以后，item4只能与item5互相移动，因为默认所有的焦点pagestate都是1，pagestate不同不会通过方向键选中，只能通过requireFocus切换焦点
#### 5.方法 (methods)
为了尽量使页面的核心代码保存在FOCUS传参内，添加了类似vue的methods来方便代码管理

使用方法：
```javascript
 var vm = new FOCUS({
        methods: {
                    handleTest: function () {
                        console.log("你点击了methods")
                    }
                },
         event: {
                  keyOkEvent: function (focusId) {
                      this.handleTest()
                  }
              }
    })
```

传参时传入一个methods对象，用来保存方法，this指向Focus，也通过this.方法名来调用methods内部方法

##### [methods示例地址](https://simplerobort.github.io/TV-Focus.js/demo/demo5.html)

#### 5.暗焦点 (darkFocus)
tv端经常会有一个需求，页面上会有多个焦点，比如说一个节目，你可能会需要其他的焦点来表示当前所属于的分类，我们称之为暗焦点

```javascript
 var vm = new FOCUS({
        darkFocus:[[1,0,2,3,4],[5,6,7,8]], //暗焦点列表一个数组包含多个数组，参数为id后的索引，代表这几个dom为一块暗焦点，并且数组第一个索引为默认选中的暗焦点
        darkGroup:[true,true], // 长度与darkFocus对应，代表每次进入暗焦点列表时，是否始终让这个列表的暗焦点被选中
        darkClass: "active", // 暗焦点被添加的class ,默认就是 active
        event: {
            darkFocusEvent: function (id) {
                // 你有可能会需要在焦点切换时根据当前的分类渲染新数据，
                // 我们希望你使用的是这个事件而不是focusEvent
                // 这是为了防抖,在暗焦点没改变时重复获焦不会重复触发这个事件
                console.log("获取暗焦点",id) 
            },
            undarkFocusEvent: function (id) {
                console.log("丢失暗焦点",id)
            },
            focusEvent: function (id) {
                console.log("获取焦点",id)
            },
            unfocusEvent: function (id) {
                console.log("丢失焦点",id)
            },
        }
    })
```

#### 6.运用各api完成一个tv端常见demo (demo)
tv最多的就是多级栏目的需求，在焦点切换时，对应的子列表，子节目都要发生变化，本文章主要介绍框架的使用，
故具体内容可下载源码与focus文件了解

![示例图片](https://simplerobort.github.io/TV-Focus.js/image/example/example02.png) 

##### [demo地址](https://simplerobort.github.io/TV-Focus.js/demo/demo7.html)

#### 7.生命周期 (生命周期)
按目前的需求引入了一个初始创建时的生命周期created

使用方式:

```javascript
 var vm = new FOCUS({
         created: function (next) {
             this.addDiv()
             next() //必须调用， 不调用无法库就不执行初始化
         },
         methods: {
             addDiv: function () {
                 var div = document.createElement("div")
                 div.classList = "dom"
                 div.id = "item6"
                 var newContent = document.createTextNode("生命周期添加的dom");
 
                 div.appendChild(newContent);
 
                 document.body.appendChild(div);
             }
         }
     })
```
##### [demo地址](https://simplerobort.github.io/TV-Focus.js/demo/demo8.html)

|   周期名称  | 传参 | 描述 |
|:----:|:----:|:----:|
|created| next |提供一个next方法，在调用后库才会继续抓取页面的焦点并且初始化,此时能访问methods里的方法 |



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
|methods| object|方法保存，类似vue的methods,详情参考II.5  |
|darkFocus| array|暗焦点，在焦点在别处时依旧显示特殊样式,每个数组第一个索引为默认选中的暗焦点,详情参考II.6  |
|darkClass| string|暗焦点被添加的class ,默认就是 active,详情参考II.6  |
|darkGroup| array|长度与darkFocus对应，代表每次进入暗焦点列表时，是否始终让这个列表的暗焦点被选中,详情参考II.6  |
|unFocusArr| array| 数组，数组可以有多个id索引，代表初始不允许被选中的焦点，之后可用下面介绍的 openFocus 解除禁止被选中 |

## IV  框架的Api 

使用方法：

在实例内部使用: 示例：this.requireFocus(0)

在实例外部使用: 示例：vm.requireFocus(0) (vm为实例对象)
```javascript
        var vm = new FOCUS({
            event: {
                keyOkEvent: function (focusId) {
                    this.requireFocus(6) // 在实例内部使用
                }
            }
        })
        vm.requireFocus(6) // 在实例外部使用
```

|   Api名称  | 传参数量 |传参 | 描述 |
|:----:|:----:|:----:|:----:|
|requireFocus|1| number | 使元素获取焦点，传参为索引值,例(使id为"item2"的元素获取焦点)：this.requireFocus(2)|
|log| 4(后三个参数可不传)|打印内容，字体大小(默认16px), 文字颜色(默认白色)，背景颜色(默认黑色) | tv端无控制台，所以需要此api显示打印信息  |
|getDom| 1|int | 根据传参索引返回元素  |
|getFocus|0| 无 | 返回当前焦点索引  |
|getParam|3| 字段名:字符串 默认值 地址:默认当前地址 | 解析url传参  |
|gotoPage|1| url地址 | 单纯的跳转url，可能会在需要跳转前发送请求而存在  |
|getFocusDom|0| 无 | 返回当前焦点dom元素  |
|stopFocus|1| 数组：内容为一个或多个dom索引 | 使数组内的焦点无法被获取焦点  |
|openFocus|1| 数组：内容为一个或多个dom索引 | 使数组内的焦点从stopFocus内移除，能够获取焦点  |
|refresh|0| 无 | 调用后库会丢弃原来的焦点集合，重新去抓取页面上的焦点  |
|getDarkIndex|1| darkFocus索引 | 调用后会返回对应darkFocus组中当前的暗焦点索引  |


## V 版本日志

|   版本号  | 更新内容 | 日期|
|:----:|:----:|:----:|
|1.0.7|修复下移时有时会出现的意外焦点bug，md文档添加getDarkIndex|2023-3-1|
|1.0.6|提供一个初始化的生命周期，为了适配页面初始化时要添加dom的需求|2022-5-19|
|1.0.5|添加焦点切换前后事件，动态修改焦点获取与否，增加框架的灵活性|2022-3-8|
|1.0.4|添加暗焦点相关事件，以及暗焦点防抖等处理|2022-3-7|
|1.0.3|添加methods传参，用来优化代码规范，添加getparam方法，获取url参数|2022-3-3|
|1.0.2|添加打印调试api，以及readme.md排版更新，版本日志|2021-12-27|
|1.0.1| 添加二级以上页面，失焦获焦事件|2021-12-21|
|1.0.0| 具备tv端焦点框架基本需求|2021-12-20|

## 其他
如果这个框架能够被很多使用到，我想我会非常的开心，如果你有什么觉得框架需要增加的好的建议，我很荣幸能够知道，这是我的联系方式，请表明来意,希望您能给我一个点赞，这是对我最大的鼓励

vx:DoubleU-_

QQ:1026990903
