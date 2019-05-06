<template>
  <div class="box">
    <div class="tittle">查看试题</div>
    <div class="topbox">
      <div class="curriculumtype">
        <span>课程类型: </span>
        <span :class="isTrue?'all backblue':'all'" @click="tapAll">All</span>
        <div v-if="isTrue===false" style="display: inline-block">
          <span v-for="(item,index) in sub" :key="index" :class="clickindex==index?'currsps backblue':'currsps'" @click="bindtap(item,index,item.subject_id)">{{ item.subject_text }}</span>
        </div>
        <div v-if="isTrue" style="display: inline-block">
          <span v-for="(item,index) in sub" :key="index" class="currsps backblue" @click="bindtap(item,index)">{{ item.subject_text }}</span>
        </div>
      </div>
      <div class="studytype">
        <div class="select">
          <span>考试类型 : </span>
          <el-select slot="prepend" v-model="studytypevalue" placeholder="" class="sel" @change="Type">
            <el-option v-for="(item,index) in type" :key="index" :label="item.exam_name" :value="item.exam_id" />
          </el-select>
        </div>
        <div class="select">
          <span>题目类型 : </span>
          <el-select slot="prepend" v-model="messtypevalue" placeholder="" class="sel" @change="Question">
            <el-option v-for="(item,index) in getQuestions" :key="index" :label="item.questions_type_text" :value="item.questions_type_id" />
          </el-select>
        </div>
        <div>
          <el-button type="primary" class="btn" icon="el-icon-search" @click="search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="bottombox">
      <div class="bottomlittle">
        <div v-if="cond!==''" class="boxtt">
          <!-- <router-link :to="{path:'detial'}"> -->
          <div v-for="(item,index) in cond" :key="index" class="childrenbox">
            <div @click="detial(item)">
              <p class="stem">{{ item.title }}</p>
              <div class="text">
                <span class="type_text">{{ item.questions_type_text }}</span>
                <span class="subject_text">{{ item.subject_text }}</span>
                <span class="exam_name">{{ item.exam_name }}</span>
              </div>
              <p class="name">{{ item.user_name }} 发布</p>
            </div>
            <div class="abs" @click="write(item)">编辑</div>
          </div>

        </div>
        <div v-if="cond == ''">
          <div class="elsechildrenbox">
            <img
              class="imgchild"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTg0IiBoZWlnaHQ9IjE1MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQgMzEuNjcpIj4KICAgICAgPGVsbGlwc2UgZmlsbC1vcGFjaXR5PSIuOCIgZmlsbD0iI0Y1RjVGNyIgY3g9IjY3Ljc5NyIgY3k9IjEwNi44OSIgcng9IjY3Ljc5NyIgcnk9IjEyLjY2OCIvPgogICAgICA8cGF0aCBkPSJNMTIyLjAzNCA2OS42NzRMOTguMTA5IDQwLjIyOWMtMS4xNDgtMS4zODYtMi44MjYtMi4yMjUtNC41OTMtMi4yMjVoLTUxLjQ0Yy0xLjc2NiAwLTMuNDQ0LjgzOS00LjU5MiAyLjIyNUwxMy41NiA2OS42NzR2MTUuMzgzaDEwOC40NzVWNjkuNjc0eiIgZmlsbD0iI0FFQjhDMiIvPgogICAgICA8cGF0aCBkPSJNMTAxLjUzNyA4Ni4yMTRMODAuNjMgNjEuMTAyYy0xLjAwMS0xLjIwNy0yLjUwNy0xLjg2Ny00LjA0OC0xLjg2N0gzMS43MjRjLTEuNTQgMC0zLjA0Ny42Ni00LjA0OCAxLjg2N0w2Ljc2OSA4Ni4yMTR2MTMuNzkyaDk0Ljc2OFY4Ni4yMTR6IiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMy41NikiLz4KICAgICAgPHBhdGggZD0iTTMzLjgzIDBoNjcuOTMzYTQgNCAwIDAgMSA0IDR2OTMuMzQ0YTQgNCAwIDAgMS00IDRIMzMuODNhNCA0IDAgMCAxLTQtNFY0YTQgNCAwIDAgMSA0LTR6IiBmaWxsPSIjRjVGNUY3Ii8+CiAgICAgIDxwYXRoIGQ9Ik00Mi42NzggOS45NTNoNTAuMjM3YTIgMiAwIDAgMSAyIDJWMzYuOTFhMiAyIDAgMCAxLTIgMkg0Mi42NzhhMiAyIDAgMCAxLTItMlYxMS45NTNhMiAyIDAgMCAxIDItMnpNNDIuOTQgNDkuNzY3aDQ5LjcxM2EyLjI2MiAyLjI2MiAwIDEgMSAwIDQuNTI0SDQyLjk0YTIuMjYyIDIuMjYyIDAgMCAxIDAtNC41MjR6TTQyLjk0IDYxLjUzaDQ5LjcxM2EyLjI2MiAyLjI2MiAwIDEgMSAwIDQuNTI1SDQyLjk0YTIuMjYyIDIuMjYyIDAgMCAxIDAtNC41MjV6TTEyMS44MTMgMTA1LjAzMmMtLjc3NSAzLjA3MS0zLjQ5NyA1LjM2LTYuNzM1IDUuMzZIMjAuNTE1Yy0zLjIzOCAwLTUuOTYtMi4yOS02LjczNC01LjM2YTcuMzA5IDcuMzA5IDAgMCAxLS4yMjItMS43OVY2OS42NzVoMjYuMzE4YzIuOTA3IDAgNS4yNSAyLjQ0OCA1LjI1IDUuNDJ2LjA0YzAgMi45NzEgMi4zNyA1LjM3IDUuMjc3IDUuMzdoMzQuNzg1YzIuOTA3IDAgNS4yNzctMi40MjEgNS4yNzctNS4zOTNWNzUuMWMwLTIuOTcyIDIuMzQzLTUuNDI2IDUuMjUtNS40MjZoMjYuMzE4djMzLjU2OWMwIC42MTctLjA3NyAxLjIxNi0uMjIxIDEuNzg5eiIgZmlsbD0iI0RDRTBFNiIvPgogICAgPC9nPgogICAgPHBhdGggZD0iTTE0OS4xMjEgMzMuMjkybC02LjgzIDIuNjVhMSAxIDAgMCAxLTEuMzE3LTEuMjNsMS45MzctNi4yMDdjLTIuNTg5LTIuOTQ0LTQuMTA5LTYuNTM0LTQuMTA5LTEwLjQwOEMxMzguODAyIDguMTAyIDE0OC45MiAwIDE2MS40MDIgMCAxNzMuODgxIDAgMTg0IDguMTAyIDE4NCAxOC4wOTdjMCA5Ljk5NS0xMC4xMTggMTguMDk3LTIyLjU5OSAxOC4wOTctNC41MjggMC04Ljc0NC0xLjA2Ni0xMi4yOC0yLjkwMnoiIGZpbGw9IiNEQ0UwRTYiLz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0OS42NSAxNS4zODMpIiBmaWxsPSIjRkZGIj4KICAgICAgPGVsbGlwc2UgY3g9IjIwLjY1NCIgY3k9IjMuMTY3IiByeD0iMi44NDkiIHJ5PSIyLjgxNSIvPgogICAgICA8cGF0aCBkPSJNNS42OTggNS42M0gwTDIuODk4LjcwNHpNOS4yNTkuNzA0aDQuOTg1VjUuNjNIOS4yNTl6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
              alt=""
            >
            <p style="font-size: 14px;font-weight: 200">暂无数据</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      clickindex: null,
      currType: '',
      isTrue: false,
      studytypevalue: '',
      messtypevalue: '',
      el: {
        exam_id: '',
        questions_type_id: ''
      },
      subjec: ''
    }
  },
  computed: {
    ...mapState({
      sub: state => state.add.sub,
      getQuestions: state => state.add.getQuestions,
      type: state => state.add.type,
      cond: state => state.add.cond
    })
  },
  created() {
    this.subject()
    this.examType()
    this.getQuestionsType()
    this.condition()
  },
  methods: {
    bindtap(item, index, subject_id) {
      this.currType = item
      this.clickindex = index
      this.subjec = subject_id
    },
    tapAll(e) {
      this.currType = e.target.innerHTML
      this.isTrue = !this.isTrue
    },

    Type(e) {
      this.el.exam_id = e
    },
    Question(e) {
      this.el.questions_type_id = e
    },
    ...mapActions({
      subject: 'add/subject',
      examType: 'add/examType',
      getQuestionsType: 'add/getQuestionsType',
      condition: 'add/condition'
    }),
    search() {
      this.condition({
        questions_type_id: this.el.questions_type_id,
        subject_id: this.subjec,
        exam_id: this.el.exam_id
      })
    },
    detial(item) {
      this.$router.push({ path: 'detial', query: { list: item.questions_id }})
    },
    write(item) {
      this.$router.push({ path: 'addItem', query: { list: item.questions_id }})
    }
  }

}
</script>

<style scoped>
    .box {
        position: relative;
        width: 100%;
        height: calc(100vh - 84px);
        height: 100%;
    }
    .tittle {
        padding: 30px 15px;
        font-size: 26px;
        font-weight: 200;
    }
    .topbox {
        width: 1653px;
        height: 184px;
        background: white;
        border-radius: 10px;
        padding: 24px;
        margin: 0 0 20px 20px;
    }
    .bottombox {
        width: 1653px;
        background: white;
        border-radius: 10px;
        padding: 24px;
        margin: 0 0 20px 20px;
    }
    .bottomlittle {
        width: 1605px;
    }
    .curriculumtype {
        height: 39px;
        line-height: 39px;
        margin-left: 30px;
    }
    .all {
        display: inline-block;
        line-height: 20px;
        height: 22px;
        padding: 0 10px;
        border-radius: 2px;
        font-size: 12px;
        margin-right: 8px;
        cursor: pointer;
        white-space: nowrap;
    }
    .currsps {
        display: inline-block;
        line-height: 20px;
        height: 22px;
        padding: 0 10px;
        border-radius: 2px;
        font-size: 12px;
        margin-right: 8px;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .backblue {
        background: blue;
        color: white;
    }
    .studytype {
        width: 1605px;
        height: 73px;
        margin-top: 10px;
    }
    .select {
        width: 401.25px;
        height: 63px;
        line-height: 63px;
        margin: 5px 20px 0 15px;
        float: left;
    }
    .sel {
        margin-left: 5px;
    }
    .btn {
        width: 130px;
        height: 32px;
        background: #0139fd;
        float: left;
        margin-top: 20px;
    }
    .childrenbox {
        width: 100%;
        height: 150px;
        border-bottom: 1px solid #eee;
        position: relative;
        font-size: 14px;
        margin: 0;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    }
    .elsechildrenbox {
    text-align: center;
  }

  .imgchild {
    width: 121.05px;
    height: 100px;
  }
    .childrenbox:hover {
        background: #eae8ee;
    }
    .abs {
        width: 100px;
        height: 100px;
        /* position: absolute;
        right: 30px;
        top: 20px; */
         text-align: center;
         line-height: 100px;
        color: blue;
        z-index: 9999;
    }
    .stem {
        padding: 15px 0;
    }
    .name {
        color: blue;
    }
    .type_text {
        padding: 3px 6px;
        color: #1890ff;
        background: #e6f7ff;
        border: 1px solid #91d5ff;
        margin-right: 5px;
        font-size: 12px;
    }
    .subject_text {
        padding: 3px 6px;
        color: #2f54eb;
        background: #f0f5ff;
        border: 1px solid #adc6ff;
        font-size: 12px;
    }
    .exam_name {
        padding: 3px 6px;
        color: #fa8c16;
        background: #fff7e6;
        border: 1px solid #ffd591;
        font-size: 12px;
    }

</style>
