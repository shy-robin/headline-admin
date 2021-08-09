<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="articleList"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="评论状态"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.comment_status ? '正常' : '关闭' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.disableSwitch"
              @change="onSwitch(scope.row.id, scope.row.comment_status, scope.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px;"
        background
        layout="prev, pager, next, jumper"
        :total="totalCount"
        :current-page.sync="page"
        @current-change="loadArticleList(page)"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from 'api/article.js'
import { updateCommentStatus } from 'api/comment.js'

export default {
  name: 'CommentIndex',
  data() {
    return {
      articleList: [], // 文章列表
      totalCount: 0, // 文章总数
      page: 1 // 当前页
    }
  },
  created() {
    this.loadArticleList()
  },
  methods: {
    async loadArticleList(page) {
      try {
        const res = await getArticleList({
          response_type: 'comment',
          page
        })
        const { results: articleList, total_count: totalCount } = res.data.data
        articleList.forEach(item => { // 给每条数据增加 disableSwitch 属性
          item.disableSwitch = false
        })
        this.articleList = articleList
        this.totalCount = totalCount
      } catch (ex) {
        console.log(ex)
      }
    },
    async onSwitch(articleId, allowComment, index) {
      this.articleList[index].disableSwitch = true // 禁用开关
      try {
        await updateCommentStatus(articleId.toString(), allowComment)
        this.loadArticleList(this.page)
        this.$msgSuccess(`${allowComment ? '开启评论' : '关闭评论'}成功！`)
        this.articleList[index].disableSwitch = false // 解禁开关
      } catch (ex) {
        this.$msgError(`${allowComment ? '开启评论' : '关闭评论'}失败！`)
        this.articleList[index].disableSwitch = false // 解禁开关
        console.log(ex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
