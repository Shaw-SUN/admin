import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/department/list', //get
  Detail = '/department/', //get id
  Create = '/department', // post
  Edit = '/department', //put
  ChangeState = '/department/state/', //put id
  Delete = '/department/', //delete id
}

// List
// 请求参数
type DepartmentListParams = BasicPageParams & {};
// 返回
interface DepartmentListItem {
  id: string;
}
type DepartmentListResult = BasicFetchResult<DepartmentListItem>;

export const getDepartmentList = (params: DepartmentListParams) => {
  return defHttp.get<DepartmentListResult>({ url: Api.List, params });
};

// Detail
// 返回
type DepartmentDetailItem = {
  id: string;
};

export const getDepartmentDetail = (id: string) => {
  return defHttp.get<DepartmentDetailItem>({ url: Api.Detail + id });
};

//ChangeState
export const changeDepartmentState = (id: string) => {
  return defHttp.put({ url: Api.ChangeState + id });
};

//delete
export const deleteDepartment = (id: string) => {
  return defHttp.delete({ url: Api.Delete + id });
};

//create
type DepartmentCreateParams = {
  title: string;
};

export const createDepartment = (params: DepartmentCreateParams) => {
  return defHttp.post<DepartmentListResult>({ url: Api.Create, params });
};

//edit
export const editDepartment = (params: DepartmentCreateParams) => {
  return defHttp.put<DepartmentListResult>({ url: Api.Edit, params });
};
