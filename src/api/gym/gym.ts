import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  List = '/gym/list', //get
  Detail = '/gym/', //get id
  Audit = '/gym/audit', //post
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

// Detail
// 返回
type GymDetailItem = {
  name: string;
  address: string;
  phone: string;
  time: string;
  area: string;
  content: string;
  logoUrl: string | [];
  detailUrl: string | [];
  auditUrl: string | [];
};

export const getGymDetail = (id: number) => {
  return defHttp.get<GymDetailItem>({ url: Api.Detail + `${id}` });
};

//audit
export const auditGym = (params) => {
  return defHttp.post({ url: Api.Audit, params });
};
