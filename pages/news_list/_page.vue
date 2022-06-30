<template>
  <div>
    <p>ニュース一覧ページ{{ this.$route.params.page }}</p>
    <div v-for="n in response.list" :key="n.slug">
      <nuxt-link :to="`/news_list/detail/${n.topics_id}`">{{n.ymd}} {{n.subject}}</nuxt-link>
    </div>

    <ul style="list-style: none; display: flex">
      <li v-if="response.pageInfo.pageNo === 1">前へ</li>
      <li v-else><nuxt-link :to="'/news_list/' + (response.pageInfo.pageNo -1)">前へ</nuxt-link></li>
      <li v-for="i in response.pageInfo.totalPageCnt" :key="i">        
        <nuxt-link :to="'/news_list/' + i">{{i}}</nuxt-link>
      </li>
      <li v-if="response.pageInfo.pageNo === response.pageInfo.totalPageCnt">次へ</li>
      <li v-else><nuxt-link :to="'/news_list/' + (response.pageInfo.pageNo +1)">次へ</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.$get('/rcms-api/7/news',{
          params: {
            pageID: params.page
          },
        }
      )
      return { response }
    } catch (e) {
      console.log(e.message)
    }
  },
}
</script>