import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/admin/list', //get
  Detail = '/admin/', //get id
  Create = '/admin', // post
  Edit = '/admin', //put
  ChangeState = '/admin/state/', //put id
  Delete = '/admin/', //delete id
  Departments = '/department/dictionary',
  Roles = '/role/dictionary',
}

// List
// 请求参数
type AdminListParams = BasicPageParams & {
  name?: string;
  deptId?: string;
};
// 返回
interface AdminListItem {
  id: number;
  //...
}
type AdminListResult = BasicFetchResult<AdminListItem>;

export const getAdminList = (params: AdminListParams) => {
  return defHttp.get<AdminListResult>({ url: Api.List, params });
};

// Detail
// 返回
type AdminDetailItem = {
  id: string;
  //...
};

export const getAdminDetail = (id: number) => {
  return defHttp.get<AdminDetailItem>({ url: Api.Detail + `${id}` });
};

//ChangeState
export const changeAdminState = (id: number) => {
  return defHttp.put({ url: Api.ChangeState + `${id}` });
};

//delete
export const deleteAdmin = (id: number) => {
  return defHttp.delete({ url: Api.Delete + `${id}` });
};

//create

type AdminCreateParams = {
  id?: number;
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

//departments
interface DepartmentsItem {
  id: number;
  //...
}
type DepartmentsResult = BasicFetchResult<DepartmentsItem>;
export const getDepartments = () => {
  return defHttp.get<DepartmentsResult>({ url: Api.Departments });
};

//roles
interface RolesItem {
  id: number;
  //...
}
type RolesResult = BasicFetchResult<RolesItem>;
export const getRoles = () => {
  return defHttp.get<RolesResult>({ url: Api.Roles });
};
