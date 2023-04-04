import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/gym/list', //get
  ChangeState = '/gym/state/', //put id
  Delete = '/gym/', //delete id
}

// List
// 请求参数
type GymListParams = BasicPageParams & {
  name?: string;
  state?: string;
};
// 返回
interface GymListItem {
  id: number;
  // ....
}
type GymListResult = BasicFetchResult<GymListItem>;

export const getGymList = (params: GymListParams) => {
  return defHttp.get<GymListResult>({ url: Api.List, params });
};

//ChangeState
export const changeGymState = (id: number) => {
  return defHttp.put({ url: Api.ChangeState + `${id}` });
};

//delete
export const deleteGym = (id: number) => {
  return defHttp.delete({ url: Api.Delete + `${id}` });
};
