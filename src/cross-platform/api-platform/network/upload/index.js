/**
 * 文件上传下载
 * */

import Taro from '@tarojs/taro'

/**
 *
 * @param params
 * @returns {*|Promise<Taro.chooseImage.Promised>}
 */
export function chooseImage(params) {
  return Taro.chooseImage(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<any>}
 */
export function previewImage(params) {
  return Taro.previewImage(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<any>}
 */
export function getImageInfo(params) {
  return Taro.previewImage(params)
}

/**
 *
 * @param params
 * @returns {*|Promise<Taro.saveImageToPhotosAlbum.Promised>}
 */
export function saveImageToPhotosAlbum(params) {
  return Taro.saveImageToPhotosAlbum(params)
}
