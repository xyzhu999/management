import { getGrade, getRoom, deleteRoom, getStudent, getSubject, updateGrade, deleteGrade, deleteStudent } from '@/api/classroom'

const state = {
  // 全部班级
  grade: null,
  // 全部教室
  room: null,
  // 教室id
  roomid: null,
  studentlist: null,
  // 全部试卷
  subject: null,
  // 搜索出来的数据
  allsearch: []
}

const mutations = {
  updataState(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
  searchall(state, payload) {
    this.state.allsearch = payload
    console.log('payload...', this.state.allsearch)
  }
}

const actions = {
  // 获取班级信息
  async getgrade({ commit }, payload) {
    // console.log(payload)
    const data = await getGrade(payload, 'get')
    commit('updataState', { grade: data.data })
    // console.log('班级...', data)
  },

  // 获取教室信息
  async getroom({ commit }, payload) {
    const data = await getRoom(payload, 'get')
    commit('updataState', { room: data.data })
    // console.log(data)
  },

  // 添加教室
  async setroom({ commit }, payload) {
    // console.log('666....', payload)
    const data = await getRoom(payload, 'post')
    commit('updataState', { roomid: data.room_id })
  },

  // 删除教室
  async deleteroom({ commit }, payload) {
    await deleteRoom(payload)
  },

  // 获取分班学生信息
  async getstudent({ commit }, payload) {
    const data = await getStudent()
    commit('updataState', { studentlist: data.data })
    // console.log(data)
  },

  // 获取全部的试卷
  async getsubject({ commit }, payload) {
    const data = await getSubject()
    commit('updataState', { subject: data.data })
    // console.log(data.data)
  },

  // 添加班级信息
  async set_grade({ commit }, payload) {
    await getGrade(payload, 'post')
  },

  // 更新班级信息
  async update_grade({ commit }, payload) {
    const data = await updateGrade(payload)
    console.log(data)
  },

  // 删除班级信息
  async delete_grade({ commit }, payload) {
    const data = await deleteGrade(payload)
    console.log(data)
  },

  // 删除学生信息
  async delete_student({ commit }, payload) {
    console.log(payload)
    const data = await deleteStudent(payload)
    console.log(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
