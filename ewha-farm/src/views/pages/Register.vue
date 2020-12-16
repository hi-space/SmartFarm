<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto">
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
              <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Create Account</h4>
                  <p>Fill the below form to create a new account.</p>
                </div>


                <div class="vx-row mb-2">
                  <div class="vx-col w-full">
                    <vs-input class="w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border
                      label-placeholder="Mobile" v-model="input23" />
                  </div>
                </div>
                <div class="vx-row mb-2">
                  <div class="vx-col w-full">
                    <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border
                      label-placeholder="Password" v-model="input24" />
                  </div>
                </div>
                <div class="vx-row mb-2">
                  <div class="vx-col w-full">
                    <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border
                      label-placeholder="Name" v-model="input21" />
                  </div>
                </div>
                <div class="vx-row mb-2">
                  <div class="vx-col w-full">
                    <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border
                      label-placeholder="Farm" v-model="input21" />
                  </div>
                </div>
                <div class="vx-row mb-6"/>
                <div class="vx-row">
                  <div class="vx-col w-full">
                    <vs-button class="mr-3 mb-2">Submit</vs-button>
                    <vs-button color="warning" type="border" class="mb-2"
                      @click="input21 = input22 = input23 = input24 = ''; check6 = false;">Reset</vs-button>
                  </div>
                </div>
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
    components: {

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
