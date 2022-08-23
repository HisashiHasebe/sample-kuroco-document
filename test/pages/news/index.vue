<template>
  <div>
    <p>ニュース一覧ページ</p>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/${n.topics_id}`">
        {{ n.ymd }} {{ n.subject }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({ $axios }) {
    return {
      response: await $axios.$get('/rcms-api/4/news'),
    };
  },
};
</script>
