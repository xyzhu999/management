<template>
  <div class="wrapper">
    <p class="text">试卷列表</p>
    <div class="content">
      <el-form ref="info" :inline="true" :model="info" :rules="rules" class="demo-form-inline">
        <el-form-item class="babels" label="考试类型:" prop="exam_id" required>
          <el-select v-model="info.exam_id" class="select" style="width: 150px;">
            <el-option
              v-for="item in examTypeList"
              :key="item.exam_id"
              :label="item.exam_name"
              :value="item.exam_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="babels" label="课程:" prop="subject_id" required>
          <el-select v-model="info.subject_id" class="select" style="width: 150px;">
            <el-option
              v-for="item in subjectList"
              :key="item.subject_id"
              :label="item.subject_text"
              :value="item.subject_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('info')">
            <i class="el-icon-search" />
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="nav">
        <span>试卷列表</span>
        <div class="type">
          <span v-for="(item,index) in spanList" :key="index" :class="index == isIndex ? 'active_span' : '' " @click="changeType(index)">
            {{ item }}
          </span>
        </div>
      </div>
      <el-table :data="list" :header-cell-style="tableHeaderColor" style="width: 100%">
        <el-table-column label="试卷信息">
          <template slot-scope="scope">
            <p>{{ scope.row.title }}</p>
            <p>考试时间:{{ 0 }} {{ scope.row.number }}道题{{ scope.row.status }}分</p>
          </template>
        </el-table-column>
        <el-table-column label="班级">
          <template slot-scope="scope">
            <p>教室班级</p>
            <p><span v-for="(item, index) in scope.row.grade_name" :key="index">{{ item }}      </span></p>
          </template>
        </el-table-column>
        <el-table-column label="创建人">
          <template slot-scope="scope">
            <p>{{ scope.row.user_name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="87">
          <template slot-scope="scope">
            <span class="detail" @click="gotoDetail(scope.row.exam_exam_id)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ExaminationPaperList',
  data() {
    return {
      spanList: ['全部', '进行中', '已结束'],
      isIndex: '',
      info: {
        exam_id: '',
        subject_id: ''
      },
      rules: {
        exam_id: [
          { required: true, message: '请选择考试类型', trigger: 'change' }
        ],
        subject_id: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.examType()
    this.subject()
    this.getList()
  },
  computed: {
    ...mapState({
      examTypeList: state => state.exams.examTypeList,
      subjectList: state => state.exams.subjectList,
      list: state => state.exams.list
    })
  },
  methods: {
    ...mapActions({
      examType: 'exams/examType',
      subject: 'exams/subject',
      getList: 'exams/getList'
    }),
    // 点击跳转详情
    gotoDetail(exam_exam_id) {
      // console.log(exam_exam_id)
      this.$router.push({ path: 'detail' + '?id=' + exam_exam_id })
    },
    // 点击改变样式
    changeType(type) {
      this.isIndex = type
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f4f7f9;color: #000;font-weight: 500;width:100%; height: 53px;'
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
        // 转成毫秒
          this.getList(this.info)
        } else {
          console.log('error submit!!')
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
  .content:nth-child(1){
    background: red;
  display: flex;
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
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
}
.from {
  padding-bottom: 24px;
  box-sizing: border-box;
}
.btn {
  width: 150px;
  margin-left: -50px;
  background: blue;
}
.select {
  margin-right: 100px;
  width: 16.1%;
  min-width: 150px;
  margin-left: 10px;
}
.one {
  margin-left: 5%;
}
.content:nth-child(3) {
  margin-top: 20px;
}
.type {
  display: inline-block;
}
.active {
    color: blue;
    border-color: blue;
  }
.spans {
    margin: 0;
    color: skyblue;
    border: 1px solid #eee;
    display: inline-block;
    cursor: pointer;
    padding: 10px;
  }
.detail {
  color: blue
}
.type .active_span{
  /* margin-left: 88%; */
    color: blue;
    border-color:blue;
}
.type   span{
    border:1px solid #f4f7f9;
    padding:5px 15px;
    cursor: pointer;
  }
.nav{
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
}
span{
  cursor: pointer;
}
</style>
