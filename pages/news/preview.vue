<template>
  <div>
    <p>ニュース一覧ページ{{ this.$route.params.page }}</p>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/news/${n.topics_id}`"
        >{{ n.ymd }} {{ n.subject }}</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const previewResponse = await $axios.$get(
      `/rcms-api/6/news/preview?preview_token=${route.query.preview_token}`
    );
    return { response: { list: [previewResponse.details] } };
  },
};
</script>
