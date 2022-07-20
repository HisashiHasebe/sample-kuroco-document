<template>
  <div>
    <LanguageSwitcher />

    <h1 class="title">{{ $t('news.title') }}</h1>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="localePath(`/${n.topics_id}`)">
        {{ n.ymd }} {{ n.subject }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, i18n }) {
    return {
      response: await $axios.$get(`/rcms-api/4/news`, {
        params: {
          _lang: i18n.locale,
        },
      }),
    };
  },
};
</script>
