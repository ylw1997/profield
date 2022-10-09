# useForm 钩子

* 用于生成表单相关事件方法

# 使用

```js
import { useForm } from "profield";

const { formref, formModel } = useForm();

```

## 参数

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
|emit | 表单提交事件 | emit | - | 否|
|props| 表单属性 | props | - | 否|
|columns| 表单字段 | columnItem[] | - | 否|

## 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
|formref | 表单ref | Ref<ElForm> |
|formModel | 表单数据 | Ref<Recordable> |
|submit | 表单提交方法 | (e: Event) => void |
|reset | 表单重置方法 | () => void |
|makeRule | 生成规则 | (rule: columnItem) => RuleObject[] |