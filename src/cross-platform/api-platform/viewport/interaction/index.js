/**
 * 交互
 */
import Taro from '@tarojs/taro'

/**
 *
 * @param icon
 * @param payload
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export function showToast({ icon = 'none', ...payload }) {
  return Taro.showToast({
    icon,
    ...payload
  })
}

/**
 *
 * @param payload
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export function showLoading(payload) {
  return Taro.showLoading(payload)
}

/**
 *
 * @param payload
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export function hideToast(payload) {
  return Taro.hideToast(payload)
}

/**
 *
 * @param payload
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export function hideLoading(payload) {
  return Taro.hideLoading(payload)
}

/**
 *
 * @param payload
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export function showModal(payload) {
  return Taro.showModal(payload)
}

/**
 *
 * @param payload
 * @returns {*|Promise<Taro.General.CallbackResult>}
 */
export function showActionSheet(payload) {
  return Taro.showActionSheet(payload)
}
