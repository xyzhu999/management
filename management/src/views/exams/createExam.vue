<template>
  <div class="add-layout">

    <h2>创建试卷</h2>
    <div class="add-layout-content">
      <button class="btn" @click="showDialog">添加新题</button>
      <div class="content-list">
        <div class="top-title">
          <h3>{{ pageDetail.title }}</h3>
          <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
        </div>
        <div class="list">
          <div v-for="(item, index) in pageDetail.questions" :key="index" class="style_questionitem__3ETlC">
            <h4>{{ index + 1 }}、{{ item.questions_type_text }}
              <span @click="del(index)">删除</span>
            </h4>
            <VueMarkdown :source="item.questions_stem" />
          </div>
        </div>
      </div>
      <div class="add">
        <el-button type="primary" @click="create">创建试卷</el-button>
      </div>
    </div>
    <div v-show="flag" class="add-drawer">
      <div class="mask" @click="mask" />
      <div class="add-drawer-right">
        <p class="title">所有试题</p>
        <div v-for="(item, index) in allExams" :key="index" class="exam" @click="changeEaxm(item)">
          {{ index + 1 }} 、 {{ item.questions_type_text }}:
          <VueMarkdown :source="item.questions_stem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      pageDetail: {},
      flag: false
    }
  },
  created() {
    this.pageDetail = JSON.parse(window.localStorage.getItem('exam'))
  },
  computed: {
    ...mapState({
      allExams: state => state.exams.allExams
    })
  },
  methods: {
    ...mapActions({
      renewal: 'exams/renewal',
      getAll: 'exams/getAll'
    }),
    changeEaxm(item) {
      this.pageDetail.questions.push(item)
      window.localStorage.setItem('exam', JSON.stringify(this.pageDetail))
      this.flag = false
    },
    mask() {
      this.flag = false
    },
    created() {
      this.pageDetail = JSON.parse(window.localStorage.getItem('exam'))
    },
    async showDialog(item) {
      if (this.pageDetail.questions.length < this.pageDetail.number) {
        await this.getAll()
        this.flag = true
      } else {
        this.$alert('请先删除再添加！', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    del(index) {
      this.$forceUpdate()
      window.localStorage.setItem('exam', JSON.stringify(this.pageDetail))
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        customClass: 'warning'
      }).then(() => {
        console.log(1)
        this.pageDetail.questions.splice(index, 1)
        window.localStorage.setItem('exam', JSON.stringify(this.pageDetail))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async create() {
      // 要用exam_exam_id 的字符串
      const arr = []
      this.pageDetail.questions.forEach(item => {
        arr.push(item.questions_id)
      })
      const str = JSON.stringify(arr)
      const data = { question_ids: str }
      await this.renewal({ header: this.pageDetail.exam_exam_id, data })
      this.$router.push({ path: 'examinationPaperList' })
    }
  }
}
</script>

<style scoped>
  .add /deep/ .el-button.el-button--primary.el-button--medium{
    display: block;
    margin: 0 auto;
  }
  .btn{
    padding: 5px 10px;
    background: #fff;
    outline: none;
    border: 1px solid rgb(24, 144, 255);
    font-size: 14px;
    color: rgb(24, 144, 255);
    border-radius: 5px;
  }
  .list /deep/ code{
    white-space:normal;
  }
  .list{
    white-space:normal;
    word-break:break-all;
  }
  .exam{
   cursor: pointer;
  }
  .add-drawer-right{
    padding: 10px 10px;
    line-height: 30px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* -webkit-line-clamp: 4; */
    overflow: hidden;
    margin: 0 10px;
    margin-bottom: 20px;
    background: #f0f2f5;

  }
  @keyframes fade-in {
  0% {
    width: 0;
  }
  100% {
    width: 40%;
  }
}
  .title{
    padding: 10px;
  }
  .add-drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000000;
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
  }
  .add-drawer-right {
    animation: fade-in;
    animation-duration: 0.2s;
    width: 40%;
    height: 100%;
    position: relative;
    float: right;
    background-color: #fff;
    border: 0;
    background-clip: padding-box;
    z-index: 1;
    overflow-y: auto;
    /* transition: transform scale(40%,100%) 3s; */
  }

  .add-layout {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: auto;
    background: #f0f2f5;
    min-height: 0;
    padding: 0px 24px 24px;
    box-sizing: border-box;
  }

  h2 {
    padding: 20px 0px;
    margin-top: 10px;
    margin-bottom: 0.5em;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 1.5em;
  }
  .add-layout-content {
    width: 100%;
    height: 100%;
    flex: auto;
    min-height: 0;
    background: rgb(255, 255, 255);
    padding: 24px;
    margin: 0px 0px 20px;
    border-radius: 10px;
  }

  h3,
  h4 {
    font-weight: normal;
    display: block;
    font-size: 1.3em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  h4 {
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  .content-list {
    width: 100%;
    margin-bottom: 10px;
  }

  .top-title {
    text-align: center;
    p {
      font-size: 14px;
    }
  }

  .style_questionitem__3ETlC {
    text-align: left;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }

  .markdown,
  pre,
  code {
    margin: 0;
    padding: 0;
  }

  .markdown pre {
    margin-top: 5px;
    height: auto;
    display: block;
    padding: 1em;
    overflow: auto;
    line-height: 1.3;
    color: #657b83;
    background: #f6f6f6;
    background-size: 30px 30px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 1em;
  }

  h4 {
    display: flex;
    justify-content: space-between;
    line-height: 30px;

  }

  span {
    color: blue;
    cursor: pointer;
  }

</style>
