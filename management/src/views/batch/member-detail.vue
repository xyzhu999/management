<template>
  <div class="box">
    <h2 class="tit">阅卷</h2>
    <div class="main">
      <div class="main_left">
        <div v-for="(item,index) in StudentDetails?StudentDetails.questions:[]" :key="index" class="item_exam">
          <p>{{ index + 1 }}、{{ item.title }}<span class="type_text">{{ item.questions_type_text }}</span></p>
          <vueMarkdown class="markdown">{{ item.questions_stem }}</vueMarkdown>
        </div>
      </div>
      <div class="main_right">
        <h2 class="name">{{ StudentDetails?StudentDetails.student_name:"" }}</h2>
        <div class="score">
          <p>得分:</p>
          <h1>{{ StudentDetails.score }}</h1>
        </div>
        <div class="block">
          <el-slider v-model="StudentDetails.score" class="slider" />
        </div>
        <el-button class="yesBtn" type="text" @click="open">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import vueMarkdown from 'vue-markdown'
export default {
  name: 'MarkdownDemo',
  components: { vueMarkdown },
  data() {
    return {
      name: '王子音',
      dialogVisible: false,
      exam_student_id: 0,
      newquestions: []
    }
  },
  computed: {
    ...mapState({
      StudentDetails: state => state.batchStore.StudentDetails
    })
  },
  created() {
    this.score = this.scores
    this.getStudentDetail(this.$route.query.exam_student_id)
  },
  methods: {
    open() {
      this.$confirm('确定提交阅卷结果?分数值是' + this.score, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.open6()
      }).catch(() => {
      })
    },
    open6() {
      this.$confirm('批卷结果, 批改试卷成功 ' + this.StudentDetails.student_name + '得分' + this.score, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.getbathchSucceed({
          exam_student_id: this.$route.query.exam_student_id,
          score: this.score
        })
        this.$router.push({ path: '/mark/member?id=' + this.$route.query.grade_id })
      }).catch(() => {

      })
    },
    ...mapActions({
      getStudentDetail: 'batchStore/getStudentDetail',
      getbathchSucceed: 'batchStore/getbathchSucceed'
    }),
    ...mapMutations({
      getScore: 'batchStore/updatascore'
    }),
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
    },
    formatTooltip(val) {
      return val / 100
    }
  }
}
</script>

<style scoped>
    .markdown /deep/ img{
      width: 100%;
    }
    .box{
        width: 100%;
        box-sizing: border-box;
        padding:0 24px 0 24px;
        background: #f0f2f5;
        overflow: auto;
    }
    .yesBtn{
      text-align: center;
      padding: 8px 40px!important;
      border-radius: 4px!important;
      border: 0!important;
      font-size: 14px!important;
      color: #fff!important;
      background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
      margin-left: 7%;
    }
    .slider{
        width: 86%;
        margin-left: 7%;
    }
    .tit{
        width: 100%;
        padding: 30px 0px 0px 0;
        margin-top: 0px;
        font-weight: normal;
        margin-bottom: 35px;
    }
    .main{
        width: 100%;
        margin-bottom:30px;
    }
    .main_left{
        width:74%;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        padding: 30px;
    }
    .main_right{
        width: 20%;
        height: 261.5px;
        position: fixed;
        top:175px;
        right: 30px;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
    }
    .name{
        font-weight: normal;
        margin-left: 25px;
        margin-top: 40px;
    }
    .score{
        width: 100%;
        display: flex;
        padding-left:25px;
        box-sizing: border-box;
    }
    .score p{
        margin-top: 4px;
        font-size: 22px;
    }
    .score h1{
        margin-top: -5px;
        color:#0139FD ;
        font-weight: normal;
    }
    .button{
        width:111px;
        height:32px;
        background:#0139FD;
        color: #fff;
        font-size: 14px;
        margin-left: 25px;
        margin-top: 15px;
    }
    .item_exam{
      border-bottom: 0.5px solid #eee;
      padding-bottom:20px;
    }
    .type_text{
      display: inline-block;
      padding: 2px 5px;
      color: #1890ff;
      border:1px solid #91d5ff ;
      background:#e6f7ff ;
      font-size:13px;
      margin-left: 7px;
    }
</style>
