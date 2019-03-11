/*
------------------------------------------------------
|
|        rem
|   设计稿宽度 : 750  ( 2倍图 )
|   缩放比例 : 100   ( 1rem === 100px )
|
------------------------------------------------------
*/
export const remJs = () => {
  setRootFontSize()
  window.addEventListener('resize', setRootFontSize, !1)
}

function setRootFontSize() {
  let docWidth = document.documentElement.getBoundingClientRect().width
  document.documentElement.style.fontSize = docWidth / 750 * 100 + 'px'
}




/*
------------------------------------------------------
|
|   1-100 进度
|     inter(
|       // 第一个数组里是卡住的数字节点
|       // 第二个数组是速度
|       // [[32, 55, 63, 71, 85, 98], [100, 300, 160, 100, 50, 700]],
|       s => {
|         // s 是数字
|         this.loadingNum = s;
|       },
|       () => {
|         // 100 %
|         this.hideShow();
|       }
|     );
|
------------------------------------------------------
*/

export const inter = (arr, s, callback) => {
  let t,
    num = 0,
    speedNum = 50;
  let interval = () => {
    num++;
    s(num);
    let index = arr[0].findIndex(value => value === num);
    if (index >= 0) {
      clearInterval(t);
      t = setInterval(interval, arr[1][index]);
    }
    // 停止
    if (num === 100) {
      clearInterval(t);
      callback(); // 回调函数
    }
  };
  t = setInterval(interval, speedNum);
}





/*
------------------------------------------------------
|
|        获取body的宽高
|
------------------------------------------------------
*/
// 获取body的宽高
export const getBodyWH = () => {
  return {
    width: document.documentElement.clientWidth || document.body.clientWidth || window.clientWidth,
    height: document.documentElement.clientHeight || document.body.clientHeight || window.clientHeight
  }
}


/*
------------------------------------------------------
|
|        注册事件
|   obj 事件元素  type 事件类型  fn触发函数
|
------------------------------------------------------
*/

export const addEvent = (obj, type, fn) => {
  if (obj.attachEvent) { //ie
    obj.attachEvent('on' + type, () => {
      fn.call(obj);
    })
  } else {
    obj.addEventListener(type, fn, false);
  }
}

/*
------------------------------------------------------
|
|        删除事件
|   obj 事件元素  type 事件类型  fn触发函数
|
------------------------------------------------------
*/
export const removeEvent = (obj, type, fn) => {
  if (obj.attachEvent) { //ie
    obj.detachEvent('on' + type, () => {
      fn.call(obj);
    })
  } else {
    obj.removeEventListener(type, fn, false);
  }
}


/*
-----------------------------------------------------
|
|       获取滚动条距离浏览器顶部的距离
|   
-----------------------------------------------------
*/
export const getScrollTop = () => {
  let scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset
  } else if (document.compatMode && document.compatMode !== 'BackCompat') {
    scrollPos = document.documentElement.scrollTop
  } else if (document.body) {
    scrollPos = document.body.scrollTop
  }
  return scrollPos
}





/*
------------------------------------------------------
|      
|        判断是否横屏
|
------------------------------------------------------
*/
export const HS = ca => {

  window.onorientationchange = function () {
    if (window.orientation == 90 || window.orientation == -90) {
      ca(true) // 横屏了
    } else {
      ca(false) // 没有横屏
    }
  }
  window.onorientationchange()
}




/*
------------------------------------------------------
|      
|        数组去重
|
------------------------------------------------------
*/
// [1,2,1,2,1].unique()
Array.prototype.unique = function () {
  let l = this.length,
    r = [],
    O = {};
  for (let i = 0; i < l; i++) {
    if (!O[this[i]]) {
      O[this[i]] = 'abc';
      r.push(this[i])
    }
  }
  O = null
  return r
}



/*
------------------------------------------------------
|      
|        返回设备类型
|
------------------------------------------------------
*/
export const device = () => {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];

  for (let i = 0; i < Agents.length; i++) {
    if (userAgentInfo.indexOf(Agents[i]) > 0) {
      return Agents[i];
    }
  }
  return 'Pc'
};


/*
-----------------------------------------------------
|
|       获取元素距离浏览器顶部的距离
| 
-----------------------------------------------------
*/
export const getElemTop = elem => {

  let elemTop = elem.offsetTop //获得elem元素距相对定位的父元素的top
  elem = elem.offsetParent //将elem换成起相对定位的父元素


  while (elem != null) { //只要还有相对定位的父元素 
    /*获得父元素 距他父元素的top值,累加到结果中 */
    elemTop += elem.offsetTop
    //再次将elem换成他相对定位的父元素上;
    elem = elem.offsetParent
  }
  return elemTop
}



/*
-----------------------------------------------------
|
|       摇一摇事件
| 
-----------------------------------------------------
*/
// 传入要触发的函数
export const shake = callback => {
  //运动事件监听
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", deviceMotionHandler, false);
  }

  //获取加速度信息
  //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
  //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
  var SHAKE_THRESHOLD = 4000;
  var last_update = 0;
  var x,
    y,
    z,
    last_x = 0,
    last_y = 0,
    last_z = 0;

  function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if (curTime - last_update > 10) {
      var diffTime = curTime - last_update;
      last_update = curTime;
      x = acceleration.x;
      y = acceleration.y;
      z = acceleration.z;
      var speed =
        (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;
      if (speed > SHAKE_THRESHOLD) {
        callback()
      }
      last_x = x;
      last_y = y;
      last_z = z;
    }
  }
}


/*
-----------------------------------------------------
|
|       长按事件
| 
-----------------------------------------------------
*/
// 传入要绑定事件的元素，和要触发的函数
export const press = (ele, callback) => {
  let timeout = 0;
  ele.addEventListener('touchstart', () => {
    timeout = setTimeout(callback, 800); //长按时间超过800ms
  }, false)
  ele.addEventListener('touchend', function () {
    clearTimeout(timeout); //长按时间少于800ms
  }, false);
}

/*
-----------------------------------------------------
|
|       向上向下滑动事件
|       touchEvent(ele, ['up', 'down'])
|       事件类型需要是一个数组
| 
-----------------------------------------------------
*/

export const touchEvent = (ele, event) => {
  let startX, startY, moveEndX, moveEndY, X, Y;
  ele.addEventListener("touchstart", function (e) {
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        e.preventDefault();
      }
    }
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  });
  ele.addEventListener("touchend", function (e) {
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        e.preventDefault();
      }
    }
    moveEndX = e.changedTouches[0].pageX;
    moveEndY = e.changedTouches[0].pageY;
    X = moveEndX - startX;
    Y = moveEndY - startY;

    //左滑
    if (X > 0 && event.includes('left')) {
      alert('右滑');
    }
    //右滑
    else if (X < 0 && event.includes('right')) {
      alert('左滑');
    }
    //下滑
    else if (Y > 0 && event.includes('down')) {
      alert('下滑');
    }
    //上滑
    else if (Y < 0 && event.includes('up')) {
      alert('上滑');
    }
  });
}


/*
-----------------------------------------------------
|
|       加载外部字体
|       解决在外部字体没有加载进来页面文字不显示问题
| 
-----------------------------------------------------
*/
export const loadFont = (font, callback) => {

  let num = 0
  let fontL = 0
  if (Object.prototype.toString.call(font) === "[object Array]") {
    fontL = font.length;
    for (let i = 0; i < font.length; i++) {
      createSpan(font[i])
    }
  } else {
    fontL = 1
    createSpan(font)
  }


  function createSpan(f) {
    let span = document.createElement("span") // 创建一个span
    setEle(span, f) // 设置css样式
    let width_now = span.offsetWidth // 获取span的初始宽度
    let interval_check = setInterval(function () {
      if (span.offsetWidth != width_now) { // 当宽度改变后说明字体加载完成了
        clearInterval(interval_check)
        num++
        document.body.removeChild(span)
        span = null
        num === fontL && callback()
      }
    }, 30)
  }

  // 设置css样式
  function setEle(span, f) {
    span.innerHTML = "gW@i#Q!T"
    span.style.visibility = "hidden"
    span.style.fontSize = "50px"
    span.style.opacity = 0;
    span.style.position = 'absolute'
    span.style.bottom = 0
    span.style.left = 0
    span.style.zIndex = -1
    span.style.fontFamily = "Microsoft YaHei"
    document.body.appendChild(span)
    setTimeout(() => {
      span.style.fontFamily = f
    }, 1000)
  }
}



/*
-----------------------------------------------------
|
|       判断是否是微信浏览器
| 
-----------------------------------------------------
*/
export const isWeiXin = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true; // 是微信浏览器
  } else {
    return false; // 不是微信浏览器
  }
}