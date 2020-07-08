<template>
  <form
    action="#"
    class="search-form"
    @submit.prevent="$emit('search', searchStr)"
  >
    <input type="text" class="search-field" v-model="searchStr" />
    <button class="btn-search ml-2">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchStr: "",
    };
  },
};
</script>

<style scoped>
.btn-search {
  background: inherit;
  border: none;
  color: #ea1772;
  padding: 5px;
  outline: none;
  transition: all ease 0.3s;
}
.btn-search:hover {
  color: #dfe7ec;
}
.btn-search:focus {
  border-bottom: 1px solid #ea1772;
}
</style>
