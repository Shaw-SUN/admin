/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  avatarUrl: string;
  id: number;
  name: string;
  token: string;
  tokenPrefix: string;
  //role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  id: number;
  // 用户名
  username: string;
  // 真实名字
  name: string;
  // 头像
  avatarUrl: string;
}
