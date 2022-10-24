<!--
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-10-24 15:02:06
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\App.vue
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
-->

<template>
  <div>
    <proTable  v-model:columns="columns" :dataSource="dataSource"
      :pagination="false" rowKey="key" :rowskeys="false">
      <template #actionLeft>
        <Button @click="visible = true" type="primary">新增规格</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'action'">
          编辑
        </template>
      </template>
      <template #columnSelectTitleRight="data">
        <Space>
          <Button size="small" type="primary" @click="setDefault(data)">设为默认</Button>
          <Button size="small">恢复默认</Button>
        </Space>
      </template>
    </proTable>
    <proForm :width="1000" title="商品管理" v-model:visible="visible" v-model:data="modelData" @ok="ModelOk"
      :columns="columns">
    </proForm>
  </div>
</template>

<script setup lang="ts">
import { timeFormat, useModel } from "./index"
import { columnItem } from "./index"
import { ref } from 'vue';
import proTable from "./components/proTable"
import { Button, Space } from "ant-design-vue"
import proForm from "./components/proForm.vue"
import ArrayField from "./components/ArrayField"

const defaultColumnSelected = ref(['id', 'resellerName'])
const b = ref(['2134', '145s'])

const columns = ref<columnItem[]>([
  {
    title: "分销商id",
    dataIndex: "id",
    notShowInAddOrEdit: true,
    notShowInSearch: true,
  },
  { title: "分销商名称", dataIndex: "resellerName", required: true, ValidateType:"any",isArray:true },
  {
    title: "appId",
    dataIndex: "appId",
    required: true,
    condition: ({ ylwType }) => ylwType === "add",
  },
  {
    title: "联系人电话",
    type: "select",
    dataIndex: "tel",
    slot: 'tel',
    ValidateType:"any",
    required: true,
    isArray:true
  },
  {
    title: "备注",
    type: "textarea",
    dataIndex: "remark",
    notShowInTable: true,
    notShowInSearch: true,
  },
  {
    title: "创建时间",
    dataIndex: "creationTime",
    type: "dateTime",
    notShowInAddOrEdit: true,
    notShowInSearch: true,
    customRender: ({ text }) => timeFormat(text, "YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "状态",
    dataIndex: "enabledFlag",
    type: "select",
    options: [],
    notShowInAddOrEdit: true,
  },
  {
    title: "操作",
    dataIndex: "action",
    notShowInSearch: true,
    notShowInAddOrEdit: true,
    fixed: "right",
  },
]);

const setDefault = (data: any) => {
  // defaultColumnSelected.value = ['id', 'resellerName']
  console.log(data.value)
}

const dataSource = ref([
  {
    key: "1",
    id: "1",
    resellerName: "张三",
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
  {
    key: "2",
    id: "2",
    resellerName: "李四",
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
  {
    key: "3",
    id: "3",
    resellerName: "王五",
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
  {
    key: "4",
    id: "4",
    resellerName: "赵六",
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
  {
    key: "5",
    id: "5",
    resellerName: "田七",
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
  {
    key: "6",
    id: "6",
    resellerName: "孙八",
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
  {
    key: "7",
    id: "7",
    resellerName: "周九",
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
])


const { visible, modelData, add, edit } = useModel(columns as any);

const ModelOk = (data: any) => {
  console.log(data,b.value,defaultColumnSelected.value)
}
</script>