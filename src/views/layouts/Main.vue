<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MainLayout',

  data() {
    return {
      profileItems: [
        {
          icon: 'mdi-exit-to-app',
          title: 'Log Out',
          click: async () => {
            const vm = this

            await vm.logout()
            vm.$router.push({ name: 'login' })
          },
        },
      ],
    }
  },

  computed: {
    ...mapGetters('user', ['getUserData']),
  },

  methods: {
    ...mapActions('auth', ['logout']),
  },
}
</script>

<template>
  <div>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        origin="center center"
        :nudge-bottom="10"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn class="mr-1" dense large text :ripple="false" v-on="on">
            <v-avatar size="42px">
              <img src="https://via.placeholder.com/50" />
            </v-avatar>
            <p class="ml-2 my-0 mr-0">{{ getUserData.login }}</p>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in profileItems"
            :key="index"
            ripple="ripple"
            @click="item.click"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <transition mode="out-in" name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </div>
</template>
