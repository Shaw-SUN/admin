import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/admin/list', //get
  Detail = '/admin/', //get id
  Create = '/admin', // post
  Edit = '/admin', //put
  ChangeState = '/admin/state/', //put id
  Delete = '/admin/', //delete id
}

// List
// 请求参数
type AdminListParams = BasicPageParams & {
  name?: string;
  deptId?: string;
};
// 返回
interface AdminListItem {
  id: string;
}
type AdminListResult = BasicFetchResult<AdminListItem>;

export const getAdminList = (params: AdminListParams) => {
  return defHttp.get<AdminListResult>({ url: Api.List, params });
};

// Detail
// 返回
type AdminDetailItem = {
  id: string;
};

export const getAdminDetail = (id: number) => {
  return defHttp.get<AdminDetailItem>({ url: Api.Detail + `${id}` });
};

//ChangeState
export const changeAdminState = (id: string) => {
  return defHttp.put({ url: Api.ChangeState + id });
};

//delete
export const deleteAdmin = (id: string) => {
  return defHttp.delete({ url: Api.Delete + id });
};

//create

type AdminCreateParams = {
  username: string;
  password: string;
  avatarUrl: string;
  name: string;
  deptId: string;
  roleId: string;
};

export const createAdmin = (params: AdminCreateParams) => {
  return defHttp.post<AdminListResult>({ url: Api.Create, params });
};

//edit
export const editAdmin = (params: AdminCreateParams) => {
  return defHttp.put<AdminListResult>({ url: Api.Edit, params });
};
