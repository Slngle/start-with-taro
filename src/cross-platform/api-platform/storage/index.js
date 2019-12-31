/**
 * 数据缓存
 * */
import Taro from '@tarojs/taro'

/**
 * @param key
 * @param payload
 * @returns {*|Promise<Taro.General.CallbackResult>}
 * @desc 根据key去Storage拿数据
 */
export const setStorage = (key, payload) => {
  return Taro.setStorage({ key, data: payload })
}

/**
 * @param key
 * @returns {Function}
 * @desc 根据 key 去 Storage 拿数据 没有的话返回空字符串
 */
export const getStorage = key => {
  return async function() {
    Taro.getStorage({ key })
      .then(data => {
        return data
      })
      .catch(() => {
        return ''
      })
  }
}

/**
 * @returns {Function}
 * @desc 当前 storage 中所有的 key
 */
export const getStorageInfo = () => {
  return async function() {
    Taro.getStorageInfo()
      .then(data => {
        return data
      })
      .catch(() => {
        return ''
      })
  }
}

/**
 *
 * @param key
 * @returns {*|Promise<Taro.General.CallbackResult>}
 * @desc 根据key删除Storage里面的key
 */
export const removeStorage = key => {
  return Taro.removeStorage({ key })
}

/**
 *
 * @returns {*|Promise<Taro.General.CallbackResult>}
 * @desc 清除所有key
 */
export const clearStorage = () => {
  return Taro.clearStorage()
}
