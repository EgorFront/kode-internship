<script>
import wait from '@/src/utils/wait'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      otp: '123456',
      loading: false,

      showServerError: false,
      serverError: '',
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
          text: 'Одноразовый пароль должен состоять из {} символов',
          param: 'min',
        },
        maxLength: {
          text: 'Одноразовый пароль должен состоять из {} символов',
          param: 'max',
        },
      })
    },
  },

  methods: {
    ...mapActions('auth', ['checkOtp']),

    async validateOtp() {
      this.$v.$touch()
      if (this.$v.$error || this.loading) return void 0

      this.loading = true

      try {
        await wait(500)
        await this.checkOtp(this.otp)

        this.$router.push({ name: 'home' })
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
          <h1 class="flex my-4 primary--text">Подтверждение паролем</h1>
        </div>
        <v-form ref="loginForm" @submit.prevent="validateOtp">
          <v-text-field
            v-model="otp"
            append-icon="mdi-lock"
            name="login"
            label="Code from sms"
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
