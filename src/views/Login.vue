<script>
import wait from '@/src/utils/wait'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      userLogin: 'KODE',
      password: '123456',
      hidePassword: true,

      serverError: '',
      showServerError: false,
    }
  },

  validations: {
    userLogin: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(25),
    },

    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(25),
    },
  },

  computed: {
    loginError() {
      return this.$helperValidate('userLogin', {
        minLength: {
          text: 'Минимальная длина логина {} символа',
          param: 'min',
        },
        maxLength: {
          text: 'Максимальная длина логина {} символов',
          param: 'max',
        },
      })
    },
    passwordError() {
      return this.$helperValidate('password', {
        minLength: {
          text: 'Минимальная длина пароля {} символа',
          param: 'min',
        },
        maxLength: {
          text: 'Максимальная длина пароля {} символов',
          param: 'max',
        },
      })
    },
  },

  methods: {
    ...mapActions('auth', ['auth']),

    async tryLogin() {
      this.$v.$touch()
      if (this.$v.$error || this.loading) return void 0

      this.loading = true

      try {
        await wait(1000)

        await this.auth({
          login: this.userLogin,
          password: this.password,
        })

        this.$router.push({ name: 'otp' })
      } catch (error) {
        this.serverError = error.message
        this.showServerError = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <v-flex xs12 sm8 md4 lg4>
    <v-card class="elevation-1 pa-3">
      <v-card-text>
        <div class="layout column align-center">
          <img
            :src="require('@src/assets/logo.png')"
            width="180"
            height="180"
          />
          <h1 class="flex my-4 primary--text">Авторизация</h1>
        </div>
        <v-form ref="loginForm" @submit.prevent="tryLogin">
          <v-text-field
            v-model="userLogin"
            append-icon="mdi-account"
            name="login"
            label="Login"
            type="text"
            :error-messages="loginError"
          />
          <v-text-field
            id="password"
            v-model="password"
            :type="hidePassword ? 'password' : 'text'"
            :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
            name="password"
            label="Password"
            :error-messages="passwordError"
            @click:append="hidePassword = !hidePassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block color="primary" :loading="loading" @click="tryLogin">
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="showServerError"
      color="error"
      :timeout="2000"
      bottom
      left
    >
      {{ serverError }}
    </v-snackbar>
  </v-flex>
</template>
