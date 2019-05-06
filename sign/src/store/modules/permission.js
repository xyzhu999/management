import { asyncRoutes, constantRoutes } from '@/router'

// 用来添加路由
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(view_ids, route) {
  if (route.meta && route.meta.view_id) {
    return view_ids.some(item => item === route.meta.view_id)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes // 动态路由
 * @param roles
 */
export function filterAsyncRoutes(routes, view_ids) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(view_ids, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, view_ids)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, viewAuthority) {
    // 根据view_id 来确定是否显示路由
    var view_ids = viewAuthority.map(item => item.view_id)
    // 过滤得到用户可以访问到的路由
    var routesAuthority = filterAsyncRoutes(asyncRoutes, view_ids)
    // 更新路由
    commit('SET_ROUTES', routesAuthority)
    return routesAuthority
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
