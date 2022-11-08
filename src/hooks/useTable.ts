/*
 * @Author: YangLiwei
 * @Date: 2021-01-19 18:31:56
 * @LastEditTime: 2022-11-08 17:40:39
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\hooks\useTable.ts
 * @Description:table hook
 */
import { TablePaginationConfig } from "ant-design-vue";
import { SorterResult } from "ant-design-vue/lib/table/interface";
import { ref } from "vue";
import { tableChangeFunc } from "../utils/page";
/**
 * 封装表格事件
 * @param emit emit方法
 */
const useTable = (emit: any) => {
  const rowclass = (_: any, index: number) => {
    if (index % 2 == 1) {
      return "rowclass";
    }
    return "";
  };

  const SelectedRowKeysWithPage = ref({});
  const SelectedRowKeys = ref<(string | number)[]>([]);

  const getRowKeys = (obj: object) => [...Object.values(obj)].flat();

  //选择改变
  const onSelectChange = (
    selectedRowKeys: (string | number)[],
    pagination: false | TablePaginationConfig | undefined
  ) => {
    if (pagination) {
      SelectedRowKeysWithPage.value = {
        ...SelectedRowKeysWithPage.value,
        [pagination?.current || 1]: selectedRowKeys,
      };
    }else{
      SelectedRowKeysWithPage.value = {
        [1]: selectedRowKeys,
      };
    }
    SelectedRowKeys.value = getRowKeys(SelectedRowKeysWithPage.value);
    if (SelectedRowKeys.value.length > 0 ) {
      emit("update:rowskeys", SelectedRowKeys.value);
    } else {
      SelectedRowKeysWithPage.value = {};
      emit("update:rowskeys", []);
    }
  };

  //分页改变
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: SorterResult<any> | any
  ) => {
    tableChangeFunc(pagination, filters, sorter, (obj) =>
      emit("update:pagination", obj)
    );
  };
    //编辑
  const edit = (record: any) => {
    emit("edit", record);
  };
    //删除
  const del = (record: any) => {
    emit("del", record);
  };
    //查看
  const look = (record: any) => {
    emit("look", record);
  };
    //点击行
  const customRow = (record: any) => {
    return {
      onClick: (e: { path: Element[] }) => {
        const elearr = document.getElementsByClassName("selectRow");
        if (elearr.length > 0) {
          elearr[0].classList.remove("selectRow");
        }
        e.path[1].classList.add("selectRow");
        emit("clickRow", record);
      },
    };
  };
  return {
    rowclass,
    onSelectChange,
    handleTableChange,
    edit,
    del,
    look,
    customRow,
    SelectedRowKeys,
  };
};
export default useTable;
