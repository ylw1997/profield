/*
 * @Author: YangLiwei
 * @Date: 2022-06-29 17:21:34
 * @LastEditTime: 2022-10-27 11:05:12
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
    } as Prop<DefaultOptionType[] | any>,
    value: {
      type: [String, Number, Array],
      default: () => "",
    },
  },
  setup(prop, { attrs }) {
    const copy = (text: string | number | any[]) => {
      Copy(text.toString())
        .then(() => {
          message.success("复制成功");
        })
        .catch(() => {
          message.error("复制失败");
        });
    };
    return () => {
      const copyEle = () => (<CopyOutlined
        v-show={prop.value}
        style={{
          cursor: "pointer",
          marginLeft: "5px",
        }}
        onClick={() => copy(prop.value)}
      />);
      switch (prop.type) {
      case "date":
        return <span>{timeFormat((prop.value as string), "YYYY-MM-DD")} {copyEle()} </span>;
      case "dateTime":
        return <span>{timeFormat((prop.value as string), "YYYY-MM-DD HH:mm:ss")} {copyEle()}</span>;
      case "money":
        return <span>￥{prop.value} {copyEle()}</span>;
      case "select":
        if (attrs["multiple"]) {
          return <span>{(prop.value as any[]).map((item) => FindTextFromData(prop.options, item)
          ).join(",")} {copyEle()}</span>;
        }
        return <span>{FindTextFromData(prop.options, (prop.value as string))} {copyEle()}</span>;
      case "YUpload":
        return <img src={prop.value + ""} style={{
          width: "80px",
          height: "80px",
          borderRadius: "2px",
          display: "inline-block",
        }} />;
      default:
        return <span style={{ wordBreak: "break-all" }}>
          {prop.value}
          {copyEle()}
        </span>;
      }
    };
  },
});
