import { examType, subject, exam, examlist, renewal, detail, getAll } from '@/api/exams'
var moment = require('moment')
const state = {
  examTypeList: [],
  subjectList: [],
  info: {},
  list: [],
  detail: [],
  allExams: []
}

const mutations = {
  updateState(state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }
  }
}

const actions = {
  async examType({ commit }, payload) {
    const res = await examType()
    commit('updateState', { examTypeList: res.data })
  },
  async subject({ commit }, payload) {
    const res = await subject()
    commit('updateState', { subjectList: res.data })
  },
  async exam({ commit }, payload) {
    const res = await exam(payload)
    return res
  },
  // 查询所有的数据
  async getList({ commit }, payload) {
    const res = await examlist(payload)
    // let list = []
    res.exam.forEach(item => {
      item['start_time'] = moment(item.start_time * 1).format('YYYY-MM-DD h:mm:ss')
      item['end_time'] = moment(item.end_time * 1).format('YYYY-MM-DD h:mm:ss')
    })
    commit('updateState', { list: res.exam })
    return res
  },
  // 跟新数据
  async renewal({ commit }, payload) {
    const res = await renewal(payload.header, payload.data)
    return res
  },
  // 详情列表
  async detail({ commit }, payload) {
    const res = await detail(payload)
    commit('updateState', { detail: res.data })
  },
  async getAll({ commit }, payload) {
    const res = await getAll()
    commit('updateState', { allExams: res.data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
