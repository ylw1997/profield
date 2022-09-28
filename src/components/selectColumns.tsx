/*
 * @Author: YangLiwei
 * @Date: 2021-06-16 13:45:33
 * @LastEditTime: 2022-09-28 15:01:59
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\selectColumns.tsx
 * @Description:
 */
import { defineComponent, ref, toRaw } from "vue";
import { FunnelPlotOutlined } from "@ant-design/icons-vue";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Popover,
  Row,
  Space,
  Col,
} from "ant-design-vue";
import { MouseEventHandler } from "ant-design-vue/lib/_util/EventInterface";
import { columnItem } from "../types";
export default defineComponent({
  name:"selectColumns",
  emits: ["update:columns", "change"],
  props: {
    selectedArr: {
      type: Array,
      default: () => [],
    } as any,
    columns: {
      type: Array,
      default: () => [],
    } as any,
    rowKey: {
      type: String,
      default: "id",
    },
  },
  setup(prop, { emit }) {
    const visible = ref<boolean>(false);
    const selectValue = ref<string[]>([...prop.selectedArr, prop.rowKey]);
    const IsSelectAll = ref<boolean>(false);
    //全选,全不选
    const seelctAll: MouseEventHandler = (e: any) => {
      if (e.target?.checked) {
        const columnsObj = [...toRaw(prop.columns)] as columnItem[];
        const objarr: string[] = [];
        columnsObj.forEach((item) => {
          objarr.push(item.dataIndex);
        });
        selectValue.value = objarr;
      } else {
        selectValue.value = [...prop.selectedArr, prop.rowKey];
      }
    };
    //选择变化
    const changeCheck = (value: any) => {
      selectValue.value = value;
    };
    //提交
    const submit = () => {
      visible.value = false;
      const columnsObj = [...toRaw(prop.columns)] as columnItem[];
      columnsObj.forEach((item) => {
        if (!selectValue.value.includes(item.dataIndex)) {
          item.notShowInTable = true;
        } else {
          item.notShowInTable = false;
        }
      });
      emit("update:columns", columnsObj);
      emit("change", columnsObj);
    };
    return () => {
      return (
        <Popover
          v-model:visible={visible.value}
          trigger="click"
          placement="bottomRight"
          v-slots={{
            title: () => (
              <div class="between">
                <span>选择表格字段</span>
                <Space>
                  <Checkbox
                    onClick={seelctAll}
                    V-model-checked={IsSelectAll.value}
                  >
                    {IsSelectAll.value ? "全不选" : "全选"}
                  </Checkbox>
                  <Button type="default" onClick={submit} size="small">
                    确定
                  </Button>
                </Space>
              </div>
            ),
            content: () => (
              <div style="width: 400px;">
                <CheckboxGroup onChange={changeCheck} value={selectValue.value}>
                  <Row>
                    {prop.columns.map((item: columnItem) => (
                      <Col span={8}>
                        <Checkbox
                          disabled={item.dataIndex == prop.rowKey}
                          value={item.dataIndex}
                        >
                          {item.title}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </CheckboxGroup>
              </div>
            ),
          }}
        >
          <FunnelPlotOutlined />
        </Popover>
      );
    };
  },
});
