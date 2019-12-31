const globalData = {
  inLoginPageNow: false, //当前是否已经进入登录页（防止接口10212时多次重定向到登录页）
  Session_key: 'cookie',
  appKey: 'aMdi6T4a2kA='
}

export const configUi = {
  NAVIGATORTITLE_HEIGHT: 95
}

export function setGlobalData(key, val) {
  globalData[key] = val
}

export function getGlobalData(key) {
  if (key) {
    return globalData[key]
  } else {
    return globalData
  }
}
