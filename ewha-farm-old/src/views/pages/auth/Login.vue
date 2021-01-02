<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col">
      <vx-card>
        <div class="vx-col no-gutter justify-center items-center">
          <div class="vx-row hidden lg:block m-12">
            <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
          </div>

          <div class="p-8 login-tabs-container">
            <div class="vx-card__title mb-4">
              <h3 class="mb-4">로그인</h3>
            </div>
            <div>
              <vs-input name="id" icon-no-border icon="icon icon-smartphone" icon-pack="feather" v-validate="'required|numeric|min:10|max:11'"
                label-placeholder="핸드폰 번호" v-model="id" class="w-full" />
                <span class="text-danger text-sm">{{ errors.first('id') }}</span>

              <vs-input type="password" name="password" icon-no-border icon="icon icon-lock" icon-pack="feather"
                label-placeholder="비밀번호" v-model="password" class="w-full mt-6" />

              <div class="flex flex-wrap justify-between my-5">
                <vs-checkbox v-model="checkbox_remember_me" class="mb-3">아이디, 비밀번호 저장</vs-checkbox>
              </div>
              <vs-button type="border" @click="$router.push('/pages/register').catch(() => {})">회원가입</vs-button>
              <vs-button class="float-right">로그인</vs-button>
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
        id: "",
        password: "",
        checkbox_remember_me: false,
      }
    }
  }
</script>
