<template>
  <div>
    <div>
      <h1 class="title">{{ response.details.subject }}</h1>
      <div class="post" v-html="response.details.contents"></div>
    </div>
    <NewsComment v-if="response" :topics_id="response.details.topics_id" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({ $axios, params }) {
    return {
      response: await $axios.$get(`/rcms-api/4/newsdetail/${params.slug}`),
    };
  },
};
</script>
