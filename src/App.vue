<template>
  <v-app>
    <transition mode="out-in" name="fade">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import HelloWorld from '@components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
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
