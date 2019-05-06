import { classList, StudentList, StudentDetail, bathchSucceed } from '@/api/batch.js'
// import moment from 'moment'
const state = {
  classLists: [],
  StudentListDatas: [],
  StudentDetails: {},
  bathchSucceedCode: 0
}

const mutations = {
  updataclassList(state, payload) {
    state.classLists = payload.data
  },
  updataStudentListData(state, payload) {
    if (payload) {
      state.StudentListDatas = payload.exam
      // payload.exam.forEach((x, y) => {
      //   state.StudentListDatas.forEach((val, ind) => {
      //     // const start_time = val.start_time.slice('0', '-3')
      //     val.start_time = moment(Number(val.start_time)).format('YYYY-MM-DD HH:mm:s')
      //     console.log('start_time', val.start_time)
      //     // val.end_time = moment(Number(val.end_time)).format('YYYY-MM-DD HH:mm:s')
      //   })
      // })
    } else {
      state.StudentListDatas = []
    }
  },
  updataStudentDetail(state, payload) {
    if (payload) {
      state.StudentDetails = payload.data
    } else {
      state.StudentDetails = []
    }
  },
  updataSucceedyCode(state, payload) {
    state.bathchSucceedCode = payload.code
  }
}

const actions = {
  async getClassList({ commit }, payload) {
    const getClassListy = await classList()
    commit('updataclassList', getClassListy)
  },
  async getStudentListData({ commit }, payload) {
    const getStudentListDatay = await StudentList(payload)
    commit('updataStudentListData', getStudentListDatay)
  },
  async getStudentDetail({ commit }, payload) {
    const getStudentDetaily = await StudentDetail(payload)
    commit('updataStudentDetail', getStudentDetaily)
  },
  async getbathchSucceed({ commit }, payload) {
    const getbathchSucceedy = await bathchSucceed(payload.exam_student_id, payload.score)
    commit('updataSucceedyCode', getbathchSucceedy)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

