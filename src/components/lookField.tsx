/*
 * @Author: YangLiwei
 * @Date: 2022-06-29 17:21:34
 * @LastEditTime: 2022-10-08 10:14:26
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\lookField.tsx
 * @Description:
 */
import { defineComponent, Prop } from "vue";
import { message } from "ant-design-vue";
import { CopyOutlined } from "@ant-design/icons-vue";
import { ColumnsTypes, DefaultOptionType } from "../types";
import { Copy, FindTextFromData } from "../utils";
export default defineComponent({
  name:"lookField",
  props: {
    type: {
      type: String,
      default: () => "text",
    } as Prop<ColumnsTypes>,
    selectOptions: {
      type: Array,
      default: () => [],
    } as Prop<DefaultOptionType[]>,
    value: {
      type: [String, Number],
      default: () => "",
    },
  },
  setup(prop) {
    const copy = (text: string | number) => {
      Copy(text.toString())
        .then(() => {
          message.success("复制成功");
        })
        .catch(() => {
          message.error("复制失败");
        });
    };
    return () => {
      if (prop.type === "select") {
        return <span>{FindTextFromData(prop.selectOptions, prop.value)}</span>;
      } else {
        return (
          <span style={{ wordBreak: "break-all" }}>
            {prop.value}
            <CopyOutlined
              v-show={prop.value}
              class="text-color cursor-pointer ml-2"
              onClick={() => copy(prop.value)}
            />
          </span>
        );
      }
    };
  },
});
