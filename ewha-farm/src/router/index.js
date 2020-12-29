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
            component: () => import('@/views/layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('@/views/apps/dashboard/Dashboard.vue')
              },
              {
                path: '/user-settings',
                name: 'user-settings',
                component: () => import('@/views/apps/user-settings/UserSettings.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'User Settings', active: true }
                  ],
                  pageTitle: 'Settings',
                  rule: 'editor'
                }
              },
              {
                path: '/user-list',
                name: 'user-list',
                component: () => import('@/views/apps/user-list/UserList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'User Management', active: true }
                  ],
                  pageTitle: 'Users',
                  rule: 'editor'
                }
              },
              {
                path: '/user-view',
                name: 'user-view',
                component: () => import('@/views/apps/user-view/UserView.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Farm Register', active: true }
                  ],
                  pageTitle: 'Farm',
                  rule: 'editor'
                }
              },
              {
                path: '/user-edit',
                name: 'user-edit',
                component: () => import('@/views/apps/user-edit/UserEdit.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Farm Register', active: true }
                  ],
                  pageTitle: 'Farm',
                  rule: 'editor'
                }
              },
              {
                path: '/device-list',
                name: 'device-list',
                component: () => import('@/views/apps/device-list/DeviceList.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Device Settings', active: true }
                  ],
                  pageTitle: 'Devices',
                  rule: 'editor'
                }
              },
              {
                path: '/farm-register',
                name: 'farm-register',
                component: () => import('@/views/apps/farm-register/FarmRegister.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Farm Register', active: true }
                  ],
                  pageTitle: 'Farm',
                  rule: 'editor'
                }
              },
              {
                path: '/cctv',
                name: 'cctv',
                component: () => import('@/views/apps/dashboard/CCTVViewer.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'Farm Register', active: true }
                  ],
                  pageTitle: 'Farm',
                  rule: 'editor'
                }
              },
              {
                path: '/remote-control',
                name: 'remote-control',
                component: () => import('@/views/apps/dashboard/RemoteControl.vue'),
                meta: {
                  breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: '원격 제어', active: true }
                  ],
                  pageTitle: 'Farm',
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
            component: () => import('@/views/layouts/full-page/FullPage.vue'),
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
