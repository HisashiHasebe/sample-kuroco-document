<template>
  <div>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/news/${n.topics_id}`">{{n.ymd}} {{n.subject}}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    async asyncData ({ $axios }) {
        try {
            const response = await $axios.$get('/rcms-api/4/news');
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>