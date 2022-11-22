<!--
 * @Author: YangLiwei
 * @Date: 2021-05-16 13:26:30
 * @LastEditTime: 2022-11-22 17:36:21
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\searchForm.vue
 * @Description: 
-->
<template>
  <div>
    <Form ref="formref" :model="formModel">
      <Row :gutter="[24, 0]">
        <template v-for="item in columnFilter" :key="item.dataIndex">
          <Col v-if="!item.notShowInSearch" :span="colSpan">
          <FormItem v-if="!item.searchRangeField" :label="item.title">
            <!-- v-model会自动作为prop传入子组件最外层，v-bind 会把整个对象作为prop传入子组件-->
            <ProField v-model:value="formModel[item.dataIndex]" v-bind="item" />
          </FormItem>
          <FormItem v-else :label="item.title">
            <Space>
              <ProField v-model:value="formModel[item.searchRangeField[0]]" v-bind="item" />
              -
              <ProField v-model:value="formModel[item.searchRangeField[1]]" v-bind="item" />
            </Space>
          </FormItem>
          </Col>
        </template>
        <!-- 作用域插槽 -->
        <Col v-if="slots" :span="colSpan">
        <slot :formModel="formModel"></slot>
        </Col>
        <Col :span="colSpan">
        <FormItem>
          <Space>
            <Button :loading="loading" @click="search" type="primary">查询</Button>
            <Button @click="reset" type="default">重置</Button>
            <Button @click="isFold = !isFold" v-if="showProSearch" type="default"> 
              <DownOutlined v-if="isFold"/>
              <UpOutlined v-else />
              高级搜索</Button>
          </Space>
        </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script lang="ts">
export default {
  name: "searchForm",
}
</script>
<script lang="ts" setup>
import ProField from "./proField";
import { Form, FormItem, Space, Button, Row, Col } from "ant-design-vue";
import { useSlots, watch, Prop, ref, computed } from 'vue';
import useForm from "../hooks/useForm";
import { convertFormDataToData } from "../utils/form";
import { columnItem } from '../types/index';
import {UpOutlined,DownOutlined}from "@ant-design/icons-vue"
const slots = !!useSlots().default;
const props = defineProps({
  column: {
    type: Array,
    default: () => [],
  } as Prop<columnItem[]>,
  loading: {
    type: Boolean,
    default: false,
  },
  colSpan: {
    type: Number,
    default: () => 6,
  },
});

const isFold = ref(true);

const columnFilter = computed(() => {
  const carr = props.column ? props.column : [];
  return isFold.value ? carr.filter(item => !item.searchFold) : carr;
});

const showProSearch = computed(() => {
  return props.column?props.column.some(item => item.searchFold):false;
});

const emit = defineEmits(["search", "reset", "changeData"]);

const { formref, formModel, reset, search } = useForm(
  emit,
  props,
  props.column
);
watch(
  formModel,
  (val) => {
    // 转换日期等数据
    const obj = convertFormDataToData(val, props.column);
    emit("changeData", obj);
  },
  {
    deep: true,
  }
);
</script>
