<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" label-width="40px" size='small'>
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(item, index) in channels" :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateRange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticleList(1)">筛选</el-button>
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
            <el-image
              :src="scope.row.cover.images[0]"
              class="article-cover"
              fit="cover"
              lazy
            >
              <div slot="placeholder" class="image-slot">
                加载中...
              </div>
            </el-image>
            <!-- <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]">
            <img
              v-else
              class="article-cover"
              src="./no-cover.png"> -->
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
        layout="prev, pager, next, jumper"
        @current-change="onCurrentChange"
        :total="totalCount"
        :page-size="perPage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList, getArticleChannel } from 'api/article.js'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      articleList: [], // 文章列表
      articleStatus: [ // 文章状态
        { text: '草稿', type: 'warning' }, // status: 0
        { text: '待审核', type: '' }, // status: 1
        { text: '审核通过', type: 'success' }, // status: 2
        { text: '审核失败', type: 'danger' }, // status: 3
        { text: '已删除', type: 'info' } // status: 4
      ],
      totalCount: 0, // 文章总数
      perPage: 10, // 默认每页 10 条
      status: null, // 默认查询所有状态
      channelId: null, // 默认查询所有频道
      channels: [], // 频道
      dateRange: [] // 日期范围
    }
  },
  created() {
    this.loadArticleChannel()
    this.loadArticleList(1)
  },
  methods: {
    async loadArticleList(page) {
      try {
        const res = await getArticleList({
          page: page, // 查询第几页
          per_page: this.perPage, // 每页多少条
          status: this.status, // 查询哪种文章状态
          channel_id: this.channelId, // 查询哪个频道
          begin_pubdate: this.dateRange ? this.dateRange[0] : null, // 开始日期
          end_pubdate: this.dateRange ? this.dateRange[1] : null // 结束日期
        })
        const { results, total_count: totalCount } = res.data.data
        this.articleList = results
        this.totalCount = totalCount
      } catch (ex) {
        console.log(ex)
      }
    },
    async loadArticleChannel() {
      try {
        const res = await getArticleChannel()
        this.channels = res.data.data.channels
      } catch (ex) {
        console.log(ex)
      }
    },
    onCurrentChange(page) {
      this.loadArticleList(page, this.perPage)
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
    .image-slot {
      text-align: center;
    }
  }
}
</style>
