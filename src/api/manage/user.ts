import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/user/list', //get
  ChangeState = '/user/state/', //put id
  Delete = '/user/', //delete id
}

// List
// 请求参数
type UserListParams = BasicPageParams & {
  name?: string;
  deptId?: string;
};
// 返回
interface UserListItem {
  id: number;
}
type UserListResult = BasicFetchResult<UserListItem>;

export const getUserList = (params: UserListParams) => {
  return defHttp.get<UserListResult>({ url: Api.List, params });
};

//ChangeState
export const changeUserState = (id: string) => {
  return defHttp.put({ url: Api.ChangeState + id });
};

//delete
export const deleteUser = (id: string) => {
  return defHttp.delete({ url: Api.Delete + id });
};
