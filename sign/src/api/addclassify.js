import request from '@/utils/request'
// 试题分类
export function classify() {
  return request({
    url: '/exam/getQuestionsType',
    method: 'get'
  })
}
//
export function examType() {
  return request({
    url: '/exam/examType',
    method: 'get'
  })
}

export function subject() {
  return request({
    url: '/exam/subject',
    method: 'get'
  })
}

export function getQuestionsType() {
  return request({
    url: '/exam/getQuestionsType',
    method: 'get'
  })
}

export function userIfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}

export const questions = data => {
  return request.post('/exam/questions', data)
}

export const condition = params => {
  return request.get('/exam/questions/condition', { params })
}

export function questionsnew() {
  return request({
    url: '/exam/questions/new',
    method: 'get'
  })
}

export const update = data => {
  return request.put('/exam/questions/update', data)
}

export const insertQuestionsType = params => {
  return request.get('/exam/insertQuestionsType', { params })
}

export const delQuestionsType = data => {
  return request.post('/exam/delQuestionsType', data)
}
