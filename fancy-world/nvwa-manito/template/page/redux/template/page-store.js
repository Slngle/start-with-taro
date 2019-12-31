// mobx的
exports.pageStoreRoot = ({ name }) => {
  return `import ${name} from './${name}'
  
export default {
  ${name}: new ${name}()
}`
}

exports.pageStoreIndex = ({ name }) => {
  return `import { observable, action } from 'mobx'

export default class ${name} {
  @observable loading = false
  @observable dataSource = []

  constructor() {
    // ...
  }

  @action async render(data) {}
}`
}

/**
 * redux的
 */
const updateTypes = name => `UPDATE${name.toUpperCase()}`
const clearTypes = name => `CLEAR${name.toUpperCase()}`
const updateTypesPaging = name => `UPDATE${name.toUpperCase()}PAGING`
// actions
exports.pageStoreActions = ({ name }) => {
  return `import { ${updateTypes(name)}, ${clearTypes(name)}, ${updateTypesPaging(
    name
  )} } from '../types/${name}'
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
export const ${updateTypes(name)}REQ = createAction(
  ${updateTypes(name)},
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
export const ${updateTypesPaging(name)}REQ = createAction(
  ${updateTypesPaging(name)},
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
`
}
// reducers
exports.pageStoreReducers = ({ name }) => {
  return `import {
  ${updateTypes(name)},
  ${clearTypes(name)},
  ${updateTypesPaging(name)}
} from '../types/${name}'
import { handleActions } from 'redux-actions'

const Schema = {
  showEmpty: false,
  requestOverFirst: false,
  networkError: false,
  dataSource: [],
  pageNum: 1,
  pageSize: 20,
  hasNextPage: false
}
export default handleActions(
  {
    [${updateTypes(name)}](state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    [${clearTypes(name)}](state, action) {
      return {
        ...Schema
      }
    },
    [${updateTypesPaging(name)}](state, action) {
      const dataSourceOld = state.dataSource || []
      const dataSourceNew = action.payload.dataSource || []
      const newDataSource = dataSourceOld.concat(dataSourceNew)
      return {
        ...state,
        ...action.payload,
        dataSource: newDataSource
      }
    }
  },
  Schema
)`
}
// types
exports.pageStoreTypes = ({ name }) => {
  return `export const ${updateTypes(name)} = '${updateTypes(name)}'
export const ${clearTypes(name)} = '${clearTypes(name)}'
export const ${updateTypesPaging(name)} = '${updateTypesPaging(name)}'
`
}
