import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/department/list', //get
  Create = '/department', // post
  ChangeState = '/department/state/', //put id
  Delete = '/department/', //delete id
}

// List
// 请求参数
type DepartmentListParams = BasicPageParams & {};
// 返回
interface DepartmentListItem {
  id: string;
  //...
}
type DepartmentListResult = BasicFetchResult<DepartmentListItem>;

export const getDepartmentList = (params: DepartmentListParams) => {
  return defHttp.get<DepartmentListResult>({ url: Api.List, params });
};

//ChangeState
export const changeDepartmentState = (id: number) => {
  return defHttp.put({ url: Api.ChangeState + `${id}` });
};

//delete
export const deleteDepartment = (id: number) => {
  return defHttp.delete({ url: Api.Delete + `${id}` });
};

// create
export const createDepartment = (params) => {
  return defHttp.post({ url: Api.Create, params });
};
