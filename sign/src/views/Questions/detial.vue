<template>
  <div class="box">
    <h2 class="tittle">试题详情</h2>
    <div class="messtitle">
      <p class="username">
        <span>出题人: </span>{{ list.user_name }}
      </p>
      <p class="message">题目信息</p>
      <div class="text">
        <span class="type_text">{{ list.questions_type_text }}</span>
        <span class="subject_text">{{ list.subject_text }}</span>
        <span class="exam_name">{{ list.exam_name }}</span>
      </div>
      <p class="value">
        <markdown-editor ref="markdownEditor" v-model="list.questions_stem" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="300px" width="500px" />
      </p>
    </div>
    <div class="Answer">
      <p class="message">答案信息</p>
      <div classs="messagevalue" />
      <markdown-editor ref="markdownEditor" v-model=" list.questions_answer" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="300px" width="100%" />
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
      date: [],
      list: {}
    }
  },
  computed: {
    ...mapState({
      newquesition: state => state.add.newquesition
    }),
    language() {
      return this.languageTypeList[this.$store.getters.language]
    }
  },
  created() {
    this.questionsnew()
    const item_list = this.$route.query.list
    this.newquesition.forEach(item => {
      if (item_list === item.questions_id) {
        this.list = item
      }
    })
  },
  methods: {
    ...mapActions({
      questionsnew: 'add/questionsnew'
    })
  }
}
</script>
<style scoped>
  .box {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
    background: #f0f2f5;
  }
  .tittle {
    padding: 30px 15px;
    font-weight: 200;
  }
  .messtitle {
    width: 1136px;
    background: white;
    border-radius: 10px;
    margin-left: 20px;
    float: left;
    margin-right: 20px;
    padding: 24px;
    margin-bottom: 20px;
  }
  .Answer {
    width: 500px;
    background: white;
    border-radius: 10px;
    float: left;
    padding: 24px;
    margin-bottom: 20px;
  }
  .username {
    font-size: 14px;
  }
  .message {
    font-size: 16px;
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
  .value {
    font-size: 14px;
    width: 70%;
    margin: 50px;
  }
</style>
