<template>
  <div class="prod-wrap m-2 pb-2" :class="computedWrapperClassName">
    <img :src="computedImgSrc" :alt="item.name" />

    <template v-if="type == 'catalog'">
      <div class="desc">
        <h1>{{ item.name }}</h1>
        <p>{{ item.price }}</p>
        <button
          class="buy-btn"
          name="buy-btn"
          @click="$parent.$emit('add', item)"
        >
          Купить
        </button>
      </div>
    </template>

    <template v-if="type == 'basket'">
      <div class="product-desc">
        <p class="product-title">{{ item.name }}</p>
        <p class="product-quantity">{{ item.amount }}</p>
        <p class="product-single-price">{{ item.price }}</p>
      </div>
      <div class="right-block">
        <button name="del-btn" class="del-btn" @click="$parent.remove(item)">
          &times;
        </button>
      </div>
    </template>

    <template v-else-if="type === 'temp'">
      <div class="desc w-75">
        <label>
          <input
            type="text"
            placeholder="Item name"
            v-model="newProduct.name"
            class="w-50"
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Item price"
            v-model="newProduct.price"
            class="w-50"
          />
        </label>
        <button class="buy-btn" name="buy-btn" @click="createNew(newProduct)">
          Добавить
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {
        name: "",
        price: 0,
      },
    };
  },
  props: {
    type: {
      type: String,
      default: "catalog",
    },
    item: {
      type: Object,
      default: () => ({ name: "Default" }),
    },
  },
  computed: {
    computedWrapperClassName() {
      return `${this.type == "catalog" ? "product-item" : "cart-item"}`;
    },
    computedImgSrc() {
      return `https://placehold.it/${
        this.type == "catalog" ? "200x150" : "100x80"
      }`;
    },
  },
  methods: {
    createNew(item) {
      if (item.name && item.price) {
        this.$emit("createnew", item);
        this.newProduct.name = "";
        this.newProduct.price = 0;
      }
    },
  },
};
</script>

<style scoped>
.prod-wrap {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #ea1772;
  text-shadow: 0 0 2px #000;
}
.prod-wrap h1 {
  color: #ea1772;
}
.prod-wrap p {
  color: #dfe7ec;
}
.buy-btn {
  padding: 10px;
  border: 1px solid #ea1772;
  border-radius: 5px;
  transition: all ease 0.3s;
  outline: none;
  background: inherit;
  color: #ea1772;
}
.buy-btn:hover {
  background: #ea1772;
  color: #dfe7ec;
}
.buy-btn:focus {
  box-shadow: 0 0 5px 2px #ea1772;
}
</style>
