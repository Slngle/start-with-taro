/**
 * 网络
 * */

import Taro from '@tarojs/taro'

export const taroRequest = payload => {
  return new Promise(resolve => {
    Taro.request(payload)
      .then(res => {
        resolve(res)
      })
      .catch(ex => {
        resolve({ networkError: true })
      })
  })
}

export const uploadFile = payload => {
  if (process.env.TARO_ENV != 'h5') {
    return Taro.uploadFile(payload)
  } else {
    console.log('另外想办法')
  }
}

export const downloadFile = payload => {
  if (process.env.TARO_ENV != 'h5') {
    return Taro.downloadFile(payload)
  } else {
    console.log('另外想办法')
  }
}
