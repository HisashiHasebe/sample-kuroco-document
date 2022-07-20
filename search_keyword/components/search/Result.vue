<template>
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
</template>

<script>
export default {
  props: {
    searchResult: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
.search-result {
  width: 100%;
  margin-top: 20px;
}
.search-result table,
th,
td {
  border: solid 1px;
  border-collapse: collapse;
}
.search-result th,
td {
  padding: 5px;
}
.search-result table {
  width: 100%;
}
</style>
