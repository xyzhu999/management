import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}
// 获取用户权限
export function getViewAuthority(params) {
  return request({
    url: '/user/new',
    method: 'get',
    params
  })
}

// 更新用户信息
export function setUser(params) {
  return request({
    url: '/user/user',
    method: 'put',
    data: params
  })
}
