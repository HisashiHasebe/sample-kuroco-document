<template>
  <ul>
    <li>
      <nuxt-link
        :to="{
          path: $route.path,
          query: { page: pageNo - 1 },
        }"
        @click.native="$nuxt.refresh"
        :class="{ disabled: ($route.query.page || 1) <= 1 }"
      >
        前へ
      </nuxt-link>
    </li>

    <li v-for="i in totalPageCnt" :key="i">
      <nuxt-link
        :to="{ path: $route.path, query: { page: i } }"
        @click.native="$nuxt.refresh"
        :class="{
          disabled: pageNo === i,
        }"
      >
        {{ i }}
      </nuxt-link>
    </li>
    <li v-if="pageNo === totalPageCnt">次へ</li>
    <li v-else>
      <nuxt-link
        :to="{
          path: $route.path,
          query: { page: pageNo + 1 },
        }"
        :class="{
          disabled: totalPageCnt === $route.query.page,
        }"
        @click.native="$nuxt.refresh"
      >
        次へ
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pageNo: {
      required: true,
      type: Number,
    },
    totalPageCnt: {
      required: true,
      type: Number,
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
}

.disabled {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
}
</style>
