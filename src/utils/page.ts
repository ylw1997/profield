/*
 * @Author: YangLiwei
 * @Date: 2022-08-02 10:34:12
 * @LastEditTime: 2022-10-08 11:19:24
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\utils\page.ts
 * @Description:
 */

import { TablePaginationConfig } from "ant-design-vue";
import { FilterValue, SorterResult } from "ant-design-vue/es/table/interface";

export const defaultPagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "30", "40", "50"],
  current: 1, //初始页
  pageNum: 1,
  pageSize: 10, //分页大小
  showTotal: (total: number) => `一共有 ${total} 条数据`,
};

//分页改变
export const tableChangeFunc = <T>(
  page: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<T> | SorterResult<T>[],
  callBackFunc: (data: any) => void
) => {
  const obj: any = {
    ...page,
    sortKey: undefined,
    sortVal: undefined,
    screenJson: undefined,
    showTotal: (total: number) => `一共有 ${total} 条数据`,
  };
  // 判断sorter不为数组
  if (!Array.isArray(sorter)) {
    if (sorter.order) {
      obj.sortKey = sorter.columnKey;
      obj.sortVal = sorter.order == "ascend" ? "ASC" : "DESC";
    }
  }
  if (JSON.stringify(filters) != "{}") {
    const filtersobj = [];
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const value = filters[key];
        if (value instanceof Array && value.length > 0) {
          filtersobj.push({ key, value: value[0] });
        }
      }
    }
    if (filtersobj.length > 0) {
      console.log(filtersobj);
      obj.screenJson = encodeURIComponent(JSON.stringify(filtersobj));
    }
  }
  callBackFunc(obj);
};
