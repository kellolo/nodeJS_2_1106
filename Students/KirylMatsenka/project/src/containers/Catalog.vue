<template>
    <div>
        <input type="text" @keypress="filterByType" class="filter-input" v-model="filterBy">
        <button @click="filterByType" class="buy-btn">Filter by type</button>
        <div class="products">
            <item v-for="item of filtered" :key="item._id" :item="item"/>
            <item :type="'temp'" @createnew="addNewCatalogItem"/>
        </div>
    </div>
</template>

<script>
import item from '../components/Item.vue'

export default {
    components: { item },
    // components: { catalogItem },
    data() {
        return {
            items: [],
            filtered: [],
            url: '/api/catalog',
            filterBy: ''
        }
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        getProducts() {
            this.$parent.get(this.url).then(d => {
                this.items = d;
                this.filtered = d;
            })
        },
        filter(str) {
            let reg = new RegExp(str, 'i');
            this.filtered = this.items.filter(el => reg.test(el.name));
        },
        addNewCatalogItem(item) { //{name, price}
            let newItem = JSON.parse(JSON.stringify(item));
            this.$parent.post('/api/catalog/', newItem)
                .then(res => {
                    if (res.id) {
                        this.items.push(Object.assign({}, newItem, { id_product: res.id }));
                    }
                });
        },
        filterByType() {
            if (this.filterBy != '') {
                this.$parent.get(this.url + '/' + this.filterBy)
                    .then(data => {
                        this.items = data;
                        this.filtered = data;
                    });
                return;
            }
            this.getProducts();
        }
    }
}
</script>

<style>
.filter-input {
    margin-right: 10px;
}
</style>
