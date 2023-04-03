import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const userManage: AppRouteModule = {
  path: '/manage',
  name: 'Manage',
  component: LAYOUT,
  redirect: '/manage/user',
  meta: {
    orderNo: 2,
    icon: 'mdi:user-key-outline',
    title: '系统管理',
  },
  children: [
    {
      path: 'admin',
      name: 'AdminManage',
      component: () => import('/@/views/manage/AdminManage.vue'),
      meta: {
        title: '管理员管理',
      },
    },
    {
      path: 'role',
      name: 'RoleManage',
      component: () => import('/@/views/manage/RoleManage.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: 'department',
      name: 'DepartmentManage',
      component: () => import('/@/views/manage/DepartmentManage.vue'),
      meta: {
        title: '部门管理',
      },
    },
    {
      path: 'user',
      name: 'UserManage',
      component: () => import('/@/views/manage/UserManage.vue'),
      meta: {
        title: '用户管理',
      },
    },
  ],
};

export default userManage;
