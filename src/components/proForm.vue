<!--
 * @Author: YangLiwei
 * @Date: 2021-03-30 11:30:01
 * @LastEditTime: 2022-11-22 13:05:08
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\proForm.vue
 * @Description: 
-->
<template>
  <ProPanel
    :width="width"
    :visible="visible"
    :title="title"
    :destroyOnClose="true"
    @cancel="cancelFunc"
    @ok="submitFunc"
    :confirmLoading="loading"
    :use-drawer="useDrawer"
    :no-drawer-or-modal="noDrawerOrModal"
  >
    <Form ref="formref" layout="vertical" :model="formModel">
      <Row :gutter="16">
        <template v-for="item in columns" :key="item.dataIndex">
          <!-- 如果不显示或者满足条件的才显示 -->
          <Col
            v-if="
              !item.notShowInAddOrEdit &&
              (item.condition ? item.condition(formModel) : true)
            "
            :span="item.span ? item.span : colSpan"
          >
            <FormItem
              :name="item.dataIndex"
              :label="item.title"
              :rules="makeRule(item)"
            >
              <lookField
                :value="formModel[item.dataIndex]"
                v-bind="item"
                v-if="formModel.ylwType == 'look'"
              />
              <!-- 如果有插槽 -->
              <template v-else-if="item.slot">
                <slot
                  :name="item.slot"
                  :column="item"
                  :formModel="formModel"
                ></slot>
              </template>
              <!-- 如果是数组 -->
              <template v-else-if="item.isArray">
                <ArrayField 
                 v-bind="item" 
                 v-model:value="formModel[item.dataIndex]"
                 :disabled="item.disabled || (item.disabledFunc ? item.disabledFunc(formModel) : false)"
                  />
              </template>
              <!-- 如果是tree -->
              <ProField
                v-else-if="item.type == 'tree'"
                class="ant-input-affix-wrapper"
                v-model:selectedKeys="formModel[item.dataIndex]"
                v-model:checkedKeys="formModel[item.dataIndex]"
                v-bind="item"
                :disabled="item.disabled || (item.disabledFunc ? item.disabledFunc(formModel) : false)"
              />
              <!-- 如果是switch,需要传递checked -->
              <ProField
                v-else-if="item.type == 'switch'"
                v-model:checked="formModel[item.dataIndex]"
                v-bind="item"
                :disabled="item.disabled || (item.disabledFunc ? item.disabledFunc(formModel) : false)"
                @change="
                  (...value: any) => {
                    item.onChangeValue
                      ? item.onChangeValue(formModel, ...value)
                      : null;
                  }
                "
              />
              <!-- 只需要传递value -->
              <ProField
                v-else
                v-model:value="formModel[item.dataIndex]"
                v-bind="item"
                :disabled="item.disabled || (item.disabledFunc ? item.disabledFunc(formModel) : false)"
                @change="
                  (...value: any) => {
                    item.onChangeValue
                      ? item.onChangeValue(formModel, ...value)
                      : null;
                  }
                "
              />
              <span v-if="item.tips" v-html="item.tips" style="color:#878787; margin-top: 5px; display: inline-block;" ></span>
            </FormItem>
          </Col>
        </template>
        <Col v-if="noDrawerOrModal" :span="colSpan">
          <Button type="default" @click="cancelFunc" style="margin-right:10px" >取消</Button>
          <Button type="primary" @click="submitFunc">提交</Button>
        </Col>
        <Col v-if="slots" :span="colSpan">
          <slot :formModel="formModel"></slot>
        </Col>
      </Row>
    </Form>
  </ProPanel>
</template>
<script lang="ts">
  export default {
    name: "proForm",
    components: { ArrayField }
}
</script>
<script lang="ts" setup>
import useForm from "../hooks/useForm";
import ProField from "./proField";
import { Form, FormItem, Row, Col, Button } from "ant-design-vue";
import ProPanel from "./proPanel";
import { Prop, useSlots } from 'vue';
import { columnItem } from "../types";
import lookField from './lookField';
import ArrayField from "./ArrayField";

const slots = !!useSlots().default;

const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
  visible: {
    type: Boolean,
    default: () => false,
  },
  data: {
    type: Object,
    default: () => null,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  width: {
    type: [Number, String],
    default: () => 800,
  },
  columns: {
    type: Array,
    required: true,
    default: () => [],
  } as Prop<columnItem[]>,
  useDrawer: {
    type: Boolean,
    default: () => true,
  },
  colSpan: {
    type: Number,
    default: () => 12,
  },
  cancelFunc: {
    type: Function,
    default: () => null,
  },
  noDrawerOrModal: {
    type: Boolean,
    default: () => false,
  },
});
const emit = defineEmits(["update:visible", "update:data", "ok"]);


const submitFunc = () => {
  formModel.value.ylwType == "look" ? cancel() : submit();
};

const cancelFunc = () => {
  cancel();
  props.cancelFunc();
};

const { formref, formModel, submit, cancel, makeRule } = useForm(
  emit,
  props,
  props.columns
);
</script>
