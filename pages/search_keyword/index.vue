<template>
  <div>
    <div class="search-form">
      <p>
        <label for="keyword">Keyword</label>
        <input v-model="searchInput.keyword" type="text">
      </p>
      <button type="button" @click="search">Search</button>
    </div>
    <div v-if="Object.keys(searchResult).length > 0" class="search-result">
      <template v-if="(searchResult.errors || []).length === 0">
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created at</th>
            <th>Text</th>
            <th>Select</th>
            <th>Checkbox</th>
          </tr>
          <tr v-for="content in searchResult.list" :key="content.topics_id">
            <td>{{ content.topics_id }}</td>
            <td>{{ content.subject }}</td>
            <td>{{ content.inst_ymdhi }}</td>
            <td>{{ content.ext_1 }}</td>
            <td>{{ content.ext_2 }}</td>
            <td>{{ content.ext_3 }}</td>
          </tr>
        </table>
      </template>
      <template v-else>
        {{ searchResult.errors }}
      </template>
    </div>
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
    }
  },
  mounted() {
    this.search();
  },
  methods: {
  async search() {
      let searchResult;
      try {
        // 自分の環境で設定したエンドポイントのURLに置き換えてください
        const response = await this.$axios.get("/rcms-api/5/content_keyword", {
          params: {
            filter: this.buildFilterQuery()
          }
        })
        searchResult = response?.data || {};
      } catch(errorResponse) {
        searchResult = { errors: errorResponse?.data?.errors || ['Unexpected error'] };
      }
      this.searchResult = searchResult;
    },
    // filterクエリの生成
    buildFilterQuery() {
      const filterQuery = Object.entries(this.searchInput).reduce((queries, [col, value]) => {
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
      }, []).join(' AND ');
      return filterQuery;
    }
  }
}
</script>

<style scoped>
.search-form {
  border: 1px solid;
  padding: 10px;
}
.search-form label {
  display: block;
  float: left;
  width: 100px;
}
.search-result {
  width: 100%;
  margin-top: 20px;
}
.search-result table, th, td {
  border: solid 1px;
  border-collapse: collapse;
}
.search-result th, td {
  padding: 5px;
}
.search-result table {
  width: 100%;
}
</style>