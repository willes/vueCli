/**
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
export function transData (a, idStr, pidStr, chindrenStr) {
  let r = []
  let hash = {}
  let id = idStr
  let pid = pidStr
  let children = chindrenStr
  let i = 0
  let j = 0
  let len = a.length
  for (; i < len; i++) {
    hash[a[i][id]] = a[i]
  }
  for (; j < len; j++) {
    let aVal = a[j]
    let hashVP = hash[aVal[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(aVal)
    } else {
      r.push(aVal)
    }
  }
  return r
}
/*
* 检索json对应的位置
* @param   {val}      需要检索的值
 * @param   {target}    对应的字段
 * @param   {attr}    被检索的数组
*/
export function getItemIndex (val, target, attr) {
   var index = -1
   for (var i in attr) {
     if (attr[i][target] === val) {
       index = i
     }
   }
   return index
}
export function arrayCopy (attr) {
   var newAttr = []
  for (var i in attr) {
    newAttr.push(attr[i])
  }
  return newAttr
}
export function arrayCopy2 (attr) {
   var newAttr = []
  for (var i = 0; i < attr.length; i++) {
    newAttr.push(attr[i])
  }
  return newAttr
}
/*
* 深拷贝
* */
export function deepCopy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  var newobj = {}
  for (var attr in obj) {
    newobj[attr] = deepCopy(obj[attr])
  }
  return newobj
}
/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
export function uniqueArray (array, key) {
    var result = [array[0]]
    for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
            if (item[key] === result[j][key]) {
                repeat = true
                break
            }
        }
        if (!repeat) {
            result.push(item)
        }
    }
    return result
}
/**
   * 时间转为秒
   * @param time 时间(00:00:00)
   * @returns {string} 时间戳（单位：秒）
   */
export function timeToSec (time) {
      var s = ''
      var hour = time.split(':')[0]
      var min = time.split(':')[1]
      var sec = time.split(':')[2]
      s = Number(hour * 3600) + Number(min * 60) + Number(sec)
      return s
  }
  /**
     * 时间秒转时分秒
     * @result {string} 时间戳（单位：秒）
     */
export function secondToDate (result) {
      var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
      var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
      var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
      result = h + ':' + m + ':' + s
      return result
  }
  /*
    * 时间秒转时分秒
     * @attr1 {Array}  attr1 长
     * @attr2 {Array}  attr1 短
  */
  export function isInclude (attr1, attr2, key, key1) {
      key1 = key1 || key
      if (attr1.length === 0) {
        return attr2
      }
      var filter = []
      for (var i = 0, len = attr1.length; i < len; i += 1) {
        for (var j = 0, subLen = attr2.length; j < subLen; j += 1) {
          if (attr2[j][key1] === attr1[i][key]) {
            attr2[j].isInclude = true
          }
        }
      }
      for (var k = 0; k < attr2.length; k++) {
        if (!attr2[k].isInclude) {
          filter.push(attr2[k])
        }
      }
      return filter
  }
