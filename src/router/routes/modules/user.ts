import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const userManage: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/manage',
  meta: {
    orderNo: 2,
    icon: 'mdi:user-key-outline',
    title: '用户管理',
  },
  children: [
    {
      path: 'manage',
      name: 'UserManage',
      component: () => import('/@/views/user/AdminManage.vue'),
      meta: {
        title: '管理员管理',
      },
    },
  ],
};

export default userManage;
