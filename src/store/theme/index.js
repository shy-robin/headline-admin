const colors = [
  {
    id: 0,
    name: '蛙绿',
    color: '#248067'
  },
  {
    id: 1,
    name: '暗黑',
    color: '#1f2623'
  },
  {
    id: 2,
    name: '默认',
    color: '#545c64'
  }
]

// 获取 localStorage 的数据
let themeColor = window.localStorage.getItem('themeColor')
// 如果没数据，使用默认的颜色
if (!themeColor) {
  themeColor = colors[2].color
}

export default {
  namespaced: true, // 注册命名空间
  state: {
    colors,
    themeColor
  },
  mutations: {
    changeColor(state, index) {
      state.themeColor = state.colors[index].color
    }
  }
}
