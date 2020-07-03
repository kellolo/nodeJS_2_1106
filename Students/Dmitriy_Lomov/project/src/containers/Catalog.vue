<template>
  <div class="wrapper">
    <button class="btn" @click="typeFilter('notebooks')">
      Notebooks
    </button>
    <button class="btn" @click="typeFilter('monitors')">
      Monitors
    </button>
    <button class="btn" @click="typeFilter('periphery')">
      Periphery
    </button>
    <button class="btn" @click="typeFilter('forGamers')">
      For gamers
    </button>
    <button class="btn reset" @click="resetTypeFilter">
      reset
    </button>
    <div class="products">
      <item v-for="item of filtered" :key="item._id" :item="item" />
    </div>
    <item :type="'temp'" @createnew="addNewCatalogItem" />
  </div>
</template>

<script>
import item from "../components/Item.vue";

export default {
  components: { item },
  // components: { catalogItem },
  data() {
    return {
      items: [],
      filtered: [],
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
    typeFilter(type) {
      this.filtered = this.items.filter((el) => el.type === type);
    },
    resetTypeFilter() {
      this.filtered = this.items;
    },
    addNewCatalogItem(item) {
      //{name, price}
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

<style scoped>
.wrapper {
  padding: 25px;
}
.btn {
  cursor: pointer;
  padding: 8px;
}
.reset {
  background: #ff8783;
  border: 1px solid #000;
  border-radius: 2px;
  padding: 9px;
}
</style>
