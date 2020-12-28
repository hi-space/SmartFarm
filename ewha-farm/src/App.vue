<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
  </div>
  <!-- <div>
    token: {{ myToken }}
  </div> -->
</template>

<script>
import themeConfig from '@/../themeConfig.js'
import { myToken, messaging } from '@/services/messaging'

export default {
  data () {
    return {
      vueAppClasses: [],
      myToken: myToken,
    }
  },
  methods: {
    toggleClassInBody (className) {
      if (document.body.className.match('theme-dark'))      document.body.classList.remove('theme-dark')
      if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
    },
    setAppClasses (classesStr) {
      this.vueAppClasses.push(classesStr)
    },
    handleWindowResize () {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    },
    handleScroll () {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY)
    }
  },
  mounted () {
    this.toggleClassInBody(themeConfig.theme)
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

    const vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
  async created () {
    document.documentElement.setAttribute('dir', 'ltr')

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)

    messaging.onMessage((payload) => {
        console.log(payload);

        this.$vs.notify({
                        color:'success',
                        title:'FCM Noti',
                        text: payload.notification.body
                    })

        const title = 'Title';
        const options = {
            body: payload.notification.body,
            icon: '/firebase-logo.png',
        };
        const notification = new Notification(title, options);
        return notification;
    });
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
  }
}

</script>
