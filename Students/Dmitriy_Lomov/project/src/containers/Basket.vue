<template>
  <div class="cart-block p-3">
    <div class="d-flex">
      <strong class="d-block">Всего товаров: {{ this.totalAmount }}</strong>
    </div>
    <hr />
    <div class="cart-items d-flex flex-wrap">
      <item
        v-for="item of items"
        :key="item.id_product"
        :type="'basket'"
        :item="item"
      />
    </div>
    <hr />
    <div class="d-flex">
      <strong class="d-block">Общая ст-ть: {{ this.totalPrice }}</strong>
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
      totalPrice: 0,
      totalAmount: 0,
    };
  },
  mounted() {
    this.$parent.get("/api/basket" + this.$route.path).then((d) => {
      this.items = d.items;
      this.items.forEach((el) => {
        this.totalPrice += el.price * el.amount;
        this.totalAmount += el.amount;
      });
    });
  },
  methods: {
    add(item) {
      let find = this.items.find((el) => el._id == item._id);

      if (!find) {
        let newItem = Object.assign({}, item, { amount: 1 });
        this.$parent
          .post("/api/basket" + this.$route.path, newItem)
          .then((res) => {
            if (res.status) {
              this.items.push(newItem);
              this.totalPrice += newItem.price;
              this.totalAmount++;
            }
          });
      } else {
        this.$parent
          .put("/api/basket" + this.$route.path, { amount: 1, _id: find._id })
          .then((res) => {
            if (res.status) {
              find.amount++;
              this.totalPrice += find.price;
              this.totalAmount++;
            }
          });
      }
    },
    remove(item) {
      let find = this.items.find((el) => el._id == item._id);
      this.totalPrice -= find.price;
      this.totalAmount--;

      if (find.amount == 1) {
        this.$parent.delete("/api/basket" + this.$route.path).then((res) => {
          if (res.status) {
            this.items.splice(this.items.indexOf(find), 1);
          }
        });
      } else {
        this.$parent
          .put("/api/basket" + this.$route.path, { amount: -1, _id: find._id })
          .then((res) => {
            if (res.status) {
              find.amount--;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.cart-block {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 120px;
  right: 1px;
  border: 1px solid #ea1772;
  border-radius: 5px;
  transition: all ease 0.3s;
}
</style>
