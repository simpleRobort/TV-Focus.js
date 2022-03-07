function FOCUS(model) {
    window.my = this
    my.domIdName = !model.domIdName ? "item" : model.domIdName
    my.focusId = !model.focusId ? "0" : model.focusId.replace(my.domIdName,"")
    my.focusClass = !model.focusClass ? "focus" : model.focusClass
    my.darkClass = !model.darkClass ? "active" : model.darkClass
    my.darkFocus = !model.darkFocus ? [] : model.darkFocus
    this.initDarkFocusArray(my.darkFocus)
    this.initDarkGroup(model)
    this.initModelDoms(model)
}

FOCUS.prototype = {
    initModelDoms: function (model) {
        var i = 0
        if (!model.forceMove) model.forceMove = {}
        if (!model.pageState) model.pageState = {}

        while (my.getDom(i) != null) {
            my.Mpush(my.getDom(i), i, model.forceMove, model.pageState,my.darkFocus)
            i++
        }
        my.initFocusDom(model)
        my.initDarkDom(model)
        if (model.methods) {
            for (var i in model.methods) {
                this[i] = model.methods[i]
            }
        }
    },
    initDarkGroup: function (model) {
        var darkGroup = !model.darkGroup ? [] : model.darkGroup
        if (darkGroup.length == 0) {
            for (var i = 0; i < my.darkFocus.length; i++) {
                darkGroup.push(false)
            }
        }
        my.darkGroup = darkGroup
    },
    initFocusDom: function (model) {
        // 初始化事件
        my.initEvent(model)
        // 初始化焦点
        var fDom = document.getElementById(my.domIdName + my.focusId)
        fDom.classList.add(my.focusClass)
        my.focusEvent(my.focusId)
    },
    initDarkDom: function (model) {
        for (var i = 0; i < this.D.length; i++) {
            var fDom = document.getElementById(my.domIdName + my.D[i])
            fDom.classList.add(my.darkClass)
            if (i != my.focusId) my.darkFocusEvent(my.D[i])
        }
    },
    initEvent: function (model) {
        if (!model.event) model.event = {}
        my.keyNumberEvent = !model.event.keyNumberEvent ? function () {}: model.event.keyNumberEvent
        my.keyPortalEvent = !model.event.keyPortalEvent ? function () {}: model.event.keyPortalEvent
        my.keyMenuEvent = !model.event.keyMenuEvent ? function () {}: model.event.keyMenuEvent
        my.keyPageUpEvent = !model.event.keyPageUpEvent ? function () {}: model.event.keyPageUpEvent
        my.keyPageDownEvent = !model.event.keyPageDownEvent ? function () {}: model.event.keyPageDownEvent
        my.keyDelEvent = !model.event.keyDelEvent ? function () {}: model.event.keyDelEvent
        my.keyVolUpEvent = !model.event.keyVolUpEvent ? function () {}: model.event.keyVolUpEvent
        my.keyVolDownEvent = !model.event.keyVolDownEvent ? function () {}: model.event.keyVolDownEvent
        my.keyMuteEvent = !model.event.keyMuteEvent ? function () {}: model.event.keyMuteEvent
        my.keyPausePlayEvent = !model.event.keyPausePlayEvent ? function () {}: model.event.keyPausePlayEvent
        my.keyMediaErrorEvent = !model.event.keyMediaErrorEvent ? function () {}: model.event.keyMediaErrorEvent
        my.keyMediaEndEvent = !model.event.keyMediaEndEvent ? function () {}: model.event.keyMediaEndEvent
        my.keyPlayModeChange = !model.event.keyPlayModeChange ? function () {}: model.event.keyPlayModeChange
        my.keyMediaBeginEvent = !model.event.keyMediaBeginEvent ? function () {}: model.event.keyMediaBeginEvent
        my.keyDefaultEvent = !model.event.keyDefaultEvent ? function () {}: model.event.keyDefaultEvent
        my.keyBackEvent = !model.event.keyBackEvent ? function () {}: model.event.keyBackEvent
        my.keyOkEvent = !model.event.keyOkEvent ? function () {}: model.event.keyOkEvent
        my.focusEvent = !model.event.focusEvent ? function () {}: model.event.focusEvent
        my.unfocusEvent = !model.event.unfocusEvent ? function () {}: model.event.unfocusEvent
        my.darkFocusEvent = !model.event.darkFocusEvent ? function () {}: model.event.darkFocusEvent
        my.undarkFocusEvent = !model.event.undarkFocusEvent ? function () {}: model.event.undarkFocusEvent
        my.initMoveEvent(model)
    },
    initMoveEvent: function (model) {
        function dirEvent(dir) {
            return function () {
                var next = my.findNextDom(dir)
                if (next == -1) return
                if (my.M[next].darkState != -1 && my.M[next].darkState != my.M[my.focusId].darkState) {
                    if (my.darkGroup[my.M[next].darkState]) {
                        next = my.D[my.M[next].darkState]
                    }
                }

                my.requireFocus(next)
            }
        }
        my.keyUpEvent = dirEvent(0)
        my.keyDownEvent = dirEvent(2)
        my.keyLeftEvent = dirEvent(1)
        my.keyRightEvent = dirEvent(3)
        my.initKeyEvent()
    },
    findNextDom: function (dir) {
        var next = -1
        var sheep = {
            leftSize: 1920,
            height: my.M[my.focusId].height,
            topSize: 1080,
            width: my.M[my.focusId].width
        }
        if (my.M[my.focusId].forceMove[dir] == -2) return next
        if (my.M[my.focusId].forceMove[dir] == -1) {
            switch (dir) {
                case 0:
                    for (var i = 0 ; i < my.M.length; i++) {
                        if (i != my.focusId && my.M[my.focusId].pageState == my.M[i].pageState) {
                            var focusRight = my.M[my.focusId].left + my.M[my.focusId].width
                            var focusLeft = my.M[my.focusId].left
                            var focusTop = my.M[my.focusId].top + my.M[my.focusId].height * 0.5
                            var nextRight = my.M[i].left + my.M[i].width
                            var nextBottomTop = my.M[i].top + my.M[i].height
                            if (my.M[i].left  < focusRight && nextRight > focusLeft && nextBottomTop <= focusTop) {
                                // 循环的left小于焦点右侧left并且循环的右侧left大于焦点的left并且循环底部top小于焦点的top
                                if ((my.M[my.focusId].top - nextBottomTop) < sheep.topSize) {
                                    // 距离焦点的top比上一个还小时，就代表这次循环是目前最适合的焦点
                                    sheep.topSize = my.M[my.focusId].top - nextBottomTop
                                    next = i
                                }
                            }
                        }
                    }
                    break
                case 1:
                    for (var i = 0 ; i < my.M.length; i++) {
                        if (i != my.focusId && my.M[my.focusId].pageState == my.M[i].pageState) {
                            var nextRight = my.M[i].left + my.M[i].width
                            var nextBottom = my.M[i].top + my.M[i].height
                            var focusBottomTop = my.M[my.focusId].top + my.M[my.focusId].height
                            var focusLeft = my.M[my.focusId].left + my.M[my.focusId].width * 0.5
                            if (nextBottom  > my.M[my.focusId].top && my.M[i].top < focusBottomTop && nextRight <= focusLeft) {
                                // 循环的顶部小于焦点底部的top并且循环的底部大于焦点的top并且循环右侧left小于焦点的left
                                if ((my.M[my.focusId].left - nextRight) < sheep.leftSize) {
                                    // 距离焦点的left比上一下还小时，就代表这次循环是目前最适合的焦点
                                    sheep.leftSize = my.M[my.focusId].left  - nextRight
                                    next = i
                                }
                            }
                        }
                    }
                    break
                case 2:
                    for (var i = 0 ; i < my.M.length; i++) {
                        if (i != my.focusId && my.M[my.focusId].pageState == my.M[i].pageState) {
                            var focusRight = my.M[my.focusId].left + my.M[my.focusId].width
                            var focusLeft = my.M[my.focusId].left
                            var focusTop = my.M[my.focusId].top - my.M[my.focusId].height * 0.5
                            var nextRight = my.M[i].left + my.M[i].width
                            var nextBottomTop = my.M[i].top + my.M[i].height
                            if (my.M[i].left  < focusRight && nextRight > focusLeft && my.M[i].top >= focusTop) {
                                // 循环的left小于焦点右侧left并且循环的右侧left大于焦点的left并且循环top大于焦点底部的top
                                if ((my.M[i].top - focusTop) <= sheep.topSize) {
                                    // 距离焦点的top比上一个还小时，就代表这次循环是目前最适合的焦点
                                    sheep.topSize = my.M[i].top - focusTop
                                    next = i
                                }
                            }
                        }
                    }
                    break
                case 3:
                    for (var i = 0 ; i < my.M.length; i++) {
                        if (i != my.focusId && my.M[my.focusId].pageState == my.M[i].pageState) {
                            var focusRight = my.M[my.focusId].left + my.M[my.focusId].width*0.5
                            var nextBottom= my.M[i].top + my.M[i].height
                            var focusBottomTop = my.M[my.focusId].top + my.M[my.focusId].height
                            if (nextBottom  > my.M[my.focusId].top && my.M[i].top < focusBottomTop && my.M[i].left >= focusRight) {
                                // 循环的顶部小于焦点底部的top并且循环的底部大于焦点的top并且循环left大于焦点的右侧left
                                if ((my.M[i].left - focusRight) < sheep.leftSize) {
                                    // 距离焦点的left比上一下还小时，就代表这次循环是目前最适合的焦点
                                    sheep.leftSize = my.M[i].left - focusRight
                                    next = i
                                }
                            }
                        }
                    }
                    break
            }
            return next
        } else {
            next = my.M[my.focusId].forceMove[dir].replace(my.domIdName,'')
            return next
        }

    },
    initKeyEvent: function () {
        var KEY_BACK = 8,
            KEY_OUT = 27,
            KEY_OK = 13,
            KEY_LEFT = 37,
            KEY_UP = 38,
            KEY_RIGHT = 39,
            KEY_DOWN = 40,
            KEY_PAGEUP = 33,
            KEY_PAGEDOWN = 34,
            KEY_0 = 48,
            KEY_1 = 49,
            KEY_2 = 50,
            KEY_3 = 51,
            KEY_4 = 52,
            KEY_5 = 53,
            KEY_6 = 54,
            KEY_7 = 55,
            KEY_8 = 56,
            KEY_9 = 57,
            KEY_VOLUP = 259,
            KEY_VOLDOWN = 260,
            KEY_MUTE = 261,
            KEY_PAUSE_PLAY = 263,
            /*del海信键值*/
            KEY_DEL = 46,
            /*IPTV虚拟事件*/
            KEY_IPTV_EVENT = 768,
            /*IPTV首页键*/
            KEY_IPTV_PORTAL = 272, //河北电信 华为盒子
            /*IPTV菜单键*/
            KEY_IPTV_MENU = 272 //河北电信 华为盒子
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case KEY_0:
                case KEY_1:
                case KEY_2:
                case KEY_3:
                case KEY_4:
                case KEY_5:
                case KEY_6:
                case KEY_7:
                case KEY_8:
                case KEY_9:
                    my.keyNumberEvent(e.keyCode - 48, my.focusId)
                    break
                case 1: /*ipannel*/
                case KEY_UP:
                    my.keyUpEvent()
                    break
                case 2: /*ipannel*/
                case KEY_DOWN:
                    my.keyDownEvent()
                    break
                case 3: /*ipannel*/
                case KEY_LEFT:
                    my.keyLeftEvent()
                    break
                case 4: /*ipannel*/
                case KEY_RIGHT:
                    my.keyRightEvent()
                    break
                case KEY_OK:
                    my.keyOkEvent(my.focusId)
                    break
                case 32: /*空格键*/
                case 640: //四川有线 同洲
                case KEY_OUT:
                case KEY_BACK:
                    my.keyBackEvent(my.focusId)
                    break
                case KEY_IPTV_PORTAL:
                    my.keyPortalEvent()
                    break
                case KEY_IPTV_MENU:
                    my.keyMenuEvent()
                    break
                case KEY_PAGEUP:
                    my.keyPageUpEvent()
                    break
                case KEY_PAGEDOWN:
                    my.keyPageDownEvent()
                    break
                case KEY_DEL:
                    my.keyDelEvent()
                    break
                case 61:
                case KEY_VOLUP:
                    my.keyVolUpEvent()
                    break
                case 45:
                case KEY_VOLDOWN:
                    my.keyVolDownEvent()
                    break
                case 67:
                case KEY_MUTE:
                    my.keyMuteEvent()
                    break
                case KEY_PAUSE_PLAY:
                    my.keyPausePlayEvent()
                    break
                case KEY_IPTV_EVENT:
                    eval('eventJson=' + Utility.getEvent())
                    var typeStr = eventJson.type
                    switch (typeStr) {
                        case 'EVENT_TVMS':
                        case 'EVENT_TVMS_ERROR':
                            return
                        case 'EVENT_MEDIA_ERROR':
                            my.keyMediaErrorEvent()
                            return
                        case 'EVENT_MEDIA_END':
                            my.keyMediaEndEvent()
                            return
                        case 'EVENT_PLTVMODE_CHANGE':
                            return
                        case 'EVENT_PLAYMODE_CHANGE':
                            my.keyPlayModeChange(eventJson)
                            return
                        case 'EVENT_MEDIA_BEGINING':
                            my.keyMediaBeginEvent()
                            return
                        case 'EVENT_GO_CHANNEL':
                            return
                    }
                    break
                default:
                    my.keyDefaultEvent(e.keyCode)
                    break
            }
        }
    },
    Mpush: function (dom, i, forceMove, pageState, darkFocus) {
        if (!my.M) my.M = []
        var darkState = this.getDarkState(i,darkFocus)
        my.M.push({
            index: i,
            id: my.domIdName + i,
            top: this.getElementTop(dom),
            left: this.getElementLeft(dom),
            width: dom.offsetWidth,
            height: dom.offsetHeight,
            forceMove: !forceMove[my.domIdName + i] ? [-1,-1,-1,-1] : forceMove[my.domIdName + i],
            pageState: !pageState[my.domIdName + i] ? 1 : pageState[my.domIdName + i],
            darkState: darkState
        })
    },
    getDarkState: function (index,darkFocus) {
        for (var i = 0;i < darkFocus.length; i++) {
            for (var y = 0;y < darkFocus[i].length; y++) {
                if (index == darkFocus[i][y]) {
                    return i
                }
            }
        }
        return -1
    },
    getElementTop: function(elem){

        var elemTop=elem.offsetTop;//获得elem元素距相对定位的父元素的top

        elem=elem.offsetParent;//将elem换成起相对定位的父元素

        while(elem!=null){//只要还有相对定位的父元素

            //获得父元素 距他父元素的top值,累加到结果中

            elemTop+=elem.offsetTop;

            //再次将elem换成他相对定位的父元素上;

            elem=elem.offsetParent;

        }

        return elemTop;

    },
    getElementLeft: function(elem){

        var elemLeft=elem.offsetLeft;//获得elem元素距相对定位的父元素的top

        elem=elem.offsetParent;//将elem换成起相对定位的父元素

        while(elem!=null){//只要还有相对定位的父元素

            //获得父元素 距他父元素的top值,累加到结果中

            elemLeft+=elem.offsetLeft;

            //再次将elem换成他相对定位的父元素上;

            elem=elem.offsetParent;

        }

        return elemLeft;

    },
    getDom: function (index) {
        return document.getElementById(my.domIdName + index)
    },
    initDarkFocusArray: function (darkArr) {
        if (!my.D) my.D = []
        for (var i = 0; i < darkArr.length; i++) {
            my.D.push(darkArr[i][0])
        }

    },
    requireFocus: function (i) {
        if (i == -1) return
        var darkFlag = false
        if (my.M[i].darkState != -1 && my.D[my.M[i].darkState] != i) {
            // 移除旧暗焦点
            var dDom = document.getElementById(my.domIdName + my.D[my.M[i].darkState])
            if (dDom != null) {
                dDom.classList.remove(my.darkClass)
                my.undarkFocusEvent(my.D[my.M[i].darkState])
            }
            darkFlag = true
        }
        // 移除旧焦点
        var fDom = document.getElementById(my.domIdName + my.focusId)
        if (fDom != null) {
            fDom.classList.remove(my.focusClass)
            my.unfocusEvent(my.focusId)
        }
        // 获得新焦点
        var NDom = document.getElementById(my.domIdName + i)
        if (NDom != null) {
            my.focusId = i
            NDom.classList.add(my.focusClass)
            if (darkFlag) {
                // 获取新暗焦点
                NDom.classList.add(my.darkClass)
                my.D[my.M[i].darkState] = i
                my.darkFocusEvent(my.focusId)
            }
            my.focusEvent(my.focusId)
        }
    },
    getFocus: function() {
      return this.focusId
    },
    getFocusDom: function() {
        return this.getDom(this.focusId)
    },
    log: function (msg, fontSize, TextColor, bgColor) {
        var my = this;
        if (!my.m) {
            my.m = document.createElement("div");
            my.m.id = "deBug";
            my.page = document.body
            my.page.appendChild(this.m);
        }

        TextColor = TextColor || "#fff"
        bgColor = bgColor || "#000"
        fontSize = fontSize || "16"
        if (parseInt(fontSize) != NaN) {
            fontSize = fontSize + 'px'
        }

        my.m.style.cssText = 'z-index:9999; font-size: ' + fontSize + '; position:absolute; top:10px; left:10px; width:1240px; height:auto; overflow:hidden; padding:10px; ' +
            'background:' + bgColor + '; color:' + TextColor + ';word-break:break-all; display:block; filter:alpha(opacity=0.7);-moz-opacity: 0.7;-khtml-opacity: 0.7;opacity: 0.7;';

        var obj_type = typeof msg;
        switch (obj_type) {
            default:
                break;
            case 'undefined':
                fill("undefined");
                break;
            case 'boolean':
                fill("(boolean):" + msg);
                break;
            case 'number':
                fill("(number):" + msg);
                break;
            case 'string':
                fill("(string):" + msg);
                break;
            case 'object':
                if (msg === null) {
                    fill("(object):null");
                    break;
                }
                var text = [];
                for (var ierror in msg) {
                    if (msg.hasOwnProperty(ierror)) {
                        var value = msg[ierror];
                        text.push(String(ierror + ":" + "(" + (typeof value) + ")" + value));
                    }
                }
                fill("(object)-> {" + text.join(", ") + "}");
                break;
        }

        function fill(content) {
            var target = document.getElementById("deBug");
            var tempContent = target.innerHTML;
            var date = new Date();
            target.innerHTML = "<div id = 'copyright' style = 'font-size: 12px;color:#FFF;'><strong>"
                + "CurrentTime :" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                + "</strong>" + "</div><div id ='debug_box'></div>";
            var targetContent = document.getElementById('debug_box');
            targetContent.innerHTML = content + "<br/>" + tempContent;
        }
    },
    getParam: function (param, defaults, url, isblur) {
        url = url || window.location.href
        defaults = !defaults ? defaults == 0 ? 0: null: defaults
        var params = (url.substr(url.indexOf("?") + 1)).split("&");
        isblur = isblur || false;

        if (params != null) {
            if ( isblur ){
                var param = param.toLowerCase();
                for (var i = 0; i < params.length; i++) {
                    var strs = params[i].split("=");
                    if (strs[0].toLowerCase() == param) {
                        return strs[1];
                    }
                }
            } else {
                for (var i = 0; i < params.length; i++) {
                    var strs = params[i].split("=");
                    if (strs[0] == param) {
                        return strs[1];
                    }
                }
            }

        }
        return defaults;
    },
    gotoPage: function (url) {/*页面跳转*/
        window.location.href = url;
    }
}
