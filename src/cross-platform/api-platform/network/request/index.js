import { getGlobalData, setGlobalData } from '../../configuration/globaldata'
import { goLogin } from '../../utils/pagemethods/login'
import { getStorageSync } from '../../crossplatform/apiservice/storage'
import { taroRequest } from '../network'

const globalData = getGlobalData()

const addhost = url => {
  //添加host
  return globalData.API_URL + url
}

const addLoginCookieToHeader = header => {
  //添加cookie
  const { sessionId } = getStorageSync('userinfo') || {}
  if (sessionId) {
    header['Cookie'] = `SESSION=${sessionId}`
  }
  return header
}

const addMicroAppToHeader = header => {
  header['sdg_client'] = 'MicroApp'
  return header
}

const reLogin = () => {
  const inLoginPageNow = getGlobalData('inLoginPageNow')
  if (!inLoginPageNow) {
    setGlobalData('inLoginPageNow', true)
    goLogin({ postion: 'relogin' })
  }
}

const jsonToUrlparams = json => {
  if (!json) {
    return ''
  }
  let result = '?'
  for (let attr in json) {
    result += `${attr}=${
      json[attr] || json[attr] === false || json[attr] === 0 ? encodeURIComponent(json[attr]) : ''
    }&`
  }
  return result.substring(0, result.length - 1)
}

export const wechatrequest = {
  //对taro请求进行一次封装
  get(url, options) {
    if (!options) {
      options = {}
    }
    options.method = 'GET'
    return request(url, options)
  },
  post(url, options) {
    if (!options) {
      options = {}
    }
    if (!options.header) {
      options.header = {}
    }
    options.method = 'POST'
    options.header['content-type'] = 'application/json'
    return request(url, options)
  },
  postparams(url, options) {
    if (!options) {
      options = {}
    }
    if (!options.header) {
      options.header = {}
    }
    options.method = 'POST'
    options.header['content-type'] = 'application/json'
    url += jsonToUrlparams(options.data)
    options.data = {}
    return request(url, options)
  },
  postform(url, options) {
    if (!options) {
      options = {}
    }
    if (!options.header) {
      options.header = {}
    }
    options.method = 'POST'
    options.header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    return request(url, options)
  }
}

export async function request(url, options) {
  const re = /(http|https):\/\//
  const urlformat = re.test(url) ? url : addhost(url)

  if (!options) {
    //默认为{}
    options = {}
  }
  if (!options.header) {
    //默认header
    options.header = {}
  }
  if (!options.method) {
    //默认method
    options.method = 'GET'
  }
  if (!options.header['content-type']) {
    //默认content-type
    options.header['content-type'] = 'application/json'
  }
  if (process.env.TARO_ENV !== 'rn' && process.env.TARO_ENV !== 'h5') {
    // 小程序cookie埋不进去 这里手动埋
    options.header = addLoginCookieToHeader(options.header)
  }
  options.header = addMicroAppToHeader(options.header)
  const res = await taroRequest({
    url: urlformat,
    ...options
  })
  if (res) {
    if (res && res.data && res.data.responseCode === 70) {
      reLogin()
    }
    return res
  } else {
    return { networkError: true }
  }
}
