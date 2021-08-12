<template>
<div>
  <quill-editor
    class="editor"
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @change='onEditorChange($event)'/>
</div>
</template>

<script>
/* eslint-disable */
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进  2
  [{ color: [ // 字体颜色
        '#ffffff',
        '#ffd7d5',
        '#ffdaa9',
        '#fffed5',
        '#d4fa00',
        '#73fcd6',
        '#a5c8ff',
        '#ffacd5',
        '#ff7faa',
        '#d6d6d6',
        '#ffacaa',
        '#ffb995',
        '#fffb00',
        '#73fa79',
        '#00fcff',
        '#78acfe',
        '#d84fa9',
        '#ff4f79',
        '#b2b2b2',
        '#d7aba9',
        '#ff6827',
        '#ffda51',
        '#00d100',
        '#00d5ff',
        '#0080ff',
        '#ac39ff',
        '#ff2941',
        '#888888',
        '#7a4442',
        '#ff4c00',
        '#ffa900',
        '#3da742',
        '#3daad6',
        '#0052ff',
        '#7a4fd6',
        '#d92142',
        '#000000',
        '#7b0c00',
        '#ff0000',
        '#d6a841',
        '#407600',
        '#007aaa',
        '#021eaa',
        '#797baa',
        '#ab1942',
      ]}],
  [{
    background: [ // 背景颜色
        '#ffffff',
        '#ffd7d5',
        '#ffdaa9',
        '#fffed5',
        '#d4fa00',
        '#73fcd6',
        '#a5c8ff',
        '#ffacd5',
        '#ff7faa',
        '#d6d6d6',
        '#ffacaa',
        '#ffb995',
        '#fffb00',
        '#73fa79',
        '#00fcff',
        '#78acfe',
        '#d84fa9',
        '#ff4f79',
        '#b2b2b2',
        '#d7aba9',
        '#ff6827',
        '#ffda51',
        '#00d100',
        '#00d5ff',
        '#0080ff',
        '#ac39ff',
        '#ff2941',
        '#888888',
        '#7a4442',
        '#ff4c00',
        '#ffa900',
        '#3da742',
        '#3daad6',
        '#0052ff',
        '#7a4fd6',
        '#d92142',
        '#000000',
        '#7b0c00',
        '#ff0000',
        '#d6a841',
        '#407600',
        '#007aaa',
        '#021eaa',
        '#797baa',
        '#ab1942',
      ]}],
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小 2
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ font: [] }], // 字体种类 2
  [{ direction: 'rtl' }], // 文本方向  2
  [{ align: [] }], // 对齐方式 2
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'], // 链接、图片、视频
];
// 标题
const titleConfig = {
  'ql-bold':'加粗',
  'ql-color':'颜色',
  'ql-font':'字体',
  'ql-code':'插入代码',
  'ql-italic':'斜体',
  'ql-link':'添加链接',
  'ql-background':'背景颜色',
  'ql-size':'字体大小',
  'ql-strike':'删除线',
  'ql-script':'上标/下标',
  'ql-underline':'下划线',
  'ql-blockquote':'引用',
  'ql-header':'标题',
  'ql-indent':'缩进',
  'ql-list':'列表',
  'ql-align':'文本对齐',
  'ql-direction':'文本方向',
  'ql-code-block':'代码块',
  'ql-formula':'公式',
  'ql-image':'图片',
  'ql-video':'视频',
  'ql-clean':'清除字体样式',
  'ql-upload':'文件',
};
export default {
  name: 'MyQuillEditor',
  components: {
    quillEditor
  },
  data() {
    return {
      content: ``, // 富文本编辑器默认内容
      editorOption: {
        //  富文本编辑器配置
        modules: {
          //工具栏定义的
          toolbar: toolbarOptions
        },
        //主题
        theme: "snow",
        placeholder: "请输入正文"
      },
    }
  },
  methods: {
    // //失去焦点事件
    // onEditorBlur(quill) {
    //   console.log('editor blur!', quill)
    // },
    // //获得焦点事件
    // onEditorFocus(quill) {
    //   console.log('editor focus!', quill)
    // },
    // // 准备富文本编辑器
    // onEditorReady(quill) {
    //   console.log('editor ready!', quill)
    // },
    //内容改变事件
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    // 添加中文标题，鼠标悬停图标时显示
    addQuillTitle () {
      const oToolBar = document.querySelector('.ql-toolbar'),
      aButton = oToolBar.querySelectorAll('button'),
      aSelect =  oToolBar.querySelectorAll('select');
      aButton.forEach(function(item){
        if(item.className === 'ql-script'){
            item.value === 'sub' ? item.title = '下标': item.title = '上标';
        }else if(item.className === 'ql-indent'){
            item.value === '+1' ? item.title ='向右缩进': item.title ='向左缩进';
        }else{
            item.title = titleConfig[item.classList[0]];
        }
      });
      aSelect.forEach(function(item){
          item.parentNode.title = titleConfig[item.classList[0]];
      });
    },
  },
  mounted() {
    this.addQuillTitle()
  },
}
</script>

<style lang="scss">
.ql-container {
  height: 500px;
}
.editor {
  line-height: normal !important;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
