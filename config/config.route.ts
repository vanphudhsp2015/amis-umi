export default [
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/',
        redirect: '/roles',
      },
      {
        path: '/login',
        component: './login',
      },
      {
        path: '/roles',
        component: './roles',
      },
      {
        path: '/initialization',
        component: './initialization',
      },
      {
        path: '/form-page',
        component: './form-page',
      },
    ],
  },
];
