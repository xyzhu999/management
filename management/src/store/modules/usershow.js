import { Userlist, userData, userapi, apilist, person_or_server, ViewPerson, View_serverPerson } from '@/api/usershow'
import { stat } from 'fs'

const state = {
  username: [], // 第一个表格的数据列表
  userperson: [], // 身份数据
  apilist: [], // api列表
  Viewlist: [], // 视图权限列表接口
  view_person_list: [], // 用户与权限的关系列表
  loading0: true,
  person_list: []
}
const actions = {
  userlist({ commit }, payload) { // 获取第一个表格的数据
    return new Promise((res, rej) => {
      Userlist().then((result) => {
        if (result) {
          state.username = result.data
          state.loading0 = false
          res()
        } else {
          state.username = []
        }
      })
    })
  },
  userData({ commit }, payload) {
    return new Promise((res, rej) => {
      userData().then((result) => {
        if (result) {
          state.userperson = result.data
        } else {
          state.userperson = []
        }
      })
    })
  },
  userapi() {
    return new Promise((res, rej) => {
      userapi().then((result) => {
        if (result) {
          state.apilist = result.data
        } else {
          state.apilist = []
        }
      })
    })
  },
  personorserver() {
    return new Promise((res, rej) => {
      person_or_server().then((result) => {
        if (result) {
          state.person_list = result.data
        } else {
          state.person_list = []
        }
      })
    })
  },
  ViewPerson() {
    return new Promise((res, rej) => {
      ViewPerson().then((result) => { // 方法
        if (result) {
          state.Viewlist = result.data
        } else {
          state.Viewlist = []
        }
      })
    })
  },
  View_serverPerson() {
    return new Promise((res, rej) => {
      View_serverPerson().then((result) => {
        if (result) {
          state.view_person_list = result.data
        } else {
          state.view_person_list = []
        }
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions
}
