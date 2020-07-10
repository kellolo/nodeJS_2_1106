<template>
    <div class="cart-block ">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :type="'basket'" :item="item"/>
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть: {{ this.allPrice }}</strong>
            <div id="price"></div>
        </div>
    </div>
</template>

<script>
import item from '../components/Item.vue'

export default {
    components: { item },
    data() {
        return {
            items: [],
            allPrice: 0
        }
    },
    mounted() {
        this.$parent.get('/api/basket' + this.$route.path).then(d => {
            this.items = d.items;
            this.items.forEach((el) => {
                this.allPrice += el.price * el.amount;
            })
        })
    },
    methods: {
        add(item) {
            let find = this.items.find(el => el._id == item._id);

            if (!find) {
                let newItem = Object.assign({}, item, { amount: 1 });
                this.$parent.post('/api/basket' + this.$route.path, newItem)
                    .then(res => {
                        if (res.status) {
                            this.items.push(newItem);
                            this.allPrice += newItem.price;
                        }
                    });
            } else {
                this.$parent.put(`/api/basket/${this.$route.path}`, { amount: 1, _id: find._id })
                    .then(res => {
                        if (res.status) {
                            find.amount++;
                            this.allPrice += find.price;
                        }
                    });
            }
        },
        remove(item) {
            let find = this.items.find(el => el._id == item._id);
            this.allPrice -= find.price;

            if (find.amount == 1) {
                this.$parent.delete(`/api/basket/${this.$route.path}`)
                    .then(res => {
                        if (res.status) {
                            this.items.splice(this.items.indexOf(find), 1);
                        }
                    });
            } else {
                this.$parent.put(`/api/basket/${this.$route.path}`, { amount: 1, _id: find._id })
                    .then(res => {
                        if (res.status) {
                            find.amount--
                        }
                    });
            }
        }
    }
}
</script>

<style>

</style>