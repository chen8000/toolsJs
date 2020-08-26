/*
 * @Date: 2020-07-17 10:08:05
 * @LastEditors: chenzhanghui
 * @LastEditTime: 2020-08-26 16:48:05
 */ 
// 验证手机号
export const isPhone = val => {
  if (/^1[3456789]\d{9}$/.test(trim(val))) {
      return true
  }
  return false
}

// 验证邮箱格式
export const isEmail = val => {
  if (/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(trim(val))) {
    return true
  }
  return false
}

// 验证ip
export const isIp = val => {
   if(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(trim(val)))   
   {   
       if( RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) 
       return true
   }
   return false
}

// 删除左右两侧的空格
export const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}



// 判断一个数字是不是浮点型
export const isFloat = n => {
  return /^-?\d*\.\d+$/.test(n)
}

//匹配手机号 与 固话
export const phoneAndFixedLine = num => {
  return /^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/.test(num)
}

// 去除所有空格
export const removeAllSpace = str => {
  return str.replace(/\s+/g, "")
}

// 去除所有中文
export const removeChinese = str => {
  return str.replace(/[\u4e00-\u9fa5]+/, "")
}


// 去除特殊字符
export const removeSpecialStr = str => {
  let s = str.replace(/\\/g, "/") // 把反斜杠转为正斜杠
  var pattern = new RegExp("[`~@#$%\"\"^&*()={}':;',\\[\\]<>/?~!！@#￥……&*（）——|{}【】《》+=_‘；：”“'。，、？]") 
  var rs = ""
  for (var i = 0; i < s.length; i++) { 
  rs = rs+s.substr(i, 1).replace(pattern, '')
  } 
  return rs
}