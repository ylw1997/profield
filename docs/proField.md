# proField 组件

* 用来统一proForm,proTable的字段

## 引入

```js

import { proField } from "profield";

```

## 使用

```html

<proField type="text"></proField>

```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|type|字段类型|`ColumnsTypes`|`text`|
|title|字段标题|`string`|`''`|

```ts
// ColumnsTypes 定义
type ColumnsTypes =
  | "text"
  | "number"
  | "money"
  | "dateTime"
  | "date"
  | "time"
  | "dateRange"
  | "dateTimeRange"
  | "textarea"
  | "select"
  | "upload"
  | "YUpload"
  | "switch"
  | "tree"
  | "treeSelect"
  | "password"
  | "cascader";
```