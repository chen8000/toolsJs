//----------------------- rem -------------------------//
// rem
// rem
// 设计稿宽度 : 750  ( 2倍图 )
// 缩放比例 : 100   ( 1rem === 100px )
export const remJs = () => {
  setRootFontSize()
  window.addEventListener('resize', setRootFontSize, !1)
}

function setRootFontSize() {
  let docWidth = document.documentElement.getBoundingClientRect().width
  document.documentElement.style.fontSize = docWidth / 750 * 100 + 'px'
}




//----------------------- 进度条 -------------------------//
// 1-100 进度
// inter(
//   // 第一个数组里是卡住的数字节点
//   // 第二个数组是速度
//   // [[32, 55, 63, 71, 85, 98], [100, 300, 160, 100, 50, 700]],
//   s => {
//     // s 是数字
//     this.loadingNum = s;
//   },
//   () => {
//     // 100 %
//     this.hideShow();
//   }
// );
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





//----------------------- 获取body的宽高 -------------------------//
// 获取body的宽高
export const getBodyWH = () => {
  return {
    width: document.documentElement.clientWidth || document.body.clientWidth || window.clientWidth,
    height: document.documentElement.clientHeight || document.body.clientHeight || window.clientHeight
  }
}



//----------------------- 判断是否横屏 -------------------------//

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




//----------------------- 数组去重 -------------------------//
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



//----------------------- 返回设备类型 -------------------------//

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


//----------------------- 摇一摇事件 -------------------------//
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


//----------------------- 长按事件 -------------------------//
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


//----------------------- 加载外部字体 -------------------------//
// 解决在外部字体没有加载进来页面文字不显示问题
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
    span.innerHTML = "gW@i#Q!T"
    setCss(span) // 设置css样式
    span.style.fontFamily = f // 设置span的字体为外部字体
    document.body.appendChild(span)
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
  function setCss(span) {
    span.style.visibility = "hidden"
    span.style.fontSize = "50px"
    span.style.opacity = 0;
    span.style.position = 'absolute'
    span.style.bottom = 0
    span.style.left = 0
    span.style.zIndex = -1
  }
}