/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-10-18 10:32:43
 * @LastEditTime: 2022-11-30 16:41:38
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\ColumnPicker.tsx
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import { Button, Popover, Space } from "ant-design-vue";
import { defineComponent, Prop, ref, computed, watchEffect } from 'vue';
import { columnItem } from "../types";
import { FunnelPlotOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons-vue"
import { Transfer } from "ant-design-vue"
import { TransferItem } from "ant-design-vue/lib/transfer";
import "./ColumnPicker.less"

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
    const targetKeys = ref<string[]|undefined>([])

    watchEffect(()=>targetKeys.value = props.defaultSelected)

    // 选择改变
    const change = (targetKeys: string[]) => {
      if (props.columns) {
        const columns = targetKeys.map((item) => {
          return props.columns!.find((column) => column.dataIndex === item)
        }).filter((item) => item != undefined);
        emit("change", { columns, targetKeys });
      }
    }

    // 当前选中上移下移
    const move = (key: string, direction: "up" | "down", e: Event) => {
      e.stopPropagation();
      if (targetKeys.value && targetKeys.value.length > 1) {
        const index = targetKeys.value.findIndex((item) => item === key);
        if (direction === "up") {
          if (index > 0) {
            targetKeys.value.splice(index, 1);
            targetKeys.value.splice(index - 1, 0, key);
          }
        } else {
          if (index < targetKeys.value.length - 1) {
            targetKeys.value.splice(index, 1);
            targetKeys.value.splice(index + 1, 0, key);
          }
        }
        change(targetKeys.value);
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
                render={item => (
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: targetKeys.value && targetKeys.value.length >= 6 ? "190px" : "200px"
                  }}>
                    <span style={{ whiteSpace: "normal" }}>{item.title}</span>
                    {targetKeys.value && targetKeys.value.length > 1 && item.key && targetKeys.value.find(a => a === item.key) ?
                      <Space size={5} >
                        {
                          targetKeys.value.findIndex((a) => a === item.key!) > 0 ?
                            <Button onClick={(e) => move(item.key!, "up", e)} title="上移一行" size="small" type="link" >
                              <VerticalAlignTopOutlined />
                            </Button>
                            : null
                        }
                        {
                          targetKeys.value.findIndex((a) => a === item.key!) < targetKeys.value.length - 1 ?
                            <Button onClick={(e) => move(item.key!, "down", e)} title="下移一行" size="small" type="link" >
                              <VerticalAlignBottomOutlined />
                            </Button>
                            : null
                        }
                      </Space> : null}
                  </div>
                )}
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