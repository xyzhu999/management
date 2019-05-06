<template>
  <div class="box">
    <h2 class="tit">待批班级</h2>
    <div class="main">
      <el-table
        id="tabels"
        :data="classLists.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%;border-radius:'10px'"
        class="table"
      >
        <el-table-column prop="grade_name" label="班级名" width="157" />
        <el-table-column prop="subject_text" label="课程名称" width="298" />
        <el-table-column prop="" label="阅卷状态" width="185" />
        <el-table-column prop="subject_text" label="课程名称" width="298" />
        <el-table-column prop="room_text" label="成材率" width="157" />
        <el-table-column label="操作" width="127">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="options" @click="handleClick(scope.row)"><router-link :to="{path:'member',query:{id:scope.row.grade_id}}">批卷</router-link></el-button>
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
          :total="classLists.length"
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
      currentPage4: 1,
      currentPage: 1,
      pagesize: 5
    }
  },
  computed: {
    ...mapState({
      classLists: state => state.batchStore.classLists
    })
  },
  created() {
    this.getClassList()
  },
  methods: {
    ...mapActions({
      getClassList: 'batchStore/getClassList'
    }),
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped>
    .box{
        width: 100%;
        box-sizing: border-box;
        padding:0 24px 0 24px;
        background: #f0f2f5;
        overflow: auto;
    }
    .tit{
        width: 100%;
        padding: 30px 0px 0px 0;
        margin-top: 0px;
        font-weight: normal;
        margin-bottom: 35px;
    }
    .has-gutter{
        background:rgba(0, 0, 0, 0.65);
    }
    .main{
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        margin-bottom:30px;
    }
    .table{
        width:100%;
        padding: 30px 30px 0 30px;
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
