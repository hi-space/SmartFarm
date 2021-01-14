import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ability from '@/libs/acl/ability'

export default {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      useJwt.login({
        phone: payload.phone,
        password: payload.password,
      }).then(response => {
        if (response.status === 200) {
          const { userData } = response.data

          useJwt.setToken(response.data.accessToken)
          useJwt.setRefreshToken(response.data.refreshToken)

          localStorage.setItem('userData', JSON.stringify(userData))
          ability.update(userData.ability)

          commit('UPDATE_USER_INFO', userData)

          router.push(getHomeRouteForLoggedInUser(userData.role))
          resolve(response)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Wrong id or password')
        }
      }).catch(err => { reject(err) })
    })
  },

  register(payload) {
    return new Promise((resolve, reject) => {
      useJwt.register({
        userInfo: {
          phone: payload.phone,
          name: payload.name,
          address: payload.address,
          password: payload.password,
        },
      }).then(response => {
        resolve(response)
      }).catch(err => { reject(err) })
    })
  },
}
