<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <logo />
          <h2 class="brand-text text-primary ml-1">
            Ewha Farm
          </h2>
        </b-link>

        <!-- form -->
        <validation-observer
          ref="registerForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="register"
          >
            <!-- mobile -->
            <b-form-group
              label="핸드폰 번호"
              label-for="phone"
            >
              <validation-provider
                #default="{ errors }"
                name="핸드폰 번호"
                rules="required"
              >
                <b-form-input
                  id="phone"
                  v-model="phone"
                  :state="errors.length > 0 ? false:null"
                  name="phone"
                  placeholder="01012345678"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- username -->
            <b-form-group
              label="이름"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="이름"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  :state="errors.length > 0 ? false:null"
                  name="name"
                  placeholder="홍길동"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- address -->
            <b-form-group
              label="농장 주소"
              label-for="address"
            >
              <validation-provider
                #default="{ errors }"
                name="농장 주소"
                rules="required"
              >
                <b-form-input
                  id="address"
                  v-model="address"
                  :state="errors.length > 0 ? false:null"
                  name="address"
                  placeholder="서울시 용산구"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="비밀번호"
              label-for="password"
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
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password confirm-->
            <b-form-group
              label="비밀번호 확인"
              label-for="passwordConfirm"
            >
              <validation-provider
                #default="{ errors }"
                name="비밀번호 확인"
                rules="required|confirmed:비밀번호"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="passwordConfirm"
                    v-model="passwordConfirm"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="passwordConfirm"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
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
              block
              type="submit"
              :disabled="invalid"
            >
              가입하기
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
            @click="$router.go(-1)"
          >
            로그인으로 돌아가기
          </b-button>
        </b-card-text>
      </b-card>
    <!-- /Register v1 -->
    </div>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BCard, BLink, BCardText, BForm,
  BButton, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/forms'

import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    Logo,
    // BSV
    BCard,
    BLink,
    BCardText,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      phone: '',
      name: '',
      address: '',
      password: '',
      passwordConfirm: '',
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
    // validationForm() {
    //   this.$refs.registerForm.validate().then(success => {
    //     if (success) {
    //       this.$toast({
    //         component: ToastificationContent,
    //         props: {
    //           title: 'Form Submitted',
    //           icon: 'EditIcon',
    //           variant: 'success',
    //         },
    //       })
    //     }
    //   })
    // },
    register() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          useJwt.register({
            username: this.name,
            email: this.phone,
            password: this.password,
          })
            .then(response => {
              useJwt.setToken(response.data.accessToken)
              useJwt.setRefreshToken(response.data.refreshToken)
              localStorage.setItem('userData', JSON.stringify(response.data.userData))
              this.$ability.update(response.data.userData.ability)
              this.$router.push('/')
            })
            .catch(error => {
              this.$refs.registerForm.setErrors(error.response.data.error)
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
