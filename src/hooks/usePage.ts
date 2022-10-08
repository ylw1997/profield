import { TablePaginationConfig } from "ant-design-vue";
import { FilterValue, SorterResult } from "ant-design-vue/es/table/interface";
import { Key } from "ant-design-vue/es/vc-table/interface";
import { AxiosResponse } from "axios";
import { onMounted, ref, watch } from "vue";
import { PageAjax, PageInterFace } from "../types";
import { defaultPagination, tableChangeFunc } from "../utils/page";

interface UsePage<T> {
  AJAXFunc: (page: PageInterFace) => Promise<AxiosResponse<PageAjax<T>>>;
  params?: PageInterFace;
  runOnMounted?: boolean;
  watchParams?: boolean;
  callBackFunc?: (data: any) => void;
}

/**
 *
 * @param AJAXFunc 请求的方法
 * @param params 请求参数,可选
 * @param runOnMounted 是否在开始就请求
 * @param watchParams 是否监听参数,变化就请求
 * @param callBackFunc callBackFunc 成功回调
 */
const usePage = <T>({
  AJAXFunc,
  params = defaultPagination,
  runOnMounted = true,
  callBackFunc,
  watchParams = true,
}: UsePage<T>) => {
  const rowskeys = ref<Key[]>([]);
  //初始化的参数
  const paramsobj = { ...defaultPagination, ...params };
  // 加载
  const tableLoading = ref<boolean>(false);
  // 分页
  const pagination = ref(paramsobj);
  // 数据
  const tableData = ref<Array<T>>();
  // 获取方法
  const getData = (paramData = pagination.value) => {
    tableLoading.value = true;
    const obj = {
      ...paramData,
      pageNum: paramData.current,
      total: undefined,
      current: undefined,
      pageSizeOptions: undefined,
      showTotal: undefined,
    };

    AJAXFunc(obj)
      .then((res) => {
        tableData.value = res.data.rows;
        pagination.value.total = res.data.total;
        if (callBackFunc) callBackFunc(res.data.rows);
      })
      .finally(() => {
        tableLoading.value = false;
      });
  };

  //分页改变
  const handleTableChange = (
    page: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    tableChangeFunc(page, filters, sorter, (obj) => (pagination.value = obj));
  };
  //初始化
  if (runOnMounted) {
    onMounted(() => {
      getData();
    });
  }
  //监听
  if (watchParams) {
    watch(pagination, () => {
      getData();
    });
  }
  //改变数据并且初始化现有页数
  const changeParamsCleanPage = (cleanParams = {}) => {
    const obj = {
      ...paramsobj,
      pageNum: 1,
      current: 1,
      total: pagination.value.total,
      ...cleanParams,
    };
    pagination.value = obj;
    if (!watchParams) {
      getData();
    }
  };
  return {
    rowskeys,
    tableLoading,
    pagination,
    getData,
    tableData,
    changeParamsCleanPage,
    handleTableChange,
  };
};
export default usePage;
