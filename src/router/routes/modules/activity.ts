import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const activityManage: AppRouteModule = {
  path: '/activity',
  name: 'Activity',
  component: LAYOUT,
  redirect: '/activity/manage',
  meta: {
    orderNo: 1,
    icon: 'fluent:people-team-16-regular',
    title: '活动管理',
  },
  children: [
    {
      path: 'manage',
      name: 'ActivityManage',
      component: () => import('/@/views/activity/index.vue'),
      meta: {
        title: '活动管理',
      },
    },
  ],
};

export default activityManage;
