<!--
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-10-09 15:51:49
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\App.vue
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
-->
<script setup lang="ts">
import { proField } from "./index"
import { columnItem } from "./index"
import { ref } from 'vue';
import look from "./components/lookField"
</script>

<template>
  <div>
    <proField type="text"></proField>
    <look value="123" type="money" ></look>
  </div>
</template>