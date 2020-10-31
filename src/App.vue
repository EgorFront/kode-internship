<template>
  <v-app>
    <transition mode="out-in" name="fade">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({}),
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.25s;
  transition-property: opacity, border-color, background-color;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
