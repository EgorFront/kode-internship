import LocalStorageController from '../LocalStorageController'

export const state = {}

export const getters = {}

export const mutations = {}

export const actions = {
  async auth({ commit }, payload) {
    try {
      const userDataFromStorage = LocalStorageController.getValue(
        'userData',
        null
      )

      if (userDataFromStorage) {
        const userData = await mockServerAuth(userDataFromStorage)
        commit('user/setUserData', userData, { root: true })
        return void 0
      }

      // const { data } = await axios.post() ...
      await mockServerAuth(payload)
    } catch (error) {
      LocalStorageController.removeValue('userData')
      throw error
    }
  },

  async checkOtp({ commit }, otp) {
    try {
      const userData = await mockServerValidateOtp(otp)

      commit('user/setUserData', userData, { root: true })
      LocalStorageController.setValue('userData', userData)
    } catch (error) {
      throw error
    }
  },

  logout({ commit }) {
    commit('user/setUserData', {}, { root: true })
    LocalStorageController.removeValue('userData')
  },

  init() {},
}

function mockServerAuth(userData) {
  const correctLogin = 'kode@kode.ru'
  const correctPassword = 'Enk0deng'

  const { login, password } = userData

  return new Promise((resolve, reject) => {
    if (login === correctLogin && password === correctPassword) {
      resolve(userData)
    } else {
      reject(new Error('Неверные данные авторизации'))
    }
  })
}

function mockServerValidateOtp(otp) {
  const correctOtp = '123456'
  return new Promise((resolve, reject) => {
    if (correctOtp === otp) {
      resolve({
        login: 'KODE',
        password: '123456',
      })
    } else {
      reject(new Error('Неверный пароль otp'))
    }
  })
}
