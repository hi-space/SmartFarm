import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('@/components/layouts/main/Main.vue'),
            children: [
              
              // =============================================================================
              // Common Routes
              // =============================================================================
              {
                path: '/settings',
                name: 'settings',
                component: () => import('@/views/common/settings/Settings.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Settings', active: true }
                  ],
                  pageTitle: 'Settings',
                  rule: 'editor'
                }
              },

              // =============================================================================
              // Admin Routes
              // =============================================================================
              {
                path: '/users',
                name: 'user-list',
                component: () => import('@/views/admin/user-list/UserList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'User' },
                    { title: 'List', active: true }
                  ],
                  pageTitle: 'User List',
                  rule: 'editor'
                }
              },
              {
                path: '/user/view/:userId',
                name: 'user-view',
                component: () => import('@/views/admin/user-view/UserView.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'User' },
                    { title: 'View', active: true }
                  ],
                  pageTitle: 'User View',
                  rule: 'editor'
                }
              },
              {
                path: '/user/edit/:userId',
                name: 'user-edit',
                component: () => import('@/views/admin/user-edit/UserEdit.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'User' },
                    { title: 'Edit', active: true }
                  ],
                  pageTitle: 'User Edit',
                  rule: 'editor'
                }
              },
              {
                path: '/user/farm/:userId',
                name: 'farm-register',
                component: () => import('@/views/admin/farm-register/FarmRegister.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                  ],
                  pageTitle: 'TODO',
                  rule: 'editor'
                }
              },

              // =============================================================================
              // User Routes
              // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('@/views/user/Dashboard.vue')
              },
              {
                path: '/monitor/cctv',
                name: 'cctv-monitoring',
                component: () => import('@/views/user/monitoring/CCTVViewer.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Monitoring' },
                    { title: 'CCTV', active: true }
                  ],
                  pageTitle: 'Monitoring',
                  rule: 'editor'
                }
              },
              {
                path: '/monitor/sensor',
                name: 'sensor-monitoring',
                component: () => import('@/views/user/monitoring/SensorMonitor.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Monitoring' },
                    { title: 'Sensor', active: true }
                  ],
                  pageTitle: 'Monitoring',
                  rule: 'editor'
                }
              },
              {
                path: '/control/remote',
                name: 'remote-control',
                component: () => import('@/views/user/control/RemoteControl.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: '원격 제어' },
                    { title: '실시간 제어', active: true }
                  ],
                  pageTitle: 'Remote Control',
                  rule: 'editor'
                }
              },
              {
                path: '/control/setting',
                name: 'remote-setting',
                component: () => import('@/views/user/control/AutoControlSetting.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: '원격 제어' },
                    { title: '자동화 설정', active: true }
                  ],
                  pageTitle: 'Remote Control',
                  rule: 'editor'
                }
              },
            ],
        },

        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () => import('@/components/layouts/full-page/FullPage.vue'),
            children: [
              // =============================================================================
              // PAGES
              // =============================================================================
              {
                path: '/pages/login',
                name: 'page-login',
                component: () => import('@/views/pages/auth/Login.vue')
              },{
                path: '/pages/register',
                name: 'page-register',
                component: () => import('@/views/pages/auth/Register.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/error/Error404.vue')
              },
              {
                path: '/pages/error-500',
                name: 'page-error-500',
                component: () => import('@/views/pages/error/Error500.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})


router.beforeEach((to, from, next) => {
  // firebase.auth().onAuthStateChanged(() => {

  //   // get firebase current user
  //   const firebaseCurrentUser = firebase.auth().currentUser

  //   // if (
  //   //     to.path === "/pages/login" ||
  //   //     to.path === "/pages/forgot-password" ||
  //   //     to.path === "/pages/error-404" ||
  //   //     to.path === "/pages/error-500" ||
  //   //     to.path === "/pages/register" ||
  //   //     to.path === "/callback" ||
  //   //     to.path === "/pages/comingsoon" ||
  //   //     (auth.isAuthenticated() || firebaseCurrentUser)
  //   // ) {
  //   //     return next();
  //   // }

  //   // If auth required, check login. If login fails redirect to login page
  //   if (to.meta.authRequired) {
  //     if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
  //       router.push({ path: '/pages/login', query: { to: to.path } })
  //     }
  //   }

    return next()
  //   // Specify the current path as the customState parameter, meaning it
  //   // will be returned to the application after auth
  //   // auth.login({ target: to.path });

  // })
})

export default router
