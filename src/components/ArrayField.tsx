/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-10-24 11:00:05
 * @LastEditTime: 2022-10-25 09:39:32
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\ArrayField.tsx
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import { defineComponent, Prop, ref, watchEffect } from "vue";
import { Button, FormItem } from "ant-design-vue";
import { MinusCircleOutlined } from "@ant-design/icons-vue";
import ProField from "./proField";

export default defineComponent({
  name: "ArrayField",
  props: {
    value: {
      type: Array,
      default: () => [],
    } as Prop<any[]>,
  },
  emits: ["update:value"],
  setup(props, { emit, attrs }) {
    const data = ref<any[]>((props.value && props.value.length > 0) ? props.value : []);
    watchEffect(() => {
      emit("update:value", data.value);
    });
    return () => (
      <div>
        <Button type="dashed"
          onClick={() => data.value.push("")}
          style="width: 100%;margin-bottom: 5px;">+ 添加</Button>
        {
          data.value.map((_, index) => <FormItem style={{ marginBottom: "0px" }} >
            <div style="display: flex;align-items: center;margin-top: 10px;">
              <ProField {...attrs} v-model:value={data.value[index]}/>
              <MinusCircleOutlined onClick={() => data.value.splice(index, 1)} style="margin-left: 10px;font-size: large;" />
            </div>
          </FormItem>)
        }
      </div>
    );
  }
});