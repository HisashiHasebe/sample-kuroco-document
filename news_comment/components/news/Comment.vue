<template>
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
      <input v-model="inputComment" type="text" placeholder="comment" />
      <button type="submit" :disabled="inputComment === ''">submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    topics_id: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      userName: '',
      comments: [],
      inputComment: '',
      resultMessage: null,
    };
  },
  methods: {
    async getAllComments(topics_id) {
      const { list } = await this.$axios.$get('/rcms-api/12/comments', {
        params: {
          module_id: topics_id,
          cnt: 999,
        },
      });
      return list;
    },
    async submitComment() {
      await this.$axios.$post('/rcms-api/12/comment', {
        module_id: this.topics_id,
        name: `${this.profile.name1} ${this.profile.name2}`,
        mail: this.profile.email,
        note: this.inputComment,
      });
      this.comments = await this.getAllComments(this.topics_id);
      this.inputComment = '';
    },
    async deleteComment(commentId) {
      try {
        await this.$axios.$post(`/rcms-api/12/comment_delete/${commentId}`, {});
        this.comments = await this.getAllComments(this.topics_id);
        this.inputComment = '';
      } catch (error) {
        this.resultMessage = error.response.data.errors[0].message;
      }
    },
  },
  async mounted() {
    this.profile = await this.$axios.$get('/rcms-api/9/profile');
    this.comments = await this.getAllComments(this.topics_id);
  },
};
</script>
