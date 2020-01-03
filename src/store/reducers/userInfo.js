import { UPDATEUSERINFO, RESETUSERINFO } from '../types/user-info'
import { handleActions } from 'redux-actions'
import { setStorageByKey } from '../../configuration/config-localstorage'

const Schema = {}

export default handleActions(
  {
    [UPDATEUSERINFO](state, action) {
      const newState = {
        ...state,
        ...action.payload
      }
      setStorageByKey({ type: 'userInfo', payload: { ...newState } })
      return {
        ...newState
      }
    },
    [RESETUSERINFO]() {
      setStorageByKey({ type: 'userInfo', payload: { ...Schema } })
      return {
        ...Schema
      }
    }
  },
  Schema
)
