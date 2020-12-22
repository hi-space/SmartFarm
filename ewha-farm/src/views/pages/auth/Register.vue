<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-register">
    <div class="vx-col sm:w-2/3 md:w-2/3 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div class="vx-row no-gutter justify-center items-center">
          <div class="vx-col sm:w-2/3 md:w-2/3 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <div class="vx-row hidden lg:block mt-4 mb-4">
              <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto">
            </div>

            <div class="px-8 pt-8 register-tabs-container">
              <div class="vx-card__title mb-4">
                <h3 class="mb-4">회원가입</h3>
              </div>

              <div class="vx-col mt-12 mb-2 w-full clearfix">
                <vs-input v-validate="'required|numeric|min:10|max:11'" label-placeholder="핸드폰 번호" name="mobile_phone"
                  placeholder="핸드폰 번호" v-model="mobile_phone" class="w-full" icon-pack="feather" icon="icon-smartphone"
                  icon-no-border />
                  <span class="text-danger text-sm">{{ errors.first('mobile_phone') }}</span>

                <vs-input ref="password" type="password" data-vv-validate-on="blur" v-validate="'required|min:4|max:12'"
                  name="password" label-placeholder="비밀번호" placeholder="비밀번호" v-model="password" class="w-full mt-6"
                  icon-pack="feather" icon="icon-lock" icon-no-border />
                  <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                <vs-input type="password" v-validate="'min:4|max:12|confirmed:password'" data-vv-validate-on="blur"
                  data-vv-as="password" name="confirm_password" label-placeholder="비밀번호 확인" placeholder="비밀번호 확인"
                  v-model="confirm_password" class="w-full mt-6" icon-pack="feather" icon="icon-lock" icon-no-border />
                  <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>

                <vs-input class="w-full mt-6" icon-pack="feather" icon="icon-user" icon-no-border label-placeholder="이름"
                  name="name" v-model="name" />
                  <span class="text-danger text-sm">{{ errors.first('name') }}</span>

                <vs-input class="w-full mt-6" icon-pack="feather" icon="icon-command" icon-no-border
                  label-placeholder="농장 주소" name="address" v-model="address" />
                  <span class="text-danger text-sm">{{ errors.first('address') }}</span>
              </div>

              <div class="vx-col w-full mt-12">
                <vs-button color="warning" type="border" class="mb-2" @click="$router.go(-1)"> 돌아가기 </vs-button>
                <vs-button class="float-right" @click="registerUserJWt" :disabled="!validateForm">회원가입</vs-button>
              </div>
            </div>
          </div>
        </div>

      </vx-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mobile_phone: '',
        password: '',
        confirm_password: '',
        name: '',
        address: ''
      }
    },
    computed: {
      validateForm() {
        return !this.errors.any() && this.mobile_phone !== '' && this.name !== '' && this.password !== '' && this.confirm_password !== '' &&
          this.address !== ''
      }
    },
    methods: {
      checkLogin() {
        if (this.$store.state.auth.isUserLoggedIn()) {
          this.$vs.notify({
            title: 'Login Attempt',
            text: 'You are already logged in!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning'
          })

          return false
        }
        return true
      },
      registerUserJWt() {
        if (!this.validateForm || !this.checkLogin()) return

        const payload = {
          userDetails: {
            mobile_phone: this.mobile_phone,
            password: this.password,
            confirmPassword: this.confirm_password,
            name: this.name,
            address: this.address,
          },
          notify: this.$vs.notify
        }
        this.$store.dispatch('auth/registerUserJWT', payload)
      }
    }
  }
</script>

<style lang="scss">
  .register-tabs-container {
    min-height: 517px;

    .con-tab {
      padding-bottom: 23px;
    }
  }
</style>
