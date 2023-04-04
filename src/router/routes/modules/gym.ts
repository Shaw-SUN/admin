import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const userManage: AppRouteModule = {
  path: '/gym',
  name: 'GYM',
  component: LAYOUT,
  redirect: '/gym/audit',
  meta: {
    orderNo: 2,
    icon: 'fluent:people-team-16-regular',
    title: '健身房管理',
  },
  children: [
    {
      path: 'audit',
      name: 'AuditManage',
      component: () => import('/@/views/gym/GymManage.vue'),
      meta: {
        title: '审批管理',
      },
    },
  ],
};

export default userManage;
