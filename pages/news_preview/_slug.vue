<template>
    <div>
      <h1 class="title">{{ response.details.subject }}</h1>
      <div class="post" v-html="response.details.contents"></div>
    </div>
</template>

<script>
export default {
    async asyncData ({ route, $axios, params }) {

        const requestNews = async () => {
            const response = await $axios.$get(`/rcms-api/6/newsdetail/${params.slug}`);
            return { response };
        };
        const requestNewsPreview = async (previewToken) => {
            const response = await $axios.$get('/rcms-api/6/news/preview' + '?preview_token=' + previewToken);
            return { response };
        };

        // URLのクエリに、
        // preview_tokenが存在する場合は、previewエンドポイントへ、
        // preview_tokenが存在しない場合は、newsエンドポイントへ、
        // リクエストします。
        try {
            const previewToken = route.query.preview_token;
            return previewToken !== undefined ?
                await requestNewsPreview(previewToken) :
                await requestNews();
        }catch (e) {
            console.log(e.message)
        }
    }
}
</script>