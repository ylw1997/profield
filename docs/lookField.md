# lookField 组件

* 用来显示字段数据,复制数据

* 目前只实现了text和select类型查看

## 引入

```js

import { lookField } from "lookField";

```

## 使用

```html

<lookField type="text"></lookField>

```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|type|字段类型|`columnItem`|`text`|
|options|下拉框选项|`DefaultOptionType[]`|`{}`|
|value|字段值|`any`|`''`|
