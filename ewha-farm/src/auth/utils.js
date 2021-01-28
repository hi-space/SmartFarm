/* eslint-disable import/no-cycle */
import useJwt from '@/auth/jwt/useJwt'
import { initialAbility } from '@/libs/acl/config'
import store from '@/store'
import router from '@/router'
import ability from '@/libs/acl/ability'

/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole, userStatus) => {
  if (userStatus !== 'active') return { name: 'not-authorized' }
  if (userRole === 'admin' || userRole === 'manager') return { name: 'user-list' }
  return { name: 'auth-login' }
}

export const logout = () => {
  store.dispatch('users/deleteDeviceToken',
    {
      id: getUserData().id,
      tokenId: localStorage.getItem('deviceToken'),
    })

  // Remove userData from localStorage
  // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
  localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
  localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

  // Remove userData from localStorage
  localStorage.removeItem('userData')

  localStorage.clear()
  sessionStorage.clear()

  // Reset ability
  ability.update(initialAbility)

  // Redirect to login page
  router.push({ name: 'auth-login' })
}
