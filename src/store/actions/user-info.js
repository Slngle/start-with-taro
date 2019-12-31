import { UPDATEUSERINFO } from '../types/userinfo'
import { createAction } from 'redux-actions'
import { userTestReq } from '../../service/user'

export const userTest = createAction(UPDATEUSERINFO, params => {
  return async function() {
    const { data, networkError } = await userTestReq()
    if (networkError) {
      return {
        networkError
      }
    } else if (data && data.status) {
      return {
        data: data,
        showEmpty: false
      }
    } else {
      return {
        showEmpty: true
      }
    }
  }
})
