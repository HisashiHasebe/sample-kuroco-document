<template>
    <div>
      <header>
        <nuxt-link :to="switchLocalePath('en')">{{ $t('links.en') }}</nuxt-link>|<nuxt-link :to="switchLocalePath('ja')">{{ $t('links.ja') }}</nuxt-link>
      </header>
      <h1 class="title">{{ response.details.subject }}</h1>
      <div class="post" v-html="response.details.contents"></div>
    </div>
</template>

<script>
export default {
    async asyncData ({ $axios, params, app }) {
        try {
            const response = await $axios.$get(
                `/rcms-api/4/newsdetail/${params.slug}?_lang=${app.i18n.locale}`
                )
            console.log(response);
            return { response }
            }catch (e) {
                console.log(e.message)
                }
    }
}
</script>