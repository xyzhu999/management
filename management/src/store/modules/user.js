import { login, logout, getInfo, getViewAuthority, setUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  // 设置用户信息请
  SET_USERINFO: (state, paylpoad) => {
    state.userInfo = paylpoad
  },
  // 设置用户权限
  SET_VIEWAUTHORITY: (state, paylpoad) => {
    state.viewAuthority = paylpoad
  }
}

const actions = {
  // user login 登录接口
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login({ user_name: username, user_pwd: password })
    setToken(res.token)
    return res
  },

  // 获取用户信息
  async getInfo({ commit, state }) {
    const data = await getInfo()
    commit('SET_USERINFO', data.data)
    return data.data
  },
  // 获取用户权限
  async getViewAuthority({ commit }, paylpoad) {
    const data = await getViewAuthority({ user_id: paylpoad.user_id })
    if (data.code === 1) {
      commit('SET_VIEWAUTHORITY', data.data)
      return data.data
    }
    return []
  },
  // 更新用户信息
  async set_user({ commit }, payload) {
    await setUser(payload)
    const data = await getInfo()
    commit('SET_USERINFO', data.data)
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_USERINFO', { avatar: '' })
        commit('SET_VIEWAUTHORITY', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
