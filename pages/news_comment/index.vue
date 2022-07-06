<template>
  <div>
    <h1 class="title">{{ response.details.subject }}</h1>
    <div class="post" v-html="response.details.contents"></div>
    <div>
        <p v-if="resultMessage !== null">
          {{ resultMessage }}
        </p>
        <ul v-for="comment in comments" :key="comment.comment_id">
            <li>
                {{ comment.note }} by {{ comment.name }}
                <button type="button" @click="() => deleteComment(comment.comment_id)">
                    delete
                </button>
            </li>
        </ul>
        <form @submit.prevent="submitComment">
            <input v-model="inputComment" type="text" placeholder="comment">
            <button type="submit" :disabled="inputComment === ''">
                submit
            </button>
        </form>
    </div>
  </div>
</template>

<script>
async function getAllComments (topics_id) {
    const { list } = await this.$axios.$get(
        '/rcms-api/12/comments',
        {
            params: {
                module_id: topics_id,
                cnt: 999
            }
        }
    )
    return list
}

import { mapActions } from 'vuex'
export default {
  middleware: 'auth',
  async asyncData ({ $axios, params }) {
    try {
      const profile = await $axios.$get('/rcms-api/9/profile')
      const response = await $axios.$get(
        '/rcms-api/12/newsdetail/4'
      )
      return { profile, response, comments: await getAllComments.call({ $axios }, response.details.topics_id) }
    } catch (e) {
      console.log(e.message)
    }
  },
  data () {
      return {
          userName: '',
          response: null,
          comments: [],
          inputComment: '',
          resultMessage: null,
      }
  },
  methods: {
    async submitComment () {
        await this.$axios.$post('/rcms-api/12/comment', {
            module_id: this.response.details.topics_id,
            name: `${this.profile.name1} ${this.profile.name2}`,
            mail: this.profile.email,
            note: this.inputComment
            })
            this.comments = await getAllComments.call(this, this.response.details.topics_id)
            this.inputComment = ''
    },
    async deleteComment (commentId) {
      try{
        await this.$axios.$post(`/rcms-api/12/comment_delete/${commentId}`, {})
        this.comments = await getAllComments.call(this, this.response.details.topics_id)
        this.inputComment = ''
      } catch (error) {
         this.resultMessage = error.response.data.errors[0].message
      }
    }
  }
}
</script>