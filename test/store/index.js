export const state = () => ({
  profile: null
})

export const getters = {
  authenticated (state) {
      return state.profile !== null
  }
}

export const mutations = {
  setProfile (state, { profile }) {
      state.profile = profile
  }
}

export const actions = {
  async restoreLoginState ({ commit }) {
    const authenticated = JSON.parse(localStorage.getItem('authenticated'))
    
    if (!authenticated) {
      throw new Error('need to login')
    }
    commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.
    await null
  }
}