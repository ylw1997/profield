/*
 * @Author: YangLiwei
 * @Date: 2021-05-16 14:56:37
 * @LastEditTime: 2022-10-08 10:19:59
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\proField.tsx
 * @Description:原子组件
 */

import { defineComponent, Prop } from "vue";
import {
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  InputPassword,
  RangePicker,
  Select,
  Switch,
  Textarea,
  TimePicker,
  Tree,
  TreeSelect,
  Upload,
} from "ant-design-vue";
import YUpload from "./YUpload";
import { ColumnsTypes } from "../types";
const ProField = defineComponent({
  name: "proField",
  props: {
    type: {
      type: String,
      default: () => "text",
    } as Prop<ColumnsTypes>,
    title: {
      type: String,
      default: () => "",
    },
    dataIndex: {
      type: String,
      default: () => "",
    },
    uploadList: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(prop) {
    return () => {
      switch (prop.type) {
      case "number":
        return <InputNumber placeholder={"请输入" + prop.title} min={0} />;

      case "money":
        return (
          <InputNumber
            placeholder={"请输入" + prop.title}
            min={0.01}
            step={0.01}
            formatter={(value) =>
              `${value}`.replace(/^(\\-)*(\d+)\.(\d\d).*$/, "$1$2.$3")
            }
          />
        );

      case "dateTime":
        return (
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={"请选择" + prop.title}
            show-time
          />
        );

      case "date":
        return (
          <DatePicker
            format="YYYY-MM-DD"
            placeholder={"请选择" + prop.title}
          />
        );

      case "time":
        return (
          <TimePicker format="HH:mm:ss" placeholder={"请选择" + prop.title} />
        );

      case "dateTimeRange":
        return (
          <RangePicker
            placeholder={["开始时间", "结束时间"]}
            show-time={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        );

      case "dateRange":
        return <RangePicker placeholder={["开始时间", "结束时间"]} />;

      case "textarea":
        return <Textarea placeholder={"请输入" + prop.title} />;

      case "select":
        return <Select placeholder={"请选择" + prop.title} />;

      case "upload":
        return <Upload title={prop.title} />;
        
      case "YUpload":
        return <YUpload title={prop.title} />;

      case "password":
        return <InputPassword placeholder={"请输入" + prop.title} />;

      case "switch":
        return <Switch />;

      case "treeSelect":
        return <TreeSelect placeholder={"请选择" + prop.title} />;

      case "tree":
        return <Tree />;

      case "cascader":
        return <Cascader placeholder={"请选择" + prop.title} />;

      default:
        return <Input placeholder={"请输入" + prop.title} />;
      }
    };
  },
});

export default ProField;
