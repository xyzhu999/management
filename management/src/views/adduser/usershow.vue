<template>
  <div class="usershow">
    <titleinfo :title="Title_info" />
    <div class="btndivs">
      <!-- 开始主体 -->
      <el-radio-group v-model="radioValue" @change="selectValue"><el-radio-button v-for="(item,index) in topbutton" :key="index" :label="item">{{ item }}</el-radio-button></el-radio-group>
    </div>
    <p class="Title">{{ radioValue }}</p>
    <div v-if="boxind === 0" class="box_1">
      <el-table :data="Array.from(userlist.slice((currentpage-1)*showsize,currentpage*showsize))" :header-cell-style="cellstyle" :cell-style="cell_style" empty-text="小伙鸡,你貌似没有权限啊" style="width: 100%">
        <el-table-column class="a" prop="user_name" label="用户名" width="360" />
        <el-table-column prop="user_pwd" min-width="500" label="密码" />
        <el-table-column prop="identity_text" label="身份" />
      </el-table>
      <el-pagination class="right_pagin" :page-sizes="[5, 10, 15, 20]" :page-size="showsize" layout="total, sizes, prev, pager, next, jumper" :total="userlist.length*1" :current-page="currentpage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <div v-if="boxind === 1" class="box_1">
      <el-table :data="Array.from(userperson.slice((currentpage-1)*showsize,currentpage*showsize))" :header-cell-style="cellstyle" :cell-style="cell_style" empty-text="小伙鸡,你貌似没有权限啊" style="width: 100%">
        <el-table-column prop="identity_text" label="身份名称" />
      </el-table>
      <el-pagination class="right_pagin" :page-sizes="[5, 10, 15, 20]" :page-size="showsize" layout="total, sizes, prev, pager, next, jumper" :total="userperson.length" :current-page="currentpage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <div v-if="boxind === 2" class="box_2">
      <el-table :data="Array.from(apilist.slice((currentpage-1)*showsize,currentpage*showsize))" :header-cell-style="cellstyle" :cell-style="cell_style" empty-text="小伙鸡,你貌似没有权限啊" style="width: 100%">
        <el-table-column align="center" prop="api_authority_text" label="api权限名称" width="360" />
        <el-table-column align="center" prop="api_authority_url" label="api权限url" />
        <el-table-column align="center" prop="api_authority_method" label="api权限方法" />
      </el-table>
      <el-pagination class="right_pagin" :page-sizes="[5, 10, 15, 20]" :page-size="showsize" layout="total, sizes, prev, pager, next, jumper" :total="apilist.length" :current-page="currentpage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <div v-if="boxind === 3" class="box_3">
      <el-table :data="Array.from(person_list.slice((currentpage-1)*showsize,currentpage*showsize))" :header-cell-style="cellstyle" :cell-style="cell_style" empty-text="小伙鸡,你貌似没有权限啊" style="width: 100%">
        <el-table-column align="center" prop="api_authority_text" label="api权限名称" width="360" />
        <el-table-column align="center" prop="api_authority_url" label="api权限url" />
        <el-table-column align="center" prop="identity_text" label="api权限方法" />
      </el-table>
      <el-pagination class="right_pagin" :page-sizes="[5, 10, 15, 20]" :page-size="showsize" layout="total, sizes, prev, pager, next, jumper" :total="person_list.length" :current-page="currentpage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <div v-if="boxind === 4" class="box_4">
      <el-table :data="Array.from(Viewlist.slice((currentpage-1)*showsize,currentpage*showsize))" :header-cell-style="cellstyle" :cell-style="cell_style" empty-text="小伙鸡,你貌似没有权限啊" style="width: 100%">
        <el-table-column align="center" prop="view_authority_text" label="视图权限名称" width="360" />
        <el-table-column align="center" prop="view_id" label="视图id" />
      </el-table>
      <el-pagination class="right_pagin" :page-sizes="[5, 10, 15, 20]" :page-size="showsize" layout="total, sizes, prev, pager, next, jumper" :total="Viewlist.length" :current-page="currentpage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <div v-if="boxind === 5" class="box_5">
      <el-table :data="Array.from(view_person_list.slice((currentpage-1)*showsize,currentpage*showsize))" empty-text="小伙鸡,你貌似没有权限啊" style="width: 100%">
        <el-table-column align="center" prop="identity_text" label="身份" width="360" />
        <el-table-column align="center" prop="view_authority_text" label="视图名称" />
        <el-table-column align="center" prop="view_id" label="视图id" />
      </el-table>
      <el-pagination class="right_pagin" :page-sizes="[5, 10, 15, 20]" :page-size="showsize" layout="total, sizes, prev, pager, next, jumper" :total="view_person_list.length" :current-page="currentpage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import titles from '../../components/Title_info/Title.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    titleinfo: titles
  },
  data() {
    return {
      Title_info: '用户展示',
      topbutton: ['用户数据', '身份数据', 'api接口权限', '身份和api接口关系', '视图接口权限', '身份和视图权限关系'],
      radioValue: '用户数据',
      boxind: 0,
      showsize: 5, // 身份和视图权限关系每页显示的条目
      currentpage: 1, // 身份和视图权限关系的当前页
      array: []
    }
  },
  created() {
    this.Userlist()
    this.userData()
    this.userapi()
    this.personorserver()
    this.ViewPerson()
    this.View_serverPerson()
  },
  computed: {
    ...mapState({
      userlist: state => state.usershow.username,
      userperson: state => state.usershow.userperson,
      apilist: state => state.usershow.apilist,
      Viewlist: state => state.usershow.Viewlist,
      view_person_list: state => state.usershow.view_person_list,
      loading0: state => state.usershow.loading0,
      person_list: state => state.usershow.person_list
    })
  },
  methods: {
    ...mapActions({
      Userlist: 'usershow/userlist',
      userData: 'usershow/userData',
      userapi: 'usershow/userapi',
      personorserver: 'usershow/personorserver',
      ViewPerson: 'usershow/ViewPerson',
      View_serverPerson: 'usershow/View_serverPerson'
    }),
    cellstyle() {
      return {
        background: 'white', color: 'black'
      }
    },
    cell_style() {
      return {
        height: '60px', background: '#f3f3f3'
      }
    },
    selectValue(e) {
      this.boxind = this.topbutton.indexOf(e)
      switch (this.boxind) {
        case 0:
          this.Userlist()
          break
        case 1:
          this.userData()
          break
        case 2:
          this.userapi()
          break
        case 3:
          this.personorserver()
          break
        case 4:
          this.ViewPerson()
          break
        case 5:
          this.View_serverPerson()
          break
        default:
          break
      }
      this.showsize = 5
      this.currentpage = 1
    },
    handleSizeChange(e) {
      this.showsize = e
    },
    handleCurrentChange(e) {
      this.currentpage = e
    }
  }
}
</script>

<style>
  .box_1{
    padding: 0 24px;
    background-color:#f3f3f3;
  }
  .usershow{
    padding-bottom: 80px;
    position: relative;
    width: 100%;
    background: #f0f2f5;
    margin-top:-17px;
  }
  .right_pagin{
    float:right;
    margin-top:10px;
  }
  .title_size{
    margin-left:15px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size:20px;
  }
  .user_btn{
   margin:0;
   border-radius:0;
  }
  .Title{
  padding-left: 24px;
  font-size:25px;
  transition:.5s;
  }
  .center{
    width:60%;
  }
  .btndivs{
    padding-left:20px;
  }
</style>
