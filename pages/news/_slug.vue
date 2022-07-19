<template>
  <div>
    <header>
      <nuxt-link :to="switchLocalePath('en')">{{ $t('links.en') }}</nuxt-link>
      |
      <nuxt-link :to="switchLocalePath('ja')">{{ $t('links.ja') }}</nuxt-link>
    </header>

    <h1 class="title">{{ response.details.subject }}</h1>
    <div class="post" v-html="response.details.contents"></div>

    <NewsComment
      v-if="response && $store.getters.authenticated"
      :topics_id="response.details.topics_id"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, i18n, params }) {
    return {
      response: await $axios.$get(`/rcms-api/4/newsdetail/${params.slug}`, {
        params: {
          _lang: i18n.locale,
        },
      }),
    };
  },
  mounted() {
    this.$store.dispatch('restoreLoginState', { disableRedirect: true }); // restores login state without redirect
  },
};
</script>
