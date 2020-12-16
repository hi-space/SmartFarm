<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
        <p>
          <span>COPYRIGHT &copy;</span>
          <span>{{ new Date().getFullYear() }} </span>
          <a href="https://google.com" target="_blank" rel="nofollow">Ewha Global</a>
          <span class="hidden sm:inline-block">, All rights Reserved</span>
        </p>
        <!-- <span class="md:flex hidden items-center">
            <span>Made with</span>
            <feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="ml-2" />
        </span> -->
    </footer>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
