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
        :data="commentData"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="allComments"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fansComments"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
