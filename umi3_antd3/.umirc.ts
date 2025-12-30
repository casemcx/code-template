import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      exact: true,
    },
    {
      path: '/form',
      component: '@/pages/form/_layout',
      routes: [
        {
          path: '/form/basic',
          component: '@/pages/form/basic',
          exact: true,
        },
        {
          path: '/form/advanced',
          component: '@/pages/form/advanced',
          exact: true,
        },
        {
          path: '/form/dynamic',
          component: '@/pages/form/dynamic',
          exact: true,
        },
        {
          path: '/form/validation',
          component: '@/pages/form/validation',
          exact: true,
        },
      ],
    },
  ],
  fastRefresh: {},
});
