/*
 * @Author: YangLiwei
 * @Date: 2022-06-29 17:21:34
 * @LastEditTime: 2022-10-09 15:59:25
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\lookField.tsx
 * @Description:
 */
import { defineComponent, Prop } from "vue";
import { message } from "ant-design-vue";
import { CopyOutlined } from "@ant-design/icons-vue";
import { ColumnsTypes, DefaultOptionType } from "../types";
import { Copy, FindTextFromData } from "../utils";
import timeFormat from "../utils/time";
export default defineComponent({
  name: "lookField",
  props: {
    type: {
      type: String,
      default: () => "text",
    } as Prop<ColumnsTypes>,
    options: {
      type: Array,
      required: false,
      default: () => [],
    } as Prop<DefaultOptionType[]|any >,
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
      const copyEle = ()=>(<CopyOutlined
        v-show={prop.value}
        class="text-color cursor-pointer ml-2"
        onClick={() => copy(prop.value)}
      />);
      switch (prop.type) {
      case "date":
        return <span>{timeFormat(prop.value, "YYYY-MM-DD")} {copyEle()} </span>;
      case "dateTime":
        return<span>{timeFormat(prop.value, "YYYY-MM-DD HH:mm:ss")} {copyEle()}</span>;
      case "money":
        return<span>￥{prop.value} {copyEle()}</span>;
      case "select":
        return <span>{FindTextFromData(prop.options, prop.value)} {copyEle()}</span>;
      case "upload":
        return<img src={prop.value+""} class="table-img" />;
      default:
        return <span style={{ wordBreak: "break-all" }}>
          {prop.value}
          {copyEle()}
        </span>;
      }
    };
  },
});
