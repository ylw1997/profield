/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-10-18 10:32:43
 * @LastEditTime: 2022-10-19 10:39:44
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\ColumnPicker.tsx
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import { Popover } from "ant-design-vue";
import { defineComponent, Prop, ref, computed } from 'vue';
import { columnItem } from "../types";
import { FunnelPlotOutlined } from "@ant-design/icons-vue"
import { Transfer } from "ant-design-vue"
import { TransferItem } from "ant-design-vue/lib/transfer";


export default defineComponent({
  name: "ColumnPicker",
  props: {
    columns: {
      type: Array,
      default: () => [],
    } as Prop<columnItem[]>,
    defaultSelected: {
      type: Array,
      default: () => [],
    } as Prop<string[]>,
  },
  emits: ["change"],
  setup(props, { slots, emit }) {
    const visible = ref<boolean>(false);
    const transferData = computed<TransferItem[]>(() => props.columns ? props.columns.map((item) => {
      return {
        key: item.dataIndex,
        title: item.title,
        disabled: item.notShowInTable
      }
    }) : []);

    const selectKeys = ref([]);
    const targetKeys = ref(props.defaultSelected)

    // 选择改变
    const change = (targetKeys: string[]) => {
      if (props.columns) {
        const columns = targetKeys.map((item) => {
          return props.columns!.find((column) => column.dataIndex === item)
        }).filter((item) => item != undefined);
        emit("change", {columns,targetKeys});
      }
    }

    return () => {
      return (
        <Popover
          v-model:visible={visible.value}
          trigger="click"
          placement="bottomRight"
          v-slots={{
            title: () => (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span>选择表格字段</span>
                {slots.titleRight ? slots.titleRight(targetKeys) : null}
              </div>
            ),
            content: () => (
              <Transfer
                dataSource={transferData.value}
                render={item => item.title}
                showSearch
                v-model:targetKeys={targetKeys.value}
                v-model:selectedKeys={selectKeys.value}
                listStyle={{
                  width: "250px",
                  height: "300px"
                }}
                operations={['移入', '移出']}
                onChange={change}
              />
            )
          }}
        >
          <FunnelPlotOutlined />
        </Popover>
      );
    };
  }
});