<!--
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-12-08 17:05:59
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\App.vue
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
-->

<template>
  <div>
    <proTable v-model:columns="columns" v-model:rowskeys="rowskeys" row-key="id" :dataSource="dataSource"
      :pagination="false" select-type="radio" :scroll="{ x: 1000 }" @changeData="search" @search="search"
      :default-search-data="{
        tel: '123123123'
      }" v-model:default-column-selected="defaultColumn">
      <template #actionLeft>
        <Button @click="addFunc" type="primary">新增规格</Button>
        <Button type="primary" @click="clearRowsKeys">清空选择</Button>
        <Button type="primary" @click="changeColumn">改变字段</Button>
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
    <proForm :width="1000" title="商品管理" v-model:visible="visible" :data="modelData" 
      @ok="ModelOk"
      :columns="columns"
      @change-data="changeData"
      >
    </proForm>
  </div>
</template>

<script setup lang="ts">
import { timeFormat, useModel } from "./index"
import { columnItem } from "./index"
import { ref, watchEffect } from 'vue';
import proTable from "./components/proTable"
import { Button, Space } from "ant-design-vue"
import proForm from "./components/proForm.vue"
// import YUpload from "./components/YUpload"

const rowskeys = ref([])

const search = (data: any) => {
  console.log(data)
}

const defaultColumn = ref<string[]|undefined>(undefined)

const changeColumn = () => {
  defaultColumn.value = ["resellerName", "tel"]
}

const columns = ref<columnItem[]>([
  {
    title: "分销商id",
    dataIndex: "id",
    notShowInAddOrEdit: true,
    notShowInSearch: true,
    notShowInTable: true,
  },
  { title: "分销商名称", dataIndex: "resellerName", required: true, ValidateType: "any", isArray: true },
  {
    title: "appId",
    dataIndex: "appId",
    required: true,
    condition: ({ ylwType }) => ylwType === "add",
    notShowInSearch: true,
  },
  {
    title: "联系人电话",
    dataIndex: "tel",
    
    required: true,
    // disabledFunc: (FormData: any) => {
    //   console.log(FormData)
    //   return false;
    // }
  },
  {
    title: "上传",
    dataIndex: "upload",
    type: "YUpload",
    notShowInSearch: true,
    listType: "picture-card",
    onChangeValue: (_, data) => {
      console.log(_, data)
    },
    onPreview: (value: any) => {
      console.log(value);
    },
    tips: "123",
    width: 100,
  },
  {
    title: "备注",
    showField: "showRemark",
    dataIndex: "remark",
    searchRangeField: ["remarkStart", "remarkEnd"],
    searchFold: true,
    notShowInSearch: false,
    notShowInTable: true,
  },
  {
    title: "创建时间",
    dataIndex: "creationTime",
    type: "dateTime",
    notShowInAddOrEdit: true,
    customRender: ({ text }) => timeFormat(text, "YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "状态",
    dataIndex: "enabledFlag",
    type: "select",
    options: [],
    notShowInAddOrEdit: true,
    searchRangeField: ["remarkStart", "remarkEnd"],
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

const uploadstr = ref("https://aloha-qa.walmartmobile.cn/esb/object/commonImage/showImageByTemplate/NWQ1OWQwYzUtN2NiYi00YzE2LThjZTktNDM1YWFhMzc3NDZhXzQzNzQyMDIwMDYwODEzNTgzMDgyOS5qcGc=")

const dataSource = ref([
  {
    key: "1",
    id: "1",
    resellerName: '["张三","李四"]',
    appId: "123",
    tel: "123456789",
    // showRemark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
    upload: "https://oss.qmsznj.com/test/2022/12/01/842768d9-0200-413b-86d5-c32cb180ea66_20221201195315A003.jpg,https://oss.qmsznj.com/test/2022/12/01/c2bf89fd-216f-4a7b-8603-669db1cd847f_20221201195315A002.jpg"
  },
  {
    key: "2",
    id: "2",
    resellerName: '["张三"]',
    appId: "123",
    tel: "123456789",
    showRemark: "备注",
    creationTime: "2021-09-26 14:10:44",
    enabledFlag: "1",
  }
])


const { visible, modelData, add, edit, look } = useModel(columns.value as any);

const data = ref()

const changeData = (val:any)=>{
  console.log("changeData",val)
  data.value = val
}

const ModelOk = (data: any) => {
  console.log(data)
}

const clearRowsKeys = () => {
  rowskeys.value = []
}

const addFunc = () => {
  add()
}

</script>