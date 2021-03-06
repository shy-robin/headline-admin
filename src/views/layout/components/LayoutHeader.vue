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
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#fff"
        :background-color="themeColor"
        text-color="#fff"
      >
        <el-submenu index="theme">
          <template slot="title">主题</template>
          <!-- 注意传入的 index 必须是字符串 -->
          <el-menu-item
            v-for="(item, index) in colors" :key="index"
            :index="index.toString()"
          >
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="user">
          <template slot="title">
            <el-image
              class="avatar"
              fit="cover"
              :src="userInfo.photo"
            ></el-image>{{ userInfo.name }}
          </template>
          <el-menu-item index="setting">设置</el-menu-item>
          <el-menu-item index="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from 'api/user.js'
import EventBus from 'utils/bus.js'
import { mapState, mapMutations } from 'vuex'

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
    EventBus.$on('avatarUpdated', photo => {
      this.userInfo.photo = photo
    })
    EventBus.$on('profileUpdated', ({ name, email }) => {
      this.userInfo.name = name
      this.userInfo.email = email
    })
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
    },
    handleSelect(index, path) {
      switch (path[0]) {
        case 'theme':
          index = parseInt(index) // 注意 index 要转换成数字
          // 存到 localStorage
          window.localStorage.setItem('themeColor', this.colors[index].color)
          this.changeColor(parseInt(index)) // 切换颜色
          break
        case 'user':
          switch (path[1]) {
            case 'setting':
              console.log('setting')
              break
            case 'logout':
              this.onLogout()
              break
          }
          break
      }
    },
    ...mapMutations('themeMod', ['changeColor'])
  },
  computed: {
    ...mapState('themeMod', ['colors', 'themeColor'])
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    color: #fff;
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
    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
}
</style>
