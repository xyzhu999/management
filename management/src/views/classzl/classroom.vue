<template>
  <div class="wrap" style="padding: 0px 24px 24px">
    <h2 style="padding: 20px 0px; margin-top: 10px;">教室管理</h2>
    <div class="content">
      <div class="content-cont">
        <div class="container">
          <el-button type="primary" class="container_btn" @click="showmask">添加教室</el-button>
        </div>
        <div class="content_tables">
          <el-table :data="room" style="width: 100%" :header-cell-style="tableHeaderColor">
            <el-table-column label="教室号">
              <template slot-scope="scope">
                <span>{{ scope.row.room_text }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  :data-id="scope.row.room_id"
                  @click="open2(scope.row.room_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          title="添加教室"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <p>教室号</p>
          <el-input
            v-model="input"
            placeholder="教室号"
            clearable
          />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="hidemask">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ClassChart',
  data() {
    return {
      dialogVisible: false,
      input: ''
    }
  },
  computed: {
    ...mapState({
      room: state => state.classmanagement.room
    })
  },
  created() {
    this.getroom()
    // this.tableData = this.room
  },
  methods: {
    ...mapActions({
      getroom: 'classmanagement/getroom',
      setroom: 'classmanagement/setroom',
      deleteroom: 'classmanagement/deleteroom'
    }),
    // table头部颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f4f7f9;color: #000;font-weight: 500;width:100%; height: 53px;'
      }
    },
    // 点击删除弹窗
    open2(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        await this.deleteroom({ room_id: id })
        await this.getroom()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 显示教室弹窗
    showmask() {
      this.dialogVisible = true
    },
    // 隐藏教室弹窗
    async hidemask() {
      this.dialogVisible = false
      await this.setroom({ room_text: this.input })
      await this.getroom()
    }
  }
}

</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background: #f0f2f5;
}
h2 {
  font-weight: 500;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
}
.content-cont {
  width: 100%;
  height: 100%;
  padding: 24px;
  margin: 0px 0px 20px;
}
.content_tables {
  padding-top: 10px;
}
</style>
