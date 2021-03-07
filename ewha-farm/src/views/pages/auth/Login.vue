<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <logo />
          <h2 class="brand-text text-primary ml-1">
            Ewha Farm
          </h2>
        </b-link>

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="login"
          >

            <!-- phone -->
            <b-form-group
              label-for="phone"
              label="핸드폰 번호"
            >
              <validation-provider
                #default="{ errors }"
                name="핸드폰 번호"
                rules="required"
              >
                <b-form-input
                  id="phone"
                  v-model="userId"
                  name="login-id"
                  :state="errors.length > 0 ? false:null"
                  placeholder="01012345678"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label-for="password"
              label="비밀번호"
            >
              <validation-provider
                #default="{ errors }"
                name="비밀번호"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="******"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <div class="divider my-2" />

            <!-- submit button -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
            >
              로그인
            </b-button>
          </b-form>
        </validation-observer>

        <div class="divider my-2">
          <div class="divider-text">
            or
          </div>
        </div>

        <b-card-text class="text-center mt-2">
          <b-button
            variant="secondary"
            block
            :to="{name:'auth-register'}"
          >
            회원가입
          </b-button>
        </b-card-text>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { deviceToken } from '@/services/messaging'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardText, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ability from '@/libs/acl/ability'

export default {
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BLink,
    Logo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    // BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userId: '',
      password: '',
      status: '',
      // validation rules
      required,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeOffIcon' : 'EyeIcon'
    },
  },
  methods: {
    async login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const payload = {
            phone: this.userId,
            password: this.password,
          }

          useJwt.login({
            phone: payload.phone,
            // password: bcrypt.hashSync(payload.password, bcrypt.genSaltSync(10)),
            password: payload.password,
          }).then(response => {
            console.log(response)
            const { userData } = response.data

            useJwt.setToken(response.data.accessToken)
            useJwt.setRefreshToken(response.data.refreshToken)

            localStorage.setItem('userData', JSON.stringify(userData))
            ability.update(userData.ability)

            const params = {
              token: deviceToken.value,
            }
            this.$store.dispatch('users/addDeviceToken', { id: response.id, queryBody: params }).then(() => {
              localStorage.setItem('deviceToken', deviceToken.value)
            })

            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `환영합니다 ${response.name}님`,
                icon: 'CoffeeIcon',
                variant: 'success',
              },
            })

            router.push(getHomeRouteForLoggedInUser())
          }).catch(err => {
            console.log(err)
            this.$bvModal
              .msgBoxOk('사용자 정보를 다시 입력하세요', {
                title: '로그인 실패',
                size: 'sm',
                hideHeaderClose: true,
                centered: true,
              })
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
