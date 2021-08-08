<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="60px">
        <el-form-item label="标题" required>
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" required>
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="(item, index) in channels" :key='index'
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannel,
  publishArticle
} from 'api/article.js'

export default {
  name: 'PublishIndex',
  data() {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型（-1: 自动，0: 无图，1: 单图，3: 三图）
          images: []
        },
        channel_id: null // 文章频道，默认不选择
      },
      channels: [] // 所有频道
    }
  },
  created() {
    this.loadArticleChannel()
  },
  methods: {
    async loadArticleChannel() {
      try {
        const res = await getArticleChannel()
        this.channels = res.data.data.channels
      } catch (ex) {
        console.log(ex)
      }
    },
    async onPublish(draft) {
      try {
        await publishArticle(this.article, draft)
        this.$msgSuccess('文章发布成功！')
      } catch (ex) {
        this.$msgError('文章发布失败！')
        console.log(ex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
