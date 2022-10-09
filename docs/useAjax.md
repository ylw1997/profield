# useAjax Hook

* useAjax 用来封装 axios 请求，返回一个对象，包含请求状态、数据、错误信息等

## 用法

```js
import { useAjax } from "profield";

const { ajaxFunc, loading } = useAJAX({
  func: GetProductDetail,
  runOnMounted: false,
  callBackFunc: (data: any) => {
    console.log(data);
  },
});
```

## 参数

|参数|说明|类型|默认值|
|---|---|---|---|
|func|请求函数|(params: any) => Promise<AxiosResponse<Ajax<T>>>|无|
|params|前置请求参数|any|无|
|runOnMounted|是否在组件挂载时执行请求|boolean|true|
|callBackFunc|请求成功后的回调函数|(data: T) => void|无|

## 返回值

|参数|说明|类型|
|---|---|---|
|ajaxFunc|请求函数,手动请求|Function|
|loading|请求状态|boolean|
|data|请求数据|any|


# useAJAXSim Hook

* useAJAXSim 用来模拟请求，返回一个对象，包含请求状态、数据、错误信息等,是useAjax的简化版

## 用法

```js
import { useAjaxSim } from "profield";
const { loading: addProductLoading, ajaxFunc: addProduct } = useAJAXSim(
  productAdd,
  false,
  (data) => {
    console.log(data);
  }
);
```

## 参数

|参数|说明|类型|默认值|
|---|---|---|---|
|第一个参数|请求函数|(params: any) => Promise<AxiosResponse<Ajax<T>>>|无|
|第二个参数|是否在组件挂载时执行请求|boolean|true|
|第三个参数|请求成功后的回调函数| (data: any, res: any) => void|无|

## 返回值

|参数|说明|类型|
|---|---|---|
|ajaxFunc|请求函数,手动请求|Function|
|loading|请求状态|boolean|
|data|请求数据|any|