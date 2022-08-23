<template>
  <form @submit.prevent="login">
    <p v-if="loginStatus !== null" :style="{ color: resultMessageColor }">
      {{ resultMessage }}
    </p>

    <input v-model="email" name="email" type="email" placeholder="email" />
    <input
      v-model="password"
      name="password"
      type="password"
      placeholder="password"
    />
    <button type="submit">ログイン</button>
    
    <div>
      <nuxt-link to="/news">
      ニュース一覧ページへ
      </nuxt-link>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',

      loginStatus: null,
      resultMessage: null
    };
  },
  computed: {
    resultMessageColor () {
      switch (this.loginStatus) {
      case 'success':
        return 'green'
      case 'failure':
        return 'red'
      default:
        return ''
      };
    }
  },
  methods: {
    async login () {
      // ダミーリクエスト(1秒待機の後成功/失敗する)
      const shouldSuccess = true
      const request = new Promise((resolve, reject) =>
          setTimeout(
            () => (shouldSuccess ? resolve() : reject(Error('login failure'))),
            1000
          )
      )

      try {
        await request
        this.$store.commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.state.profileに適用

        this.loginStatus = 'success'
        this.resultMessage = 'ログインに成功しました。'
      } catch (e) {
        this.loginStatus = 'failure'
        this.resultMessage = 'ログインに失敗しました。'
      };
    }
  },
};
</script>
