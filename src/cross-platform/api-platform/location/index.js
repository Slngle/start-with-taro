/**
 * 地标
 * */
import Taro from '@tarojs/taro'

/**
 *
 * @param params
 * @returns {*|Promise<Taro.getLocation.SuccessCallbackResult>}
 */
export function getLocation(params) {
  return Taro.getLocation(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export function openLocation(params) {
  return Taro.openLocation(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<Taro.chooseLocation.SuccessCallbackResult>}
 */
export function chooseLocation(params) {
  return Taro.chooseLocation(params)
}
