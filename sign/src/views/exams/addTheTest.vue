<template>
  <div class="wrapper">
    <p class="text">添加考试</p>
    <div class="content">
      <el-form ref="info" :model="info" :rules="rules" class="demo-info">
        <el-form-item class="babels" label="试卷名称" prop="title">
          <br>
          <el-input v-model="info.title" class="name" />
        </el-form-item>
        <el-form-item class="babels" label="选择考试类型" prop="exam_id">
          <br>
          <el-select v-model="info.exam_id" class="select" style="width: 150px;">
            <el-option
              v-for="item in examTypeList"
              :key="item.exam_id"
              :label="item.exam_name"
              :value="item.exam_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="babels" label="选择课程" prop="subject_id">
          <br>
          <el-select v-model="info.subject_id" class="select" style="width: 150px;">
            <el-option
              v-for=" item in subjectList"
              :key="item.subject_id"
              :label="item.subject_text"
              :value="item.subject_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="babels" label="设置题量" prop="number">
          <br>
          <el-input-number v-model="info.number" style="width: 90px" controls-position="right" :min="3" :max="10" />
        </el-form-item>
        <el-form-item class="babels" label="考试时间" required>
          <br>
          <el-col :span="14" class="item">
            <el-form-item prop="start_time">
              <el-date-picker v-model="info.start_time" type="datetime" style="width:200px;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="14" class="item">
            <el-form-item prop="end_time">
              <el-date-picker v-model="info.end_time" type="datetime" style="width:200px;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('info')">立即创建</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
const moment = require('moment')
export default {
  name: 'AddTheTest',
  data() {
    return {
      info: {
        number: 4,
        title: '什么报错都有',
        exam_id: '',
        subject_id: '',
        start_time: '',
        end_time: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' },
          { min: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        exam_id: [
          { required: true, message: '请选择考试类型', trigger: 'change' }
        ],
        subject_id: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ],
        number: [
          { required: true, message: '请选择题量', trigger: 'change' }
        ],
        start_time: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        end_time: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      examTypeList: state => state.exams.examTypeList,
      subjectList: state => state.exams.subjectList
    })
  },
  created() {
    this.examType()
    this.subject()
  },
  methods: {
    ...mapMutations({
      updateState: 'exams/updateState'
    }),
    ...mapActions({
      examType: 'exams/examType',
      subject: 'exams/subject',
      exam: 'exams/exam'
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // 转成毫秒
          const start_time = moment(this.info.start_time).valueOf()
          const end_time = moment(this.info.end_time).valueOf()
          const localstorage = window.localStorage
          const info = { ...this.info, end_time, start_time }
          const res = await this.exam(info)
          // 本地存放提交成功的数据
          if (res.code === 1) {
            window.localStorage.setItem('exam', JSON.stringify(res.data))
            this.$router.push({ path: 'createExam' })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  p {
    line-height: 0
  }

  .wrapper {
    position: relative;
    width: 100%;
    background: #f0f2f5;
    padding: 24px;
    box-sizing: border-box;
  }

  .text {
    line-height: 0;
    font-size: 20px;
    padding: 20px 0;
  }

  .content {
    padding: 24px;
    background: #FFF;
    border-radius: 10px;
  }

  .content p {
    display: flex;
  }
  .centent  span {
      padding-top: 3px;
      padding-right: 5px;
      color: red;
    }

  .item {
    width: 185px;
    margin-top: 10px;
  }

  .line {
    margin-top: 10px;
    width: 50px;
    text-align: center;
    height: 32px;
    margin-left: 10px;
  }

  .babels {
    box-sizing: border-box;
    padding-bottom: 10px
  }

  .name {
    margin-top: 10px;
    width: 400px;
    height: 32px;
  }

  .select {
    margin-top: 10px;
    height: 32px;
  }

  .btn {
    margin-top: 20px;
    width: 136px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    background: blue;
  }

</style>
