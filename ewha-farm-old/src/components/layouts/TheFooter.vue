<template functional>
    <footer class="the-footer flex-wrap justify-between float-right" :class="classes">
        <p>
          <span>COPYRIGHT &copy;</span>
          <span>{{ new Date().getFullYear() }} </span>
          <a href="https://google.com" target="_blank" rel="nofollow">Ewha Global</a>
          <span class="hidden sm:inline-block">, All rights Reserved</span>
        </p>
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
