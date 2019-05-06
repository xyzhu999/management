<template>
  <div class="add-layout">
    <div class="wrapper">
      <p class="text">添加考试</p>
      <div class="list">
        <div class="content">
          <div v-for="(item,index) in this.detail.questions" :key="index" class="style_questionitem__3ETlC">
            <h4>{{ index+1 }}、{{ item.questions_type_text }}</h4>
            <VueMarkdown :source="item.questions_stem" ></VueMarkdown>
          </div>
        </div>
        <div class="content">
          <div v-for="(item,index) in this.detail.questions" :key="index" class="style_questionitem__3ETlC">
            <h4>{{ index+1 }}、{{ item.questions_type_text }}</h4>
            <VueMarkdown :source="item.questions_answer" ></VueMarkdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueMarkdown from 'vue-markdown'
export default {
  components:{
VueMarkdown
  },
  computed: {
    ...mapState({
      detail: state => state.exams.detail
    })
  },
  methods: {
    ...mapActions({
      getDetail: 'exams/detail'
    })
  },
  created() {
    this.getDetail(this.$route.query.id)
    console.log(this.detail)
  }
}
</script>

<style scoped>
  .content/deep/code{
    white-space:normal;
    word-break:break-all;
  }
  .content/deep/.style_questionitem__3ETlC{
    white-space:normal;
    word-break:break-all;
  }
  p {
    line-height: 0;
    padding-bottom: 20px;
  }
  .wrapper {
    position: relative;
    width: 100%;
    background: #f0f2f5;
    padding: 24px;
    box-sizing: border-box;
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 24px;
    background: #FFF;
    border-radius: 10px;
    width: 30%;
  }
  .content:nth-child(1){
    width: 70%;
    margin-right: 20px;
  }
  .list{
    width: 100%;
    display: flex;
  }
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
}
.top-title p {
    font-size: 14px;
  }
.style_questionitem__3ETlC {
  text-align: left;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}
.markdown,pre,code{
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
  height: 500px;
}
</style>
