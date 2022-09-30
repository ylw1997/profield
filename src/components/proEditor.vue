<!--
 * @Author: YangLiwei
 * @Date: 2022-07-18 15:15:38
 * @LastEditTime: 2022-09-30 11:48:47
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\proEditor.vue
 * @Description: 
-->
<template>
  <div class="yeditor">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="{}" mode="default" />
    <Editor style="height: calc(100% - 100px); overflow-y: hidden" v-model="content" :defaultConfig="editorConfig"
      mode="default" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>
<script lang="ts">
export default {
  name: "proEditor",
}
</script>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"; // 引入 css
import { shallowRef, ref, watch, Prop } from 'vue';
import { AxiosResponse } from "axios";
const editorRef = shallowRef();
const props = defineProps({
  value: {
    type: String,
    default: () => "",
  },
  uploadFunc: {
    type: Function,
    default: () => { },
  } as Prop<(file: File) => Promise<AxiosResponse<any, any>>>,
});

// 自定义上传函数
const customUpload = async (file: File, insertFn: any) => {
  if (props.uploadFunc) {
    const res = await props.uploadFunc(file);
    insertFn(res.data.data.url, res.data.data.name);
  } else {
    console.error("请传入上传函数");
  }
};


const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      customUpload
    },
    uploadVideo: {
      customUpload,
    },
  },
};


const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};


watch(props, (val) => {
  content.value = val.value;
});

const emits = defineEmits(["update:value"]);

//改变
const handleChange = (editor: any) => {
  emits("update:value", editor.getHtml());
};

const content = ref("");
</script>
<style lang="less">
.yeditor {
  border: 1px solid #ccc;
  height: calc(100% - 100px);
  height: 100%;
}
</style>
