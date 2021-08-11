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
      <el-form
        ref="form"
        :model="article"
        label-width="60px"
        :rules="rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
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
          <div
            style="display:flex;"
            v-if="article.cover.type > 0"
          >
            <!-- 组件中 v-model 的使用
                 如：v-model="article"
                 相当于：
                 1. 默认给子组件传递一个名为 value 的数据， :value="article"
                 2. 默认监听名为 input 的事件，@input="article=[参数]"
            -->
            <upload-cover
              v-for="(item, index) in article.cover.type" :key="item"
              v-model="article.cover.images[index]"
            ></upload-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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

import UploadCover from './components/UploadCover.vue'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
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
      ],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '请输入 5-30 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入内容'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
      }
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
    onPublish(draft) {
      const self = this
      this.$refs.form.validate(async function(valid) {
        if (!valid) return false
        if (self.$route.query.id) { // 查询参数有 id，表示编辑文章页面
          try {
            await updateArticle(self.$route.query.id, self.article, draft)
            self.$msgSuccess(`${draft ? '存入草稿' : '修改文章'}成功！`)
            self.$router.push({ name: 'article' }) // 修改成功，跳转到文章列表
          } catch (ex) {
            self.$msgError(`${draft ? '存入草稿' : '修改文章'}失败！`)
            console.log(ex)
          }
        } else { // 否则，表示发布文章页面
          try {
            await publishArticle(self.article, draft)
            self.$msgSuccess(`${draft ? '存入草稿' : '发布文章'}成功！`)
            self.$router.push({ name: 'article' }) // 发表成功，跳转到文章列表
          } catch (ex) {
            self.$msgError(`${draft ? '存入草稿' : '发布文章'}失败！`)
            console.log(ex)
          }
        }
      })
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
