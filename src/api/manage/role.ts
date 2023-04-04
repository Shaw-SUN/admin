import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/role/list', //get
  Create = '/role', // post
  ChangeState = '/role/state/', //put id
  Delete = '/role/', //delete id
  RolePermission = '/role/permission/', //get id
  EditPermission = '/role/permission', //put
}

// List
// 请求参数
type RoleListParams = BasicPageParams & {};
// 返回
interface RoleListItem {
  id: string;
  //...
}
type RoleListResult = BasicFetchResult<RoleListItem>;

export const getRoleList = (params: RoleListParams) => {
  return defHttp.get<RoleListResult>({ url: Api.List, params });
};

//ChangeState
export const changeRoleState = (id: number) => {
  return defHttp.put({ url: Api.ChangeState + `${id}` });
};

//delete
export const deleteRole = (id: number) => {
  return defHttp.delete({ url: Api.Delete + `${id}` });
};

//create

export const createRole = (params) => {
  return defHttp.post({ url: Api.Create, params });
};
