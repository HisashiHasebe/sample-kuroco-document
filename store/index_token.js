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
    },
    updateLocalStorage (state, payload) {
        Object.entries(payload).forEach(([key, val]) => {
            localStorage.setItem(key, val)
        })
    },
    setAccessTokenOnRequestHeader (state, { rcmsApiAccessToken }) {
        this.$axios.defaults.headers.common = {
            'X-RCMS-API-ACCESS-TOKEN': rcmsApiAccessToken
        }
    }
}

export const actions = {
    async login ({ commit }, payload) {
        const { grant_token } = await this.$axios.$post('/rcms-api/9/login', payload)
        const { access_token } = await this.$axios.$post(
            '/rcms-api/9/token',
            { grant_token }
        )

        commit('updateLocalStorage', { rcmsApiAccessToken: access_token.value })
        commit('setAccessTokenOnRequestHeader', { rcmsApiAccessToken: access_token.value })

        const profileRes = await this.$axios.$get('/rcms-api/9/profile')
        commit('setProfile', { profile: profileRes.data })
    },
    async logout ({ commit }) {
        try {
            await this.$axios.$post(process.env.BASE_URL + '/rcms-api/1/logout')
        } catch {
            /** No Process */
            /** エラーが返却されてきた場合は、結果的にログアウトできているものとみなし、これを無視します。 */
        }
        commit('setProfile', { profile: null })
        commit('updateLocalStorage', { rcmsApiAccessToken: null })
        commit('setAccessTokenOnRequestHeader', { rcmsApiAccessToken: null })

        this.$router.push('/login')
    },
    async restoreLoginState ({ commit, dispatch }) {
        const rcmsApiAccessToken = localStorage.getItem('rcmsApiAccessToken')
        const authenticated = typeof rcmsApiAccessToken === 'string' && rcmsApiAccessToken.length > 0

        if (!authenticated) {
            await dispatch('logout')
            throw new Error('need to login')
        }

        try {
            commit('setAccessTokenOnRequestHeader', { rcmsApiAccessToken })
            const profileRes = await this.$axios.$get('/rcms-api/9/profile')
            commit('setProfile', { profile: profileRes.data })
        } catch {
            await dispatch('logout')
            throw new Error('need to login')
        }
    }
}