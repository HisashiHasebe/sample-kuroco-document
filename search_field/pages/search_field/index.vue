<template>
  <div>
    <form class="search-form" @submit.prevent="search">
      <label>
        Title
        <input v-model="searchInput.subject" type="text" />
      </label>
      <label>
        Created at
        <input v-model="searchInput.inst_ymdhi.from" type="date" />
        ~
        <input v-model="searchInput.inst_ymdhi.to" type="date" />
      </label>
      <label>
        Text
        <input v-model="searchInput.ext_1" type="text" />
      </label>
      <label>
        Select
        <select v-model="searchInput.ext_2">
          <option value="">Not selected</option>
          <option value="01">option1</option>
          <option value="02">option2</option>
          <option value="03">option3</option>
        </select>
      </label>
      <label>
        Checkbox
        <input v-model="searchInput.ext_3" type="checkbox" value="01" />option1
        <input v-model="searchInput.ext_3" type="checkbox" value="02" />option2
        <input v-model="searchInput.ext_3" type="checkbox" value="03" />option3
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
        subject: '',
        inst_ymdhi: {
          from: '',
          to: '',
        },
        ext_1: '',
        ext_2: '',
        ext_3: [],
      },
      searchResult: {},
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    // エンドポイントへのリクエストを行い、取得結果をsearchResultに格納
    async search() {
      let searchResult;
      try {
        // 自分の環境で設定したエンドポイントのURLに置き換えてください
        const response = await this.$axios.get('/rcms-api/5/content', {
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
            // 日付: 範囲指定
            case 'inst_ymdhi':
              if (value.from !== '') {
                queries.push(`${col} >= "${value.from}"`);
              }
              if (value.to !== '') {
                queries.push(`${col} <= "${value.to}"`);
              }
              break;
            // テキスト: 部分一致
            case 'subject':
            case 'ext_1':
              if (value !== '') {
                queries.push(`${col} contains "${value}"`);
              }
              break;
            // 選択(select): 完全一致
            case 'ext_2':
              if (value !== '') {
                queries.push(`${col} = "${value}"`);
              }
              break;
            // 複数選択(checkbox): 部分一致
            case 'ext_3':
              if (value.length > 0) {
                queries.push(
                  '(' +
                    value.map((v) => `${col} contains "${v}"`).join(' OR ') +
                    ')'
                );
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
