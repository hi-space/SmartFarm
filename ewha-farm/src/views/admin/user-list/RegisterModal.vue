<template>
  <div class="auth-inner py-2">
    <!-- Register -->
    <b-card
      refs="register-form"
      class="mb-0"
    >
      <h2 class="text-primary text-center p-2">
        <strong> 회원 등록 </strong>
      </h2>

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
    </b-card>
    <!-- /Register v1 -->

  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BCard, BForm,
  BButton, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/forms'

export default {
  components: {
    // BSV
    BCard,
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
    register() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          const payload = {
            phone: this.phone,
            name: this.name,
            address: this.address,
            password: this.password,
          }
          this.$store.dispatch('auth/register', payload)
            .then(response => {
              console.log(response)
              this.$bvModal
                .msgBoxOk('관리자의 승인이 있을 때 까지 기다려주세요', {
                  title: '회원가입 완료',
                  size: 'sm',
                  hideHeaderClose: true,
                  centered: true,
                })
                .then(value => {
                  if (value === true) {
                    this.$router.push({ name: 'auth-login' })
                  }
                })
            }).catch(error => {
              console.log(error)
              this.$bvModal
                .msgBoxOk('사용자 정보를 다시 입력하세요', {
                  title: '회원가입 실패',
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
