/*
 * @Author: YangLiwei
 * @Date: 2022-06-29 17:21:34
 * @LastEditTime: 2023-01-06 17:22:30
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: /profield/src/components/lookField.tsx
 * @Description:
 */
import { defineComponent, Prop } from "vue";
import { Image, message, Space } from "ant-design-vue";
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
          color: "#1890ff",
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
        return <Space>
          {
            (prop.value as string).split(",").map(element => {
              return <Image src={element} style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }} />;
            })
          }
        </Space>;
      default:
        return <span style={{ wordBreak: "break-all" }}>
          {prop.value}
          {prop.value?copyEle():"无数据"}
        </span>;
      }
    };
  },
});
