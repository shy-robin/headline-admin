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
          label="状态"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.comment_status ? '正常' : '异常' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template>
            <el-button type="danger" size="mini">关闭评论</el-button>
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

export default {
  name: 'CommentIndex',
  data() {
    return {
      commentData: [
        {
          title: 'tafds',
          allComments: 111,
          fansComments: 34,
          status: 'ok',
          operation: 'button'
        },
        {
          title: 'tafds',
          allComments: 111,
          fansComments: 34,
          status: 'ok',
          operation: 'button'
        },
        {
          title: 'tafds',
          allComments: 111,
          fansComments: 34,
          status: 'ok',
          operation: 'button'
        },
        {
          title: 'tafds',
          allComments: 111,
          fansComments: 34,
          status: 'ok',
          operation: 'button'
        },
        {
          title: 'tafds',
          allComments: 111,
          fansComments: 34,
          status: 'ok',
          operation: 'button'
        }
      ],
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
        this.articleList = articleList
        this.totalCount = totalCount
      } catch (ex) {
        console.log(ex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
