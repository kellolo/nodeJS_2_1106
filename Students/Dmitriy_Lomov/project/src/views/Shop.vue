<template>
  <div class="main">
    <header class="d-flex justify-content-between align-items-center px-5">
      <div class="logo">
        <img src="../assets/logo.png" alt="Company logo" />
      </div>
      <div class="cart d-flex align-items-center">
        <FormSearch @search="filterCatalog" />
        <button class="btn-cart" @click="showBasket = !showBasket">
          <i class="fa fa-shopping-cart"></i>
        </button>
        <Basket ref="basket" v-show="showBasket" />
      </div>
    </header>
    <main class="p-5">
      <Catalog @add="addItem" ref="catalog" />
      <button type="button" class="btn-chat" @click="showChat = !showChat">
        <i class="fa fa-comments" aria-hidden="true"></i>
      </button>
      <Chat v-if="this.showChat" />
    </main>
  </div>
</template>

<script>
import Basket from "../containers/Basket.vue";
import Catalog from "../containers/Catalog.vue";
import FormSearch from "../components/Search";
import Chat from "../components/Сhat";

export default {
  components: { Basket, Catalog, FormSearch, Chat },
  data() {
    return {
      showBasket: false,
      showChat: false,
    };
  },
  methods: {
    // REST
    // CRUD - Create Read Update Delete
    filterCatalog(str) {
      this.$refs.catalog.filter(str);
    },
    get(url) {
      return fetch(url).then((d) => d.json());
    },
    post(url, item) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then((d) => d.json());
    },
    put(url, dir) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dir),
      }).then((d) => d.json());
    },
    delete(url) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((d) => d.json());
    },
    addItem(pl) {
      this.$refs.basket.add(pl);
    },
  },
};
</script>

<style scoped>
.main {
  background: url("../assets/main_bg.jpg");
  background-size: cover;
}
header {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #ea1772;
}
.btn-cart {
  margin-left: 10px;
  background: inherit;
  border: none;
  padding: 5px;
  color: #ea1772;
  transition: all ease 0.3s;
  outline: none;
}
.btn-cart:hover {
  color: #dfe7ec;
}
.btn-cart:focus {
  border-bottom: 1px solid #ea1772;
}
.btn-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ea1772;
  border: 1px solid #ea1772;
  border-radius: 50%;
  padding: 10px;
  font-size: 1.2em;
  color: #fff;
  transition: all ease 0.3s;
  outline: none;
}
.btn-chat:hover {
  background: #c0135e;
  box-shadow: 0 0 4px 1px #ea1772;
}
.btn-chat:active {
  color: #ddd;
}
.btn-chat:focus {
  box-shadow: 0 0 5px 2px #ea1772;
}
</style>
