<!--
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-10-18 14:17:19
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\App.vue
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
-->

<template>
  <div style="padding: 10px;">
    <proField type="text"></proField>
    <look value="123" type="money"></look>
    <proTable v-model:defaultColumnSelected="defaultSelected" v-model:columns="columns" :dataSource="dataSource">
    </proTable>
  </div>
</template>

<script setup lang="ts">
import { proField } from "./index"
import { columnItem } from "./index"
import { ref } from 'vue';
import look from "./components/lookField"
import proTable from "./components/proTable"

const defaultSelected = ref(['name', 'age'])

const columns = ref<columnItem[]>([
  {
    title: '姓名',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    valueType: 'money',
  },
  {
    title: '地址',
    dataIndex: 'address',
    valueType: 'text',
  },
  {
    title: '操作',
    dataIndex: 'action',
    valueType: 'option',
    notShowInSearch: true,
    notShowInAddOrEdit: true,
  },
])

const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
])
</script>