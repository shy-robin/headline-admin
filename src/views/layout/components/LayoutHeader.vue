<template>
  <div class="header-container">
    <div class="left">
      <i class="el-icon-s-fold"></i>
      <span class="greeting">{{ userInfo.greeting }}</span>
    </div>
    <div class="right">
      <el-dropdown>
        <div class="el-dropdown-link">
          <img
            class="avatar"
            :src="userInfo.avatar"
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
export default {
  name: 'LayoutHeader',
  data() {
    return {
      userInfo: {
        avatar: 'https://gitee.com/gainmore/imglib/raw/master/img/20210806161701.png',
        name: 'Akina',
        greeting: '用户，你好！'
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
