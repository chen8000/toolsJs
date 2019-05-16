/*
tools 目录
1. remJs  根据设计高宽度设置全局font-size
2. inter  h5进度条函数
3. getBodyWH  获取body的宽高
4. addEvent 添加事件
5. removeEvent 删除事件
6. getScrollTop  获取滚动条距离浏览器顶部的距离
7. HS  判断是否横屏
8. unique  数组去重
9. device  返回设备类型
10. getElemTop  获取元素距离浏览器顶部的距离
11. shake 摇一摇事件
12. press 长按事件
13. touchEvent 上下左右滑动事件
14. loadFont 加载外部字体
15. isWeiXin 判断是否是微信浏览器
16. sliceStr 根据需求截取字符串长度，超出显示...
17. GetRequest 返回url参数
18. preLoad 预加载资源 img, gif, mp3, mp4
*/






/*
1. 
------------------------------------------------------
|
|   remJs(750) 传入设计稿宽度
|   缩放比例 : 100   ( 1rem === 100px )
|
------------------------------------------------------
*/
export const remJs = psd => {
  setRootFontSize(psd)
  window.addEventListener('resize', () => {
    setRootFontSize(psd)
  }, !1)
}

function setRootFontSize(psd) {
  let docWidth = document.documentElement.getBoundingClientRect().width
  document.documentElement.style.fontSize = docWidth / psd * 100 + 'px'
}




/*
2. 
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
3. 
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
4. 
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
5. 
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
6.
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
7.
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
8.
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
9. 
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
10 
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
11.
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
12.
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
13.
-----------------------------------------------------
|
|       上下左右滑动事件
|       touchEvent(ele, ['up', 'down'], type => {console.log(type)})
|       事件类型需要是一个数组, 回调函数接收一个参数，
|       这个参数返回string类型的字符串： left  right  down up 
| 
-----------------------------------------------------
*/

export const touchEvent = (ele, event, ca) => {
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
    if (X < 0 && event.includes('left')) {
      ca('left')
    }
    //右滑
    else if (X > 0 && event.includes('right')) {
      ca('right')
    }
    //下滑
    else if (Y > 0 && event.includes('down')) {
      ca('down')
    }
    //上滑
    else if (Y < 0 && event.includes('up')) {
      ca('up')
    }
  });
}


/*
14. 
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
15. 
-----------------------------------------------------
|
|       判断是否是微信内置浏览器
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



/*
16. 
-----------------------------------------------------
|
|       根据需求截取字符串长度，超出显示...
| 
-----------------------------------------------------
*/

export const sliceStr = (str, len) => {
  var nLen = 0;
  var cutIndex = 0;

  for (var i = 0; i < str.length; i++) {
    if (escape(str[i]).indexOf("%u") < 0) {
      //不是中文
      nLen += 1;
    } else {
      //中文
      nLen += 2;
    }
    if (nLen > len * 2) {
      cutIndex = i;
      break;
    }
  }
  if (nLen <= len * 2) {
    cutIndex = str.length;
  }
  var finalName = str.slice(0, cutIndex);

  if (str.length > finalName.length) {
    return finalName + "...";
  } else {
    return finalName;
  }
}

/*
17. 
-----------------------------------------------------
|
|       返回url参数
| 
-----------------------------------------------------
*/
export const GetRequest = () => {
  let url = location.search;
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


/*
18. 
-----------------------------------------------------
|
|      ⚠️ npm install preloadjs
|
|      preload({
|            datas,
|            num: num => {
|                $('.percent').html(num)
|            },
|            res: res => {
|                let mp4 = res.mp4
|                let img = res.img
|                document.getElementById('video1').appendChild(mp4)
|
|                $('#btn').click(() => {
|                    mp4.play()
|                })
|                $('#imgBtn').click(() => {
|                    document.getElementById('img').appendChild(img)
|                })
|            }
|        })
|        datas :  需要加载的资源队列  ———————————— 必填
|        num   :  一个函数，接收加载进度数字  ————— 选填
|        res   :  一个函数，接收加载完后的队列对象 — 必填
| 
-----------------------------------------------------
*/
export const preLoad = ({datas, num, res}) => { 
  let obj = new createjs.LoadQueue(true);
   //注意加载音频文件需要调用如下代码行
   obj.installPlugin(createjs.SOUND);
   //设置最大并发连接数  最大值为10
   obj.setMaxConnections(10);
   obj.loadManifest(datas);
   //添加进度条事件
   obj.addEventListener("progress", event => {
       num && num(Math.ceil(event.loaded * 100))
   })
   //为objed添加当队列完成全部加载后触发事件
   obj.addEventListener("complete", () => {
       res(obj._loadedResults)
   })         
}