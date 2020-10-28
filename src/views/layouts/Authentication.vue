<script>
export default {
  name: 'AuthTemplate',
}
</script>

<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <router-view></router-view>
      </v-layout>
    </v-container>
  </v-content>
</template>
