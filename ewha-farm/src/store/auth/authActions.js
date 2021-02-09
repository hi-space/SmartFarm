/* eslint-disable import/no-cycle */
import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ability from '@/libs/acl/ability'
// import bcrypt from 'bcryptjs'

export default {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      useJwt.login({
        phone: payload.phone,
        // password: bcrypt.hashSync(payload.password, bcrypt.genSaltSync(10)),
        password: payload.password,
      }).then(response => {
        if (response.status === 200) {
          const { userData } = response.data

          useJwt.setToken(response.data.accessToken)
          useJwt.setRefreshToken(response.data.refreshToken)

          localStorage.setItem('userData', JSON.stringify(userData))
          ability.update(userData.ability)

          commit('UPDATE_USER_INFO', userData)

          router.push(getHomeRouteForLoggedInUser())
          resolve(userData)
        } else {
          reject(response)
        }
      }).catch(err => { reject(err) })
    })
  },

  register({ commit }, payload) {
    return new Promise((resolve, reject) => {
      useJwt.register(payload).then(response => {
        resolve(response)
        commit('UPDATE_USER_INFO')
      }).catch(err => { reject(err) })
    })
  },
}
