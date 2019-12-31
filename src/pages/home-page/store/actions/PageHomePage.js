import {
  UPDATEPAGEHOMEPAGE,
  CLEARPAGEHOMEPAGE,
  UPDATEPAGEHOMEPAGEPAGING
} from '../types/PageHomePage'
import { createAction } from 'redux-actions'

const formatData = entry => {
  if (!entry) {
    return []
  }
  let returnEntry = []
  entry.forEach(data => {
    returnEntry.push({
      id: data.id
    })
  })
  return returnEntry
}

// 主接口请求
export const UPDATEPAGEHOMEPAGEREQ = createAction(
  UPDATEPAGEHOMEPAGE,
  ({ pageSize = 20, pageNum = 1, ...payload } = {}) => {
    return new Promise(resolve => {
      resolve({
        test: 666,
        pageSize,
        pageNum,
        ...payload
      })
      // exampleReq({ ...payload, pageSize, pageNum }).then(({ data } = {}) => {
      //   const { entry = {} } = data || {}
      //   let dataSource = formatData(entry && entry.list)
      //   resolve({
      //     showEmpty: !(dataSource && dataSource.length),
      //     dataSource,
      //     ...payload,
      //     pageNum,
      //     pageSize,
      //     hasNextPage: entry.hasNextPage
      //   })
      // })
    })
  }
)

// 主接口的分页请求
export const UPDATEPAGEHOMEPAGEPAGINGREQ = createAction(
  UPDATEPAGEHOMEPAGEPAGING,
  ({ pageSize, pageNum, ...payload } = {}) => {
    return new Promise(resolve => {
      resolve({
        test: 666,
        pageSize,
        pageNum,
        ...payload
      })
      // exampleReq({ type, pageSize, pageNum }).then(({ data } = {}) => {
      //   const { entry = {} } = data || {}
      //   resolve({
      //     dataSource: formatData(entry && entry.list),
      //     type,
      //     pageNum,
      //     pageSize,
      //     hasNextPage: entry.hasNextPage
      //   })
      // })
    })
  }
)
