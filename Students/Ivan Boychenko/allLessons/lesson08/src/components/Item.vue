<template>
    <div :class="computedWrapperClassName">
        <img src="#" alt="" v-if="type === 'temp' && isAdmin === false">
        <img :src="computedImgSrc" :alt="item.name" v-else>

        <template v-if="type=='catalog'">
            <div class="desc">
                <h1>{{ item.name }} </h1>
                <p>{{ item.price }} рублей</p>
                <button 
                    class="buy-btn" 
                    name="buy-btn"
                    @click="$parent.$emit('add', item)"
                >Купить</button>
            </div>
        </template>

        <template v-if="type=='basket'">
            <div class="product-desc">
                <p class="product-title">{{ item.name }}</p>
                <p class="product-quantity">Кол-во: {{ item.amount }}</p>
                <p class="product-single-price">{{ item.price }} руб.</p>
                <p class="product-full-price">Итого: {{ item.price * item.amount }} руб.</p>
            </div>
            <div class="right-block">
                <button name="del-btn" class="del-btn" @click="$parent.remove(item)">&times;</button>
            </div>
        </template>

        <template v-else-if="type === 'temp' && isAdmin === true">
            <div class="desc w-75">
                <label >
                    <input type="text" placeholder="Item name" v-model="newProduct.name" class="w-50">
                </label>
                <label >
                    <input type="number" placeholder="Item price" v-model="newProduct.price" class="w-50">
                </label>
                <button class="buy-btn" 
                    name="buy-btn"
                    @click="createNew(newProduct)"
                >Добавить</button>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newProduct: {
                name: '',
                price: 0
            },
            isAdmin: false,
        }
    },
    props: {
        type: {
            type: String,
            default: 'catalog'
        },
        item: {
            type: Object,
            default: () => ({ name: 'Default' })
        }
    },
    computed: {
        computedWrapperClassName() {
            return `${this.type == 'catalog' ? 'product-item' : 'cart-item'}`
        },
        computedImgSrc() {
            return `https://placehold.it/${this.type == 'catalog' ? '200x150' : '100x80'}`
        },
        // calcAlt() {
        //     return this.item ? this.item.name : 'template';
        // }
    },
    methods: {
        createNew(item) {
            if(item.name && item.price) {
                this.$emit('createnew', item); //new custom event generated
                this.newProduct.name = '';
                this.newProduct.price = 0;
            }
        }
    },
    mounted(){
        const admin = this.$root.$children[0].User.admin;
        if(admin) {
            this.isAdmin = true
        } else {
            return
        }
        
    }
}
</script>

<style>

</style>