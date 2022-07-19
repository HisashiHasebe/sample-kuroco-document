<template>
  <div>
    <h1 class="title">{{ response.details.subject }}</h1>
    <div class="post" v-html="response.details.contents"></div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, i18n, params }) {
    return {
      response: await $axios.$get(`/rcms-api/6/newsdetail/${params.slug}`, {
        params: {
          _lang: i18n.locale,
        },
      }),
    };
  },
};
</script>
