<script>
export default {
  name: 'AuthTemplate',
}
</script>

<template>
  <v-main class="login-wrap">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <router-view></router-view>
      </v-layout>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.login-wrap {
  &::before {
    position: absolute;
    top: 0%;
    left: 50%;
    width: 100%;
    height: 50%;
    content: '';
    background-color: rgba(0, 0, 0, 0.75);
    transform: translate(-50%, 0%);
  }
}
</style>
