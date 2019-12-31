/**
 * 处理不同平台的api之间的差异
 * process.env.TARO_ENV
 * 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn 五个取值
 * */
import Taro from '@tarojs/taro'
import { foundIphoneX } from './replacement/util'
import { configUi } from '../../../../global-data'

const TAB_BAR_HEIGHT = 50 + (foundIphoneX() ? 34 : 0) //+ 34 iphonex要加 34 （底部留白）
/**
 * 返回屏幕可用高度
 * // NOTE 各端返回的 windowHeight 不一定是最终可用高度
 * @param {*} showTabBar 底部是不是有tabbar
 * @param {*} showNavTitle 有自定义的navigation且有navigationtitle
 * @param {*} showNav 是否有自定义头部（是否展示statusBarHeight）
 * @param reduce750 要减去多少高度 （750设计稿下面的高度）
 */
export const getWindowHeight = (
  showTabBar = true,
  showNavTitle = false,
  showNav = true,
  reduce750 = 0
) => {
  const info = getSystemInfoSync()
  const { windowWidth, windowHeight, statusBarHeight, titleBarHeight } = info
  const getReal = windowWidth / 750
  const NAVIGATOR_HEIGHT = configUi.NAVIGATORTITLE_HEIGHT * getReal
  const titleHeight = showNavTitle ? NAVIGATOR_HEIGHT : 0
  const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0
  const statusHeight = showNav ? statusBarHeight : 0
  const reduce750in = reduce750 ? reduce750 * getReal : 0
  if (process.env.TARO_ENV === 'rn') {
    return windowHeight - tabBarHeight - statusHeight - titleHeight - reduce750in
  }
  if (process.env.TARO_ENV === 'h5') {
    return `${windowHeight - tabBarHeight - reduce750in}px`
  }
  if (process.env.TARO_ENV === 'alipay') {
    // NOTE 支付宝比较迷，windowHeight 似乎是去掉了 tabBar 高度，但无 tab 页跟 tab 页返回高度是一样的
    return `${windowHeight -
      statusBarHeight -
      titleBarHeight +
      (showTabBar ? 0 : TAB_BAR_HEIGHT) -
      reduce750in}px`
  }

  return `${windowHeight - statusHeight - titleHeight - reduce750in}px`
}

export const getSystemInfo = payload => {
  return Taro.getSystemInfo(payload)
}

export const getSystemInfoSync = payload => {
  return Taro.getSystemInfoSync(payload)
}

export const canIUse = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.canIUse(payload)
  }
}
