import request from '@/utils/request'

// 获取班级信息或添加班级信息
export function getGrade(params, methods) {
  return request({
    url: '/manger/grade',
    method: methods,
    data: params
  })
}

// 获取教室信息或添加教室
export function getRoom(params, methods) {
  return request({
    url: '/manger/room',
    method: methods,
    data: params
  })
}

// 删除教室
export function deleteRoom(params) {
  return request({
    url: '/manger/room/delete',
    method: 'delete',
    data: params
  })
}

// 获取分班学生
export function getStudent(params) {
  return request({
    url: '/manger/student',
    method: 'get'
  })
}

// 获取全部的试卷
export function getSubject() {
  return request({
    url: '/exam/subject',
    method: 'get'
  })
}

// 删除班级
export function deleteGrade(params) {
  return request({
    url: '/manger/grade/delete',
    method: 'delete',
    data: params
  })
}

// 更新班级信息
export function updateGrade(params) {
  return request({
    url: '/manger/grade/update',
    method: 'put',
    data: params
  })
}

// 删除学生信息
export function deleteStudent(params) {
  return request({
    url: '/manger/student/' + params,
    method: 'delete'
  })
}
