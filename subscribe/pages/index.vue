<template>
  <div>
    <form>
      <h1>マガジン登録</h1>
      <p v-if="resultMessage !== null">
        {{ resultMessage }}
      </p>
      <input
        v-model="emailEntered"
        name="email"
        type="email"
        placeholder="email"
      />
      <button @click.prevent="subscribeSubmit">購読する</button>
      <button @click.prevent="unsubscribeSubmit">購読解除する</button>
      <button @click.prevent="sendTestMail">テスト送信する</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailEntered: '',
      resultMessage: null,
    };
  },
  methods: {
    //購読するクリック時の動作
    async subscribeSubmit() {
      try {
        const response = await this.$axios.$post(
          `/rcms-api/11/magazine_subscribe/1`,
          {
            email: this.emailEntered,
          }
        );
        this.resultMessage = response.messages[0];
      } catch (error) {
        this.resultMessage = error.response.data.errors[0].message;
      }
    },
    //購読解除するクリック時の動作
    async unsubscribeSubmit() {
      try {
        const response = await this.$axios.$post(
          `/rcms-api/11/magazine_unsubscribe/1`,
          {
            email: this.emailEntered,
          }
        );
        this.resultMessage = response.messages[0];
      } catch (error) {
        this.resultMessage = error.response.data.errors[0].message;
      }
    },
    //テスト送信するクリック時の動作
    async sendTestMail() {
      try {
        await this.$axios.$post(`/rcms-api/11/magazine_sendMail`, {
          mail_to: this.emailEntered,
        });
        this.resultMessage = 'テストメールを送信しました。';
      } catch (error) {
        this.resultMessage = error.response.data.errors[0].message;
      }
    },
  },
};
</script>
