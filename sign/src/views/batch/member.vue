<template>
  <div class="box">
    <div class="box_top">
      <div class="box_top_left">
        <span>状态 : </span>
        <el-select v-model="value">
          <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="box_top_right">
        <span>班级 : </span>
        <el-select v-model="classvalue" placeholder="请选择">
          <el-option
            v-for="item in classLists"
            :key="item.grade_id"
            :label="item.grade_name"
            :value="item.grade_id"
          />
        </el-select>
      </div>
      <div class="box_top_button">
        <el-button class="button" type="submit" icon="el-icon-search" @click="inquire">查询</el-button>
        <!-- <el-button class="button" type="primary" @click="toLead">导入</el-button> -->
        <el-button class="button" type="primary" @click="excel">导出</el-button>
      </div>
    </div>
    <div class="box_bottom">
      <p class="tit">试卷列表</p>
      <el-table
        id="tabels"
        :data="StudentListDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%;border-radius:'10px'"
        class="table"
      >
        <el-table-column prop="grade_name" label="班级" width="138" />
        <el-table-column prop="student_name" label="姓名" width="144" />
        <el-table-column label="阅卷状态" width="171">
          <template slot-scope="scope">{{ scope.row.status ? '已阅':'未阅' }}</template>
        </el-table-column>
        <el-table-column prop="start_time" label="开始时间" width="253" />
        <el-table-column prop="end_time" label="结束时间" width="253" />
        <el-table-column prop="score" label="成材率" width="144" />
        <el-table-column label="操作" width="117">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="options" @click="handleClick(scope.row)"><router-link
              :to="{path:'member-detail',query:{exam_student_id:scope.row.exam_student_id	,grade_id:grade_id}}"
            >批卷</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_box">
        <el-pagination
          class="pagination"
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="prev, pager, next,sizes,jumper"
          :total="StudentListDatas.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      state: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      classvalue: '',
      currentPage4: 1,
      currentPage: 1,
      pagesize: 5,
      newData: [],
      grade_id: 0,
      newStudentListDatas: []
    }
  },
  computed: {
    ...mapState({
      StudentListDatas: state => state.batchStore.StudentListDatas,
      classLists: state => state.batchStore.classLists
    })
  },
  watch: {

  },
  created() {
    this.getStudentListData({
      grade_id: this.$route.query.id
    })
    this.newData = this.StudentListDatas
    this.grade_id = this.$route.query.id
  },
  methods: {
    ...mapActions({
      getStudentListData: 'batchStore/getStudentListData'
    }),
    handleClick(row) {
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    inquire() {
      this.newData = this.StudentListDatas.filter((item, index) => {
        return item.grade_id.match(this.classvalue)
      })
      // console.log(this.newData)
    },
    excel() {
      const header = Object.keys(this.StudentListDatas[0])
      console.log(header)
      const list = this.StudentListDatas.map(item => {
        const arr = Object.values(item)
        return arr.map(item => JSON.stringify(item))
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header,
          data: list,
          filename: '试卷列表',
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style scoped>
    .box{
        position: relative;
        width: 100%;
        box-sizing: border-box;
        padding:60px 24px 30px 24px;
        background: #f0f2f5;
        overflow: auto;
    }
    .box_top{
        width: 100%;
        height: 120px;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        display: flex;
    }
    .box_top_left,.box_top_right,.box_top_button{
        margin-top: 30px;
        margin-left: 70px;
    }
    .box_top_left{
    margin-left: 60px;
    }
    .button{
        width:132px;
        height:32px;
        background:#0139FD;
        color: #fff;
        font-size: 14px;
    }
   .box_top span{
            font-size:14px;
    }
    .tit{
        width: 100%;
        padding: 10px 0px 0px 30px;
    }
    .has-gutter{
        background:rgba(0, 0, 0, 0.65);
    }
    .box_bottom{
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        margin-top:30px;
    }
    .table{
        width:100%;
        padding: 10px 30px 0 30px;
        box-sizing: border-box;
    }
   .options{
        font-size: 14px;
   }
   .pagination_box{
       width: 100%;
   }
   .pagination{
      float: right;
      padding: 15px 30px 30px 0;

   }
   .el-table::before{
       display: none;
   }
</style>
