import request from "@/utils/request"

export function Userlist() {
  return request({
    url: '/user/user',
    method: 'get'
  })
}
export function userData() {
  return request({
    url: '/user/identity',
    method: 'get',
  })
}
export function userapi() {
  return request({
    url: '/user/api_authority',
    method: 'get',
  })
}
export function person_or_server() {
  return request({
    url: '/user/identity_api_authority_relation',
    method: 'get',
  })
}
export function ViewPerson() {
  return request({
    url: '/user/view_authority',
    method: 'get',
  })
}
export function View_serverPerson() {
  return request({
    url: '/user/identity_view_authority_relation',
    method: 'get',
  })
}
