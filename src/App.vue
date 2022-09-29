<!--
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-09-29 13:56:19
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\App.vue
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
-->
<script setup lang="ts">
import { proField } from "./index"
import { columnItem } from "./index"
import { ref } from 'vue';
const columns = ref<columnItem[]>([{
  title: '分类',
  dataIndex: 'category',
  options: []
}])
</script>

<template>
  <div>
    <proField type="text"></proField>
  </div>
</template>