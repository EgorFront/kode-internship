export const state = {
  userData: {},
}

export const getters = {
  loggedIn: (state) => !!Object.keys(state.userData).length,
}

export const mutations = {
  setUserData(state, payload) {
    state.userData = payload
  },
}

export const actions = {
  init() {},
}
