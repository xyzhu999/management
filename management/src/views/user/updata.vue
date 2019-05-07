<template>
  <div>
    <pan-thumb :image="image" />

    <el-button type="primary" icon="upload" style="position: absolute;margin-left: 40px;" @click="imagecropperShow=true">
      Change Avatar
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="50"
      :height="50"
      url="http://123.206.55.50:11000/upload"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
    <div class="app-container">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ImageCropper,
    PanThumb,
    UploadExcelComponent
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      userId: '',
      userName: '',
      userPwd: '',
      identityId: '',
      avatarImg: '',
      tableData: [],
      tableHeader: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.getInfo()
    this.userId = this.userInfo.user_id
  },
  methods: {
    ...mapActions({
      set_user: 'user/set_user',
      getInfo: 'user/getInfo'
    }),
    cropSuccess(e) {
      this.image = e[0].path
      this.imagecropperShow = false
      this.set_user({ user_id: this.userId })
    },
    close() {
      this.imagecropperShow = false
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
