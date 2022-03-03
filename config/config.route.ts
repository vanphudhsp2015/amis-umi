export default [
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/',
        component: './',
      },
      {
        path: '/login',
        component: './login',
      },
      {
        path: '/roles',
        component: './roles',
      },
    ],
  },
];
