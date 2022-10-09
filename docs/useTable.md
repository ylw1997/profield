# useTable 钩子

- `useTable` 是一个表格钩子,用于生成表格需要的事件方法

## 使用

```js
import { useTable } from "profield";

const {
  rowclass,
  onSelectChange,
  handleTableChange,
  edit,
  del,
  look,
  customRow,
  SelectedRowKeys,
} = useTable(emit);
```

## 参数

| 参数 | 说明       | 类型       | 默认值 |
| ---- | ---------- | ---------- | ------ |
| emit | 事件触发器 | `Function` | -      |

## 返回值

| 参数              | 说明             | 类型       |
| ----------------- | ---------------- | ---------- |
| rowclass          | 表格行样式       | `Function` |
| onSelectChange    | 表格行选择事件   | `Function` |
| handleTableChange | 表格分页事件     | `Function` |
| customRow         | 表格行自定义事件 | `Function` |
| SelectedRowKeys   | 表格行选择的 key | `Array`    |
