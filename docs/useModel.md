# useModel 钩子

- 用于生成弹窗和抽屉的事件

## 使用

```js
import { useModel } from "profield";

const { visible, modelData, add, edit } = useModel(columns.value);
```

## 参数

| 参数    | 说明   | 类型    | 默认值 |
| ------- | ------ | ------- | ------ |
| columns | 表格列 | `columnItem[]` | -      |


## 返回值

| 参数       | 说明             | 类型       |
| ---------- | ---------------- | ---------- |
|visible|弹窗和抽屉的显示状态|`Boolean`|
|modelData|弹窗和抽屉的数据|`Object`|
|add|添加事件|`Function`|
|edit|编辑事件|`Function`|

