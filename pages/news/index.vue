<template>
  <div>
    <p>ニュース一覧ページ{{ this.$route.params.page }}</p>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/news/${n.topics_id}`"
        >{{ n.ymd }} {{ n.subject }}</nuxt-link
      >
    </div>

    <Pagenator
      v-if="
        $route.query.all === undefined &&
        $route.query.preview_token === undefined
      "
      v-bind="{ ...response.pageInfo }"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const previewToken = route.query.preview_token;
    if (previewToken !== undefined) {
      const previewResponse = await $axios.$get(
        '/rcms-api/6/news/preview' + '?preview_token=' + previewToken
      );
      return { response: { list: [previewResponse.details] } };
    }

    return {
      response: await $axios.$get('/rcms-api/7/news', {
        params: {
          cnt: route.query.all !== undefined ? 999 : null,
          pageID: route.query.page || 1,
        },
      }),
    };
  },
};
</script>
