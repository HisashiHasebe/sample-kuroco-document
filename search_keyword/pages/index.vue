<template>
  <div>
    <form class="search-form" @submit.prevent="search">
      <label>
        Keyword
        <input v-model="searchInput.keyword" type="text" />
      </label>
      <button type="submit">Search</button>
    </form>
    <SearchResult :search-result="searchResult" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: {
        keyword: '',
      },
      searchResult: {},
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    async search() {
      let searchResult;
      try {
        // 自分の環境で設定したエンドポイントのURLに置き換えてください
        const response = await this.$axios.get('/rcms-api/5/content_keyword', {
          params: {
            filter: this.buildFilterQuery(),
          },
        });
        searchResult = response?.data || {};
      } catch (errorResponse) {
        searchResult = {
          errors: errorResponse?.data?.errors || ['Unexpected error'],
        };
      }
      this.searchResult = searchResult;
    },
    // filterクエリの生成
    buildFilterQuery() {
      const filterQuery = Object.entries(this.searchInput)
        .reduce((queries, [col, value]) => {
          switch (col) {
            case 'keyword':
              if (value !== '') {
                queries.push(`${col} contains "${value}"`);
              }
              break;
            default:
              break;
          }
          return queries;
        }, [])
        .join(' AND ');
      return filterQuery;
    },
  },
};
</script>

<style scoped>
.search-form {
  border: 1px solid;
  padding: 10px;
}
.search-form label {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin: 0.5rem 0;
}
</style>
