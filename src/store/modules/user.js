export const state = {
  userData: {},
}

export const getters = {
  loggedIn: (state) => !!Object.keys(state.userData).length,
  getUserData: (state) => state.userData,
}

export const mutations = {
  setUserData(state, payload) {
    state.userData = payload
  },
}

export const actions = {
  init() {},
}
