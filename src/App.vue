<!--
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-11-02 14:39:12
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
        <Button @click="add" type="primary">新增规格</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'action'">
          <a @click="edit(record)">编辑</a>
          <a @click="look(record)">查看</a>
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
    dataIndex: "tel",
    ValidateType:"any",
    required: true,
    disabledFunc: ({ ylwType }) => ylwType === "add",
  },
  {
    title:"上传",
    dataIndex:"YU",
    type:"YUpload",
    notShowInTable:true,
    notShowInSearch:true,
    onChangeValue:(_,data)=>{
      console.log(_,data)
    }
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
    resellerName: '["张三","李四"]',
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  },
  {
    key: "2",
    id: "2",
    resellerName: '["张三"]',
    appId: "123",
    tel: "123456789",
    remark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  }
])


const { visible, modelData, add, edit,look } = useModel(columns.value as any);

const ModelOk = (data: any) => {
  console.log(data,b.value,defaultColumnSelected.value)
}
</script>