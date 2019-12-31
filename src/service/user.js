import { request } from '../cross-platform/api-platform/network/request'

export const userTestReq = async () => {
  await setTimeout(() => {
    return { data: { entry: 111 } }
  }, 1000)
}
