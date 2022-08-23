// KurocoとNuxt.jsで、ログイン画面を構築するで設定
// https://kuroco.app/ja/docs/tutorials/integrate-login/
// Cookie利用の記述になっているのでアクセストークン利用にする場合は index_token.js の内容を上書きしてください。

export const state = () => ({
  profile: null
})

export const getters = {
  authenticated(state) {
    return state.profile !== null
  }
}

export const mutations = {
  setProfile(state, { profile }) {
    state.profile = profile
  },
  updateLocalStorage(state, payload) {
    Object.entries(payload).forEach(([key, val]) => {
      localStorage.setItem(key, val)
    })
  }
}

export const actions = {
  async login({ commit }, payload) {
    const { grant_token } = await this.$axios.$post('/rcms-api/9/login', payload)
    const { access_token } = await this.$axios.$post(
        '/rcms-api/9/token',
        { grant_token }
    )
    
    commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.state.profileに適用
    commit('updateLocalStorage', { authenticated: true })
  },
  async restoreLoginState ({ commit }) {
    const authenticated = JSON.parse(localStorage.getItem('authenticated'))
    
    if (!authenticated) {
      throw new Error('need to login')
    }
    commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.
    await null
  }
}