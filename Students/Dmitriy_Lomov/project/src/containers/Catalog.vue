<template>
  <div class="d-flex flex-column">
    <div
      class="products d-flex flex-wrap justify-content-center align-items-center"
    >
      <item v-for="item of filtered" :key="item._id" :item="item" />
    </div>
    <div>
      <item
        v-if="this.isAdmin"
        class="d-flex justify-content-center align-items-center p-5"
        :type="'temp'"
        @createnew="addNewCatalogItem"
      />
    </div>
  </div>
</template>

<script>
import item from "../components/Item.vue";

export default {
  components: { item },
  data() {
    return {
      items: [],
      filtered: [],
      isAdmin: false,
      url: "/api/catalog",
    };
  },
  mounted() {
    this.$parent.get(this.url).then((d) => {
      this.items = d;
      this.filtered = d;
    });
  },
  methods: {
    filter(str) {
      let reg = new RegExp(str, "i");
      this.filtered = this.items.filter((el) => reg.test(el.name));
    },
    addNewCatalogItem(item) {
      let newItem = JSON.parse(JSON.stringify(item));
      this.$parent.post("/api/catalog/", newItem).then((res) => {
        if (res.id) {
          this.items.push(Object.assign({}, newItem, { id_product: res.id }));
        }
      });
    },
  },
};
</script>

<style></style>
