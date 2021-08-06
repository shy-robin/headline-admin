<template>
  <div class="header-container">
    <div class="left">
      <i class="el-icon-s-fold"></i>
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
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from 'api/user.js'

export default {
  name: 'LayoutHeader',
  data() {
    return {
      userInfo: {} // 用户个人信息
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
    i {
      cursor: pointer;
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
