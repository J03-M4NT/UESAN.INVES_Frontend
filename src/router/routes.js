const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'revistas', component: () => import('pages/RevistasPage.vue') },
      // Rutas de la aplicación principal
    ],
  },

  // Otras Rutas:

  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
  },

  {
    path: '/register',
    component: () => import('src/components/auth/RegisterForm.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]
// Las rutas de arriba son las rutas principales de la aplicación,
export default routes
