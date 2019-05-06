import { addUser, userData, userName, updateusername, addUserCard, addApi, addView, addView_person, api_authorityList, personApi, viewaddApi } from "@/api/adduser"
const state = {
  user_Data: '', // 用户身份名称
  code: '', // 接口返回的code码
  username: '', // 用户名称数据用于更新用户
  userCode: '', // 更新用户的code码
  adduserCode: '', // 添加身份的code码
  addapiCode: '', // 添加api接口code码
  viewList: [], // 视图权限列表
  apilist: [], // api接口权限列表
  apiCode: '', // 身份设置api接口权限返回code码
  addViewCode: '', // 添加视图接口权限code码
  perSonCode: '' // 身份设置视图权限code码
}
const actions = {
  userdata(commit) {
    return new Promise((res, rej) => {
      userData().then(result => {
        if (result) {
          state.user_Data = result.data
          res()
        } else {
          state.user_Data = []
          res()
        }
      })
    })
  },
  adduser({ commit }, payload) {
    return new Promise((res, rej) => {
      addUser(payload).then((results) => {
        if (results) {
          state.code = results.code
          res()
        } else {
          state.code = 0
          res()
        }
      })
    })
  },
  username({ commit }, payload) {
    return new Promise((res, rej) => {
      userName(payload).then((results) => {
        if (results) {
          if (results.code == 1) {
            state.username = results.data
            res()
          }
        } else {
          state.username = []
        }
      })
    })
  },
  updateusername({ commit }, payload) {
    return new Promise((res, rej) => {
      updateusername(payload).then((results) => {
        if (results) {
          state.userCode = results.code
          res()
        } else {
          state.userCode = 0
          rej()
        }
      })
    })
  },
  addusercard({ commit }, payload) {
    return new Promise((res, rej) => {
      addUserCard(payload).then((result) => {
        if (result) {
          state.adduserCode = result.code
          res()
        }else{
          state.adduserCode = 0
          res()
        }
      })
    })
  },
  addapi({ commit }, payload) {
    return new Promise((res, rej) => {
      addApi(payload).then((result) => {
        if (result) {
          state.addapiCode = result.code
          res()
        } else {
          state.addapiCode = 0
          res()
        }
      })
    })
  },
  addview({ commit }, payload) {
    return new Promise((res, rej) => {
      addView(payload).then((result) => {
        if (result) {
          state.viewList = result.data
        } else {
          state.viewList = []
        }
      })
    })
  },
  addViewPerson({ commit }, payload) {
    return new Promise((res, rej) => {
      addView_person(payload).then((result) => {
        console.log(result)
        if (result) {
          state.addViewCode = result.code
          res()
        } else {
          state.addViewCode = 0
          res()
        }
      })
    })
  },
  api_authorityList({ commit }, payload) {
    return new Promise((res, rej) => {
      api_authorityList().then((result) => {
        if (result) {
          state.apilist = result.data
          res()
        } else {
          state.apilist = []
        }
      })
    })
  },
  personApi({ commit }, payload) {
    return new Promise((res, rej) => {
      personApi(payload).then((result) => {
        if (result) {
          state.apiCode = result.code
          res()
        } else {
          state.apiCode = 0
          res()
        }
      })
    })
  },
  viewaddApi({ commit }, payload) {
    return new Promise((res, rej) => {
      viewaddApi(payload).then((result) => {
        if (result) {
          state.perSonCode = result.code
          res()
        } else {
          state.perSonCode = 0
          res()
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
