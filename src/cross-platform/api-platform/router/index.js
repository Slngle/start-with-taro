/**
 * 路由
 * */

import Taro from '@tarojs/taro'

/**
 *
 * @param params
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export const navigateTo = params => {
  return Taro.navigateTo(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export const redirectTo = params => {
  return Taro.redirectTo(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export const switchTab = params => {
  return Taro.switchTab(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export const navigateBack = params => {
  return Taro.navigateBack(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export const reLaunch = params => {
  return Taro.reLaunch(params)
}

/**
 *
 * @param payload
 * @returns {*}
 */
export const navigateToMiniProgram = payload => {
  if (process.env.TARO_ENV !== 'rn' && process.env.TARO_ENV !== 'h5') {
    return Taro.navigateToMiniProgram(payload)
  } else {
    return async function() {
      return true
    }
  }
}

export const getCurrentPageList = () => {
  if (process.env.TARO_ENV !== 'h5' && process.env.TARO_ENV !== 'alipay') {
    return Taro.getCurrentPages()
  } else {
    return async function() {
      return true
    }
  }
}
