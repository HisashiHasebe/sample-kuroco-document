<template>
  <div>
    <button type="button" @click="logout">
      ログアウト
    </button>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/news/${n.topics_id}`">{{n.ymd}} {{n.subject}}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    middleware: 'auth',
    async asyncData ({ $axios }) {
        try {
            const response = await $axios.$get('/rcms-api/4/news');
            return { response }
        }catch (e) {
            console.log(e.message)
        }
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>