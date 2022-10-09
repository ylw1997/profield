# usePage 钩子

- 用来生成表格组件的事件

## 用法

```js
import { usePage } from "profield";

//table方法封装
const { tableLoading, pagination, tableData, getData, changeParamsCleanPage } =
  usePage({
    AJAXFunc: categoryList,
  });
```

## 参数

| 参数         | 说明     | 类型   | 默认值 |
| ------------ | -------- | ------ | ------ |
| AJAXFunc     | 请求函数 | `(page: PageInterFace) => Promise<AxiosResponse<PageAjax<T>>>` | -      |
| params| 默认参数 | `PageInterFace` | -      |
|runOnMounted|是否在组件挂载时执行|`Boolean`|`true`|
|callBackFunc|请求成功后的回调函数|`(data: T[]) => void`|`undefined`|
|watchParams|参数监听|`Boolean`|`true`|

## 返回值

| 参数                 | 说明             | 类型       |
| -------------------- | ---------------- | ---------- |
|rowskeys|表格行选择的 key|`Array`|
|tableLoading|表格加载状态|`Boolean`|
|pagination|表格分页参数|`PaginationInterFace`|
|tableData|表格数据|`T[]`|
|getData|获取表格数据|`(params?: PageInterFace) => Promise<void>`|
|changeParamsCleanPage|改变参数并清空分页|`(cleanParams: {}) => void`|
|handleTableChange|表格分页事件|`(pagination: PaginationConfig) => void`|

