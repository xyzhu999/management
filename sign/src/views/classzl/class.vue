<template>
  <div class="wrap" style="padding: 0px 24px 24px">
    <h2 style="padding: 20px 0px; margin-top: 10px;">班级管理</h2>
    <div class="content">
      <div class="content-cont">
        <div class="container">
          <el-button type="primary" class="container_btn" @click="dialogFormVisible = true">添加班级</el-button>
        </div>
        <div class="content_tables">
          <el-table :data="grade" style="width: 100%" :header-cell-style="tableHeaderColor">
            <el-table-column prop="grade_name" label="班级名" width="200" />
            <el-table-column prop="subject_text" label="课程名" width="380" />
            <el-table-column prop="room_text" label="教室号" />
            <el-table-column prop="xiugai" label="操作">
              <template slot-scope="scope">
                <a style="color: #0139FD;" @click="showModal(scope.row)">修改</a>|
                <a style="color: #0139FD;" @click="deletegrade(scope.row.grade_id)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="班级名：" prop="name" style="margin-left:-20px" />
            <el-input v-model="ruleForm.name" />
            <el-form-item label="教室号：" prop="region" style="margin-left:-20px" />
            <el-select v-model="ruleForm.region" placeholder="请选择教室号" style="width:100%;">
              <el-option v-for="(item,index) in room" :key="index" :label="item.room_text" :value="item.room_id" />
            </el-select>
            <el-form-item label="课程名：" prop="course" style="margin-left:-20px" />
            <el-select v-model="ruleForm.course" placeholder="课程名" style="width:100%;">
              <el-option v-for="(item,index) in subject" :key="index" :label="item.subject_text" :value="item.subject_id" />
            </el-select>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="hidemask">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleForm)">提 交</el-button>
          </div>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="添加班级" :visible.sync="modal">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="班级名：" prop="name" style="margin-left:-20px" />
            <el-input
              v-model="input"
              placeholder="请输入内容"
              :disabled="true"
            />
            <el-form-item label="教室号：" prop="region" style="margin-left:-20px" />
            <el-select v-model="roomId" placeholder="请选择教室号" style="width:100%;">
              <el-option v-for="(item,index) in room" :key="index" :label="item.room_text" :value="item.room_id" />
            </el-select>
            <el-form-item label="课程名：" prop="course" style="margin-left:-20px" />
            <el-select v-model="subjectId" placeholder="课程名" style="width:100%;">
              <el-option v-for="(item,index) in subject" :key="index" :label="item.subject_text" :value="item.subject_id" />
            </el-select>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="modal = false">取 消</el-button>
            <el-button type="primary" @click="addgrade">提 交</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      dialogFormVisible: false,
      modal: false,
      ruleForm: {
        name: '',
        region: '',
        course: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        course: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      input: '',
      roomId: '',
      subjectId: '',
      gradeId: ''
    }
  },
  computed: {
    ...mapState({
      grade: state => state.classmanagement.grade, // 班级数据
      room: state => state.classmanagement.room, // 教室数据
      subject: state => state.classmanagement.subject // 课程数据
    })
  },
  created() {
    this.getgrade()
    this.getroom()
    this.getsubject()
  },
  methods: {
    ...mapActions({
      getgrade: 'classmanagement/getgrade',
      getroom: 'classmanagement/getroom',
      getsubject: 'classmanagement/getsubject',
      set_grade: 'classmanagement/set_grade',
      update_grade: 'classmanagement/update_grade',
      delete_grade: 'classmanagement/delete_grade'
    }),
    // 头部颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f4f7f9;color: #000;font-weight: 500;width:100%; height: 53px;'
      }
    },
    // 弹窗框隐藏
    hidemask() {
      this.dialogFormVisible = false
    },
    async submitForm(formName) {
      this.dialogFormVisible = false
      await this.set_grade({ grade_name: formName.name, room_id: formName.region, subject_id: formName.course })
      await this.getgrade()
    },
    showModal(row) {
      this.modal = true
      this.input = row.grade_name
      this.roomId = row.room_id
      this.subjectId = row.subject_id
      this.gradeId = row.grade_id
      // console.log(row)
    },
    // 修改班级
    async addgrade() {
      this.modal = false
      // console.log(this.input, this.roomId, this.subjectId, this.gradeId)
      await this.update_grade({ grade_id: this.gradeId, grade_name: this.input, subject_id: this.ubjectId, room_id: this.roomId })
      await this.getgrade()
    },
    // 删除班级
    async deletegrade(id) {
      console.log(id)
      await this.delete_grade({ grade_id: id })
      await this.getgrade()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background: #f0f2f5;
}
h2 {
  font-weight: 500;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
}
.content-cont {
  width: 100%;
  height: 100%;
  padding: 24px;
  margin: 0px 0px 20px;
}
.content_tables {
  padding-top: 10px;
}
.el-form-item{
  margin-bottom:0;
}

</style>
