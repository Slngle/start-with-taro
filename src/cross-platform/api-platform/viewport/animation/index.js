/**
 * 动画
 */
import Taro from '@tarojs/taro'

/**
 *
 * @param payload
 * @returns {*|Taro.Animation}
 */
export function createAnimation(payload) {
  return Taro.createAnimation(payload)
}
