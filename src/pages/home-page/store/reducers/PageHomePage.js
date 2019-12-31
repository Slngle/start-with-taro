import {
  UPDATEPAGEHOMEPAGE,
  CLEARPAGEHOMEPAGE,
  UPDATEPAGEHOMEPAGEPAGING
} from '../types/PageHomePage'
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
    [UPDATEPAGEHOMEPAGE](state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    [CLEARPAGEHOMEPAGE](state, action) {
      return {
        ...Schema
      }
    },
    [UPDATEPAGEHOMEPAGEPAGING](state, action) {
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
)
