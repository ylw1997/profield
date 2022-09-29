<!--
 * @Author: YangLiwei
 * @Date: 2021-05-16 13:26:30
 * @LastEditTime: 2022-09-29 09:28:17
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\searchForm.vue
 * @Description: 
-->
<template>
  <div>
    <Form ref="formref" :model="formModel">
      <Row :gutter="[24, 0]">
        <template v-for="item in column" :key="item.dataIndex">
          <Col v-if="!item.notShowInSearch" :span="colSpan">
            <FormItem :label="item.title">
              <!-- v-model会自动作为prop传入子组件最外层，v-bind 会把整个对象作为prop传入子组件-->
              <ProField
                v-model:value="formModel[item.dataIndex]"
                v-bind="item"
              />
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
              <Button :loading="loading" @click="search" type="primary"
                >查询</Button
              >
              <Button @click="reset" type="default">重置</Button>
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
import { useSlots, watch } from "vue";
import useForm from "../hooks/useForm";
import { convertFormDataToData } from "../utils/form";

const slots = !!useSlots().default;
const props = defineProps({
  column: {
    type: Array,
    default: () => [],
  } as any,
  loading: {
    type: Boolean,
    default: false,
  },
  colSpan: {
    type: Number,
    default: () => 6,
  },
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
