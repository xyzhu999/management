<template>
  <div class="chart-container">
    <div class="tittle">试题管理</div>
    <div class="box">
      <div class="inp">
        <p>题目信息</p>
        <p>题干</p>
        <el-input v-model="el.title" placeholder="请输入题目标题,不超过20个字" clearable class="elinput" />
      </div>
      <div class="textear">
        <p>题目主题</p>
        <div class="editor-container">
          <markdown-editor v-model="el.questions_stem" height="300px" class="mark" />
        </div>
      </div>
      <div class="select">
        <P>请选择考试类型</P>
        <el-select slot="prepend" v-model="select" placeholder="请选择" class="sel" @change="Type">
          <el-option v-for="(item,index) in type" :key="index" :label="item.exam_name" :value="item.exam_id" />
        </el-select>
      </div>
      <div class="select">
        <P>选择课程类型</P>
        <el-select slot="prepend" v-model="selects" placeholder="请选择" class="sel" @change="Sub">
          <el-option v-for="(item,index) in sub" :key="index" :label="item.subject_text" :value="item.subject_id" />

        </el-select>
      </div>
      <div class="select">
        <P>选择题目类型</P>
        <el-select slot="prepend" v-model="selectd" placeholder="请选择" class="sel" @change="GetQuestions">
          <el-option v-for="(item,index) in getQuestions" :key="index" :label="item.questions_type_text" :value="item.questions_type_id	" />

        </el-select>
      </div>
      <div class="textear">
        <p>题目答案</p>
        <div class="editor-container">
          <markdown-editor v-model="el.questions_answer" height="300px" class="mark" />
        </div>
      </div>

      <div class="btn">
        <el-button type="primary" @click="dialogVisible = true">提交</el-button>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>添加成功</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'MarkdownDemo',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      input3: '123',
      input4: '',
      input5: '',
      select: '',
      selects: '',
      selectd: '',
      listt: '',
      el: {
        questions_type_id: '',
        questions_stem: '',
        subject_id: '',
        exam_id: '',
        questions_answer: '',
        title: ''
      },
      dialogVisible: false
    }
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language]
    },
    ...mapState({
      type: state => state.add.type,
      sub: state => state.add.sub,
      getQuestions: state => state.add.getQuestions,
      user: state => state.add.user,
      newquesition: state => state.add.newquesition
    })
  },
  created() {
    this.examType()
    this.subject()
    this.getQuestionsType()
    this.userIfo()
    this.questionsnew()
    const list = this.$route.query.list
    this.listt = list
    this.newquesition.forEach(item => {
      if (list === item.questions_id) {
        this.select = item.exam_name
        this.el.questions_stem = item.questions_stem
        this.selects = item.subject_text
        this.selectd = item.questions_type_text
        this.el.questions_answer = item.questions_answer
        this.el.title = item.title
      }
    })
  },
  methods: {
    Type(e) {
      this.el.exam_id = e
    },
    Sub(e) {
      this.el.subject_id = e
    },
    GetQuestions(e) {
      this.el.questions_type_id = e
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    },
    ...mapActions({
      examType: 'add/examType',
      subject: 'add/subject',
      getQuestionsType: 'add/getQuestionsType',
      questions: 'add/questions',
      userIfo: 'add/userIfo',
      questionsnew: 'add/questionsnew',
      update: 'add/update'
    }),
    submit() {
      this.dialogVisible = false
      if (this.listt === undefined) {
        if (this.el.title && this.el.questions_stem && this.el.questions_answer) {
          this.questions({
            questions_type_id: this.el.questions_type_id,
            questions_stem: this.el.questions_stem,
            subject_id: this.el.subject_id,
            exam_id: this.el.exam_id,
            questions_answer: this.el.questions_answer,
            title: this.el.title,
            user_id: this.user.user_id
          })
        } else {
          alert('请填写未填写的东西')
        }
      } else {
        this.update({
          questions_id: this.listt,
          questions_type_id: this.el.questions_type_id,
          questions_stem: this.el.questions_stem,
          subject_id: this.el.subject_id,
          exam_id: this.el.exam_id,
          questions_answer: this.el.questions_answer,
          title: this.el.title
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
    .chart-container {
        position: relative;
        width: 100%;
        height: calc(100vh - 84px);
        background: #f0f2f5;;
        height: 100%;
    }
    .tittle {
        padding: 30px 15px;
        font-size: 30px;
    }
    .box {
        width: 96%;
        height: 100%;
        background: #fff;
        margin: 0 auto;
        border-radius: 15px;
        margin-bottom: 20px;
    }
    .inp p {
        width: 100% !important;
        height: 0 !important;
        padding-top: 20px;
        padding-left: 15px;
    }
    .elinput {
        padding-top: 20px;
        padding-left: 15px;
        width: 400px;
    }
    .editor-container {
        margin-bottom: 30px;
    }
    .tag-title {
        margin-bottom: 5px;
    }
    .mark {
        width: 98% !important;
        height: 300px !important;
        margin: 0 auto;
    }
    .textear p {
        padding-left: 1%;
    }
    .el-select .el-input {
        width: 130px;
    }
    .select p {
        padding: 10px;
        padding-left: 20px;
    }
    .select .sel {
        padding: 10px;
        padding-left: 20px;
    }
    .btn {
        margin: 20px;
    }
</style>
