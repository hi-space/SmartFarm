import useJwt from '@/auth/jwt/useJwt'

export default {
  isUserLoggedIn() {
    return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
  },

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'))
  },

  getHomeRouteForLoggedInUser(userRole) {
    if (userRole === 'admin') return { name: 'user-list' }
    if (userRole === 'customer') return { name: 'dashboard' }
    return { name: 'auth-login' }
  },
}
