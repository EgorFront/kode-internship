<script>
import wait from '@/src/utils/wait'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      otp: '123456',
      loading: false,
    }
  },

  validations: {
    otp: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(6),
    },
  },

  computed: {
    otpError() {
      return this.$helperValidate('otp', {
        minLength: {
          text: 'Одноразовый пароль должен состояить из {} символов',
          param: 'min',
        },
        maxLength: {
          text: 'Одноразовый пароль должен состояить из {} символов',
          param: 'max',
        },
      })
    },
  },

  methods: {
    async validateOtp() {
      this.$v.$touch()
      if (this.$v.$error || this.loading) return void 0

      this.loading = true

      try {
        await wait(500)
      } catch (error) {
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
        <v-form ref="loginForm" @submit.prevent="validateOtp">
          <v-text-field
            v-model="otp"
            append-icon="mdi-lock"
            name="login"
            label="Login"
            type="text"
            :error-messages="otpError"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block color="primary" :loading="loading" @click="validateOtp">
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
