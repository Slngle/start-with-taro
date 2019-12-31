export const storageKey = {
  shopCart: { key: 'shopCart' },
  userInfo: { key: 'userInfo' },
  landmark: { key: 'landmark' },
  phone_uuid: { key: 'phone_uuid' }
}

import { getStorage, removeStorage, setStorage } from '../../cross-platform/api-platform/storage'

export const setStorageByKey = ({ type, payload }) => {
  let { key } = storageKey[type] || {}
  return setStorage(key, payload)
}

export const getStorageByKey = ({ type }) => {
  let { key } = storageKey[type] || {}
  return getStorage(key)
}

export const removeStorageByKey = ({ type }) => {
  let { key } = storageKey[type] || {}
  return removeStorage(key)
}
