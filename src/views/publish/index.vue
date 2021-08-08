<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            {{ $route.query.id ? '修改文章' : '发布文章' }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="60px">
        <el-form-item label="标题" required>
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            placeholder="请输入文章内容..."
            :height="400"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
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
          <el-button type="primary" @click="onPublish(false)">
            {{ $route.query.id ? '修改' : '发表' }}
          </el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannel,
  publishArticle,
  getArticleInfo,
  updateArticle
} from 'api/article.js'

import { uploadImage } from 'api/image.js'

import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
  ListItem,
  BulletList, // (与 ListItem 一起使用)
  OrderedList, // (与 ListItem一起使用)
  TodoItem,
  TodoList, // (与 TodoItem 一起使用)
  TextAlign,
  LineHeight,
  HorizontalRule,
  HardBreak,
  TrailingNode,
  History,
  Table, // (与 TableHeader, TableCell, TableRow 一起使用)
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview,
  Print,
  Fullscreen,
  FontType,
  FontSize
} from 'element-tiptap'

import 'element-tiptap/lib/index.css'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
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
      channels: [], // 所有频道
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }), // 最多五级标题
        new FontType(),
        new FontSize(),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new Image({
          async uploadRequest(file) {
            const fd = new FormData() // 创建一个 FormData 空对象
            fd.append('image', file) // Body 需要 image 字段，对于 file 类型
            const res = await uploadImage(fd)
            return res.data.data.url // 返回图片地址
          }
        }),
        new Iframe(),
        new CodeBlock(),
        new Blockquote(),
        new TodoItem(),
        new TodoList(),
        new TextAlign(),
        new LineHeight(),
        new HorizontalRule(),
        new HardBreak(),
        new TrailingNode(),
        new History(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new FormatClear(),
        new TextColor(),
        new TextHighlight(),
        new Preview(),
        new Print(),
        new Fullscreen()
      ]
    }
  },
  created() {
    this.loadArticleChannel()
    if (this.$route.query.id) { // 如果有查询参数 id，则加载文章数据
      this.loadArticleInfo()
    }
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
      if (this.$route.query.id) { // 查询参数有 id，表示编辑文章页面
        try {
          await updateArticle(this.$route.query.id, this.article, draft)
          this.$msgSuccess(`${draft ? '存入草稿' : '修改文章'}成功！`)
          this.$router.push({ name: 'article' }) // 修改成功，跳转到文章列表
        } catch (ex) {
          this.$msgError(`${draft ? '存入草稿' : '修改文章'}失败！`)
          console.log(ex)
        }
      } else { // 否则，表示发布文章页面
        try {
          await publishArticle(this.article, draft)
          this.$msgSuccess(`${draft ? '存入草稿' : '发布文章'}成功！`)
          this.$router.push({ name: 'article' }) // 发表成功，跳转到文章列表
        } catch (ex) {
          this.$msgError(`${draft ? '存入草稿' : '发布文章'}失败！`)
          console.log(ex)
        }
      }
    },
    async loadArticleInfo() {
      try {
        const res = await getArticleInfo(this.$route.query.id)
        this.article = res.data.data
      } catch (ex) {
        console.log(ex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
