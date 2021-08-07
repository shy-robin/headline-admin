<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="40px" size='small'>
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{ totalCount }} 条结果</span>
      </div>
      <el-table
        :data="articleList"
        border
        size='medium'
      >
        <el-table-column
          prop="date"
          label="封面"
        >
          <template slot-scope="scope">
            <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]">
            <img
              v-else
              class="article-cover"
              src="./no-cover.png">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          label="状态"
        >
        <!-- 如果要在自定义模板中获取当前遍历项的数据，则需要在 template 中定义 slot-scope='xxx' -->
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template>
            <el-button
              size="mini"
              type='primary'
              icon='el-icon-edit'
              circle
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon='el-icon-delete'
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from 'api/article.js'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articleList: [], // 文章列表
      articleStatus: [ // 文章状态
        { text: '草稿', type: 'warning' }, // status: 0
        { text: '待审核', type: '' }, // status: 1
        { text: '审核通过', type: 'success' }, // status: 2
        { text: '审核失败', type: 'danger' }, // status: 3
        { text: '已删除', type: 'info' } // status: 4
      ],
      totalCount: 0 // 文章总数
    }
  },
  created() {
    this.loadArticleList()
  },
  methods: {
    async loadArticleList() {
      try {
        const res = await getArticleList()
        this.articleList = res.data.data.results
        this.totalCount = res.data.data.total_count
      } catch (ex) {
        console.log(ex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  .filter-card {
    margin-bottom: 20px;
  }
  .pagination {
    padding-top: 20px;
  }
  .article-cover {
    width: 100px;
    background-size: cover;
  }
}
</style>
