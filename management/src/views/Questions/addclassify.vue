<template>
  <div class="chart-container">
    <div class="box">
      <div class="tittle">
        试题分类
      </div>

      <div class="little-box">
        <el-button type="primary" class="btn" @click="dialogFormVisible = true">+添加类型</el-button>
        <el-button type="primary" class="btn" @click="excal">导出execl</el-button>
        <el-dialog title="添加类型" :visible.sync="dialogFormVisible" class="tan">
          <el-form :model="form">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入试题类型" />
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
        <div class="table">
          <div class="head">
            <span>类型id</span>
            <span>类型名称</span>
            <span>操作</span>
          </div>
          <div class="count">
            <div v-for="(item,index) in data" :key="index" class="count-text">
              <span>{{ item.questions_type_id }}</span>
              <span>{{ item.questions_type_text }}</span>
              <span><el-button type="primary" icon="el-icon-delete" class="btn" @click="remove(item.questions_type_id)" /></span>
            </div>
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
      visible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      id: 1,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.classify()
    console.log('ttt...', this.data)
  },
  computed: {
    ...mapState({
      data: state => state.add.data
    })
  },
  methods: {
    ...mapActions({
      classify: 'add/classify',
      insertQuestionsType: 'add/insertQuestionsType',
      delQuestionsType: 'add/delQuestionsType'
    }),
    submit() {
      this.dialogFormVisible = false
      this.insertQuestionsType({
        text: this.form.name,
        sort: Math.random().toString(36).substr(2)
      })
      this.classify()
    },
    remove(typeid) {
      this.delQuestionsType({
        id: typeid
      })
      this.classify()
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    excal() {
      const header = Object.keys(this.data[0])
      const Header = this.data.map(item => {
        const arr = Object.values(item)
        return arr.map(item => JSON.stringify(item))
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header,
          data: Header,
          filename: '类型列表',
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style scoped>
    .chart-container {
        position: relative;
        width: 100%;
        height: calc(100vh - 84px);
    }

    .box {
        width: 100%;
        height: 60%;
        background: #f0f2f5;;
    }

    .tittle {
        padding: 30px;
        font-size: 25px;

    }

    .little-box {
        width: 95%;
        height: 75%;
        background: #fff;
        margin: 0 auto;
        margin-bottom: 10px;
        border-radius: 10px;
    }

    .dialog-footer {
        text-align: center;
    }

    .tan {
        width: 100%;
        text-align: center;
    }

    .btn {
        margin: 20px;
    }

    .head {
         display: flex;
        height: 45px;
        align-items: center;
        background: #ccc;
        width: 95%;
        margin: 0 auto;
    }
      .head span{
        display:block;
        width: 33%;
        text-align: center;
       }
    .count {
        width: 95%;
        height: 100%;
        margin: 0 auto;

    }

    .count-text {
        display: flex;
        align-content: center;
        height: 10%;
        align-items: center;
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
    }
    .count-text span{
        display:block;
        width: 33%  ;
        text-align: center;
    }
    .count-text:hover {
        background: #ccc;
    }
    .table{
      width: 100%;
      height: 100%;
    }
    .btn{
      height: 30px;
    }
</style>
