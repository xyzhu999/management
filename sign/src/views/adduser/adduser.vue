<template>
  <div class="containter">
    <titleinfo :title="Title_info" />
    <div class="top_title">
      <div class="infos">
        <el-button v-for="(item,index) in addList" :key="index" plain :class="index === ind?'active':''" @click="tab(index)">{{ item }}</el-button>
        <div v-if="ind === 0" class="addUser">
          <el-input v-model="name" class="name_1" placeholder="请输入用户名" clearable />
          <el-input v-model="pwd" class="pwd" placeholder="请输入密码" show-password />

          <el-select slot="prepend" v-model="select" class="select" placeholder="请选择身份id">
            <el-option v-for="(item,index) in userData" :key="index" :label="item.identity_text" :value="index" />
          </el-select>
          <div class="confim"><el-button type="primary" class="success" @click="adduser">确定</el-button><el-button class="reset" plain @click="plan">重置</el-button></div>
        </div>

        <div v-if="ind === 1" class="addUser">
          <el-select slot="prepend" v-model="userselect" class="select" placeholder="请选择身份ID">
            <el-option v-for="(item,index) in usernamelist" :key="index" :label="item.user_name" :value="index" />
          </el-select>

          <el-input v-model="new_name" class="new_name" placeholder="请输入用户名" clearable />
          <el-input v-model="new_pwd" class="pwd" placeholder="请输入密码" show-password />

          <el-select slot="prepend" v-model="manger" class="select" placeholder="请选择他/她的身份" @change="selectnew">
            <el-option v-for="(item,index) in userData" :key="index" :label="item.identity_text" :value="index" />
          </el-select>
          <div class="confim"><el-button type="primary" class="success" @click="stateuser">确定</el-button><el-button class="reset" plain @click="reun">重置</el-button></div>
        </div>

      </div>
      <div class="person">
        <el-button class="active add_person">添加身份</el-button>
        <el-input v-model="person" clearable class="name_2" placeholder="请输入身份" />
        <div class="confim"><el-button type="primary" class="success" @click="adduserperson">确定</el-button><el-button class="reset" plain @click="hot">重置</el-button></div>
      </div>
      <div class="add_api">
        <el-button class="active add_person">添加api接口权限</el-button>
        <el-input v-model="api_name" class="name_2" placeholder="请输入api接口权限名称" clearable />
        <el-input v-model="api_url" class="name_2" placeholder="请输入api接口权限url" clearable />
        <el-input v-model="api_fun" class="name_2" placeholder="请输入api接口权限方法" clearable />
        <div class="confim"><el-button type="primary" class="success" @click="apiadds">确定</el-button><el-button class="reset" plain @click="hots">重置</el-button></div>
      </div>

      <div class="add_view">
        <el-button class="active view">添加视图接口权限</el-button>
        <el-select slot="prepend" v-model="view_select" class="select" placeholder="请输入已有视图" @change="select_event">
          <el-option v-for="(item,index) in viewList" :key="index" :label="item.view_authority_text" :value="index" />
        </el-select>
        <div class="confim"><el-button type="primary" class="success" @click="addview_person">确定</el-button><el-button class="reset" plain @click="hotse">重置</el-button></div>
      </div>
      <div class="add_api_seting">
        <el-button class="active apibtn">给身份设置api接口权限</el-button>
        <el-select v-model="user_add_api" class="select" placeholder="请选择身份id" @change="apiselect">
          <el-option v-for="(item,index) in userData" :key="index" :label="item.identity_text" :value="index" />
        </el-select>
        <el-select v-model="user_add_manger" class="select" placeholder="请选择api接口权限" @change="apiselecttwo">
          <el-option v-for="(item,index) in apilist" :key="index" :label="item.api_authority_text" :value="index" />
        </el-select>
        <div class="confim"><el-button type="primary" class="success" @click="apiadd">确定</el-button><el-button class="reset" plain @click="hotses">重置</el-button></div>
      </div>

      <div class="add_api_seting">
        <el-button class="active view_api">给身份设置视图权限</el-button>
        <el-select v-model="user_view_manger" class="select" placeholder="请选择身份id" @change="selectviewone">
          <el-option v-for="(item,index) in userData" :key="index" :label="item.identity_text" :value="index" />
        </el-select>
        <el-select v-model="user_view_id" class="select" placeholder="请选择视图权限id" @change="selectviewtwo">
          <el-option v-for="(item,index) in viewList" :key="index" :label="item.view_authority_text" :value="index" />
        </el-select>
        <div class="confim"><el-button type="primary" class="success" @click="addview">确定</el-button><el-button class="reset" plain @click="returns">重置</el-button></div>
      </div>
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
      Title_info: '添加用户',
      addList: ['添加用户', '更新用户'],
      select: '', // 用于添加用户的下拉框下标
      addUserValue: null, // 根据下标处理添加用户
      name: '', // 添加用户名
      pwd: '', // 添加密码
      ind: 0, // tab切换下标
      userselect: '', // 更新用户身份id的下拉框值下标
      manger: '', // 更新用户的身份
      new_name: '', // 更新用户的用户名
      new_pwd: '', // 更新用户的密码
      person: '', // 添加身份的输入框值
      api_name: '', // 添加api接口权限名称值
      api_url: '', // 添加api接口权限url的值
      api_fun: '', // 添加api接口权限方法的值
      view_select: '', // 添加视图接口权限下标值
      user_add_api: '', // 添加用户身份id的下拉框下标
      user_add_manger: '', // 添加api接口权限的下拉框下标
      user_view_manger: '', // 试图全线给身份id下拉框下标
      user_view_id: '', // 用户视图权限id
      view_select_value: '', // 拿到视图权限下拉框的值
      api_one_select: '',
      api_two_select: '',
      view_api_select: '',
      view_api_two_select: '',
      select1: ''
    }
  },
  computed: {
    ...mapState({
      userData: state => state.adduser.user_Data,
      code: state => state.adduser.code,
      usernamelist: state => state.adduser.username,
      UserCode: state => state.adduser.userCode,
      adduserCode: state => state.adduser.adduserCode,
      apicode: state => state.adduser.addapiCode,
      viewList: state => state.adduser.viewList,
      apilist: state => state.adduser.apilist,
      apiCode: state => state.adduser.apiCode,
      addViewCode: state => state.adduser.addViewCode,
      perSonCode: state => state.adduser.perSonCode
    })
  },
  created() {
    this.userdata() // 获取身份数据
    this.username() // 获取身份名称name
    this.viewlist() // 获取用户视图权限列表
    this.api_authorityList() // 获取api接口权限列表
  },
  methods: {
    ...mapActions({
      userdata: 'adduser/userdata',
      addusers: 'adduser/adduser',
      username: 'adduser/username',
      updateusername: 'adduser/updateusername',
      addusercrad: 'adduser/addusercard',
      addapi: 'adduser/addapi',
      viewlist: 'adduser/addview',
      addViewPerson: 'adduser/addViewPerson',
      api_authorityList: 'adduser/api_authorityList',
      personApi: 'adduser/personApi',
      viewaddApi: 'adduser/viewaddApi'
    }),
    hot() {
      this.person = ''
    },
    reun() {
      this.new_name = ''
      this.new_pwd = ''
      this.manger = ''
      this.userselect = ''
    },
    hotses() {
      this.user_add_api = ''
      this.user_add_manger = ''
    },
    plan() {
      this.select = ''
      this.name = ''
      this.pwd = ''
    },
    tab(index) {
      this.ind = index
    },
    hots() {
      this.api_name = ''
      this.api_url = ''
      this.api_fun = ''
    },
    hotse() {
      this.view_select = ''
    },
    adduser() { // 添加用户的逻辑
      if (!this.userData[this.select]) {
        this.$message.error('请检查未填写值')
      } else {
        this.addUserValue = this.userData[this.select]
      }
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      var Reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
      var blone = Reg.test(this.pwd)
      var userblone = uPattern.test(this.name)
      if (this.name === '' || this.addUserValue === null || this.pwd === '') {
        this.$message.error('请检查未填写值')
      } else if (blone === false) {
        this.$message.error('密码格式不正确')
        return false
      } else if (userblone === false) {
        this.$message.error('用户名格式不正确')
        return false
      } else {
        this.addusers({ user_name: this.name, user_pwd: this.pwd, identity_id: this.addUserValue.identity_id }).then(() => {
          if (this.code === 1) {
            this.$message({
              message: '恭喜你，添加成功',
              type: 'success'
            })
            this.userdata()
            this.name = ''
            this.pwd = ''
            this.addUserValue = null
          } else {
            this.$message.error('用户已经存在')
          }
        })
      }
    },
    selectnew(e) {
      this.select1 = this.userData[e].identity_id
    },
    stateuser() {
      if (this.new_name === '' || this.usernamelist[this.userselect].user_id === '' || this.new_pwd === '' || this.userid === '' || this.select1 === '') {
        this.$message.error('请检查未填写值')
      } else {
        this.updateusername({ user_id: this.usernamelist[this.userselect].user_id, user_name: this.new_name, user_pwd: this.new_pwd, identity_id: this.select1 })
          .then(() => {
            if (this.UserCode === 1) {
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              })
            }
          }).catch((err) => {
            console.log('错误', err)
          })
      }
    },
    adduserperson() {
      if (this.person.trim() === '') {
        this.$message.error('请检查未填写值')
      } else {
        this.addusercrad({ identity_text: this.person }).then(() => {
          if (this.adduserCode === 1) {
            this.$message({ message: '恭喜你，添加成功', type: 'success' })
            this.userdata()
          } else {
            this.$message.error('重复')
          }
        })
        this.person = ''
      }
    },
    apiadds() {
      if (this.api_name === '' || this.api_url === '' || this.api_fun === '') {
        this.$message.error('不可以为空')
      } else {
        this.addapi({ api_authority_text: this.api_name, api_authority_url: this.api_url, api_authority_method: this.api_fun }).then(() => {
          if (this.apicode === 1) {
            this.$message({ message: '恭喜你，添加成功', type: 'success' })
            this.api_authorityList()
          } else {
            this.$message.error('该权限已存在')
          }
        })
      }
    },
    select_event() {
      this.view_select_value = this.viewList[this.view_select]
    },
    addview_person() {
      if (this.view_select_value === '') {
        this.$message.error('请先选择')
      } else {
        var content = this.view_select_value
        if (this.addViewCode === 1) {
          this.addViewPerson({ view_authority_text: content.view_authority_text, view_id: content.view_authority_id })
        } else {
          this.$message.error('权限名称重复')
        }
      }
    },
    apiselect() {
      this.api_one_select = this.userData[this.user_add_api].identity_id
    },
    apiselecttwo() {
      this.api_two_select = this.apilist[this.user_add_manger].api_authority_id
    },
    apiadd() {
      if (this.api_one_select === '' || this.api_two_select === '') {
        this.$message.error('缺少必要参数')
      } else {
        this.personApi({ identity_id: this.api_one_select, api_authority_id: this.api_two_select }).then(() => {
          if (this.apiCode === 1) {
            this.$message({ message: '添加成功', type: 'success' })
          } else {
            this.$message.error('权限重复!重新选择')
          }
        })
      }
    },
    selectviewone(e) {
      this.view_api_select = this.userData[e].identity_id
    },
    selectviewtwo(e) {
      this.view_api_two_select = this.viewList[e].view_authority_id
    },
    addview() {
      if (this.view_api_select === '' || this.view_api_two_select === '') {
        this.$message.error('请先做出选择')
      } else {
        this.viewaddApi({ identity_id: this.view_api_select, view_authority_id: this.view_api_two_select })
          .then(() => {
            if (this.perSonCode === 1) {
              this.$message({ message: '添加成功', type: 'success' })
            } else {
              this.$message.error('权限重复!重新选择')
            }
          })
      }
    },
    returns() {
      this.user_view_manger = ''
      this.user_view_id = ''
    }
  }
}
</script>

<style>
  .apibtn {
    width: 180px;
    text-align: center;
  }

  .view_api {
    width: 160px;
  }
  .add_person{
    margin-bottom:10px;
  }

  .name_2 {
    margin-bottom: 15px;
  }

  .add_view {
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ccc;
  }

  .view {
    width: 150px;
  }

  .active {
    color: #295eff;
    font-weight: 800;
    border: 1px solid #0139fd;
  }
  .containter {
    position: relative;
    width: 100%;
    background: #f0f2f5;
    margin-top: -17px;
  }

  .name_1 {
    margin-top: 10px;
  }

  .person {
    width: 33.3%;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }

  .top_title {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding-left: 15px;
  }

  .top_title>div {
    width: 33.3%;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }

  .addUser {
    display: flex;
    flex-direction: column;
  }

  .add_api_seting {
    display: flex;
    flex-direction: column;
  }
  .infos{
    width: 33.3%;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }

  .select {
    margin-top: 17px;
    margin-bottom: 17px;
    color: #bfbfbf;
    width: 180px;
  }

  .pwd {
    margin-top: 15px;
  }

  .success {
    width: 120px;
    background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
    font-weight: 500;
  }

  .reset {
    background-color: white;
    color: rgba(0, 0, 0, 0.65);
  }
</style>
