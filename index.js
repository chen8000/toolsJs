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



// 数组去重  [1,2,1,2,1].unique()
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


// 返回设备类型
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