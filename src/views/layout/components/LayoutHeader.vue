<template>
  <div class="header-container">
    <div class="left">
      <i
        :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
        @click="foldMenu"
      ></i>
      <span class="greeting">{{ userInfo.email }}</span>
    </div>
    <div class="right">
      <el-dropdown>
        <div class="el-dropdown-link">
          <img
            class="avatar"
            :src="userInfo.photo"
          >
          <span>
            {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from 'api/user.js'
import EventBus from 'utils/bus.js'

export default {
  name: 'LayoutHeader',
  data() {
    return {
      userInfo: {}, // 用户个人信息
      isCollapse: false
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const res = await getUserProfile()
        this.userInfo = res.data.data
      } catch (ex) {
        console.log(ex)
      }
    },
    foldMenu() {
      this.isCollapse = !this.isCollapse
      EventBus.$emit('foldMenu')
    },
    async onLogout() {
      try {
        await this.$warningBox('确认退出吗？', '提示')
        window.localStorage.removeItem('user') // 删除 token
        this.$router.push({ name: 'login' }) // 跳转到登录页
        this.$msgSuccess('退出成功！')
      } catch (ex) {
        this.$msgNormal('已取消操作！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    i {
      cursor: pointer;
      font-size: 25px;
    }
    .greeting {
      margin-left: 10px;
    }
  }
  .right {
    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }
}
</style>
