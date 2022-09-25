import request from '@/utils/request'

/**
 * 获取验证码
 * @param {number} data
 * @returns promise
 */
export function imageCodeAPI(m) {
  return request({
    url: `/user-service/user/imageCode/${m}`
  })
}

/**
 * 提交登录
 * @param {Object} data
 * @returns promise
 */
export function login(data) {
  return request({
    url: 'user-service/user/login',
    method: 'POST',
    data
  })
}
