<template>
    <div>
        <header>
            <div class="logo">GeekShop</div>
        </header>
        <main>
            <div class="w-100 d-flex justify-content-center py-5">
                <form action="#" class="d-flex flex-column w-50 align-items-center">
                    <label for="" class="d-flex w-100 justify-content-between">
                        <input type="text" class="w-75" v-model='login'> <span>Login</span>
                    </label>
                    <label for="" class="d-flex w-100 justify-content-between">
                        <input type="text" class="w-75" v-model="password"> <span>Password</span>
                    </label>
                    <div class="d-flex w-50 justify-content-center flex-wrap">
                        <a href="#" class="btn btn-primary mr-1 mt-1" @click="signIn">Login</a>
                        <a href="#" class="btn btn-secondary mr-1 mt-1" @click="signUp">Sing Up</a>
                        <a href="#" class="mr-1 mt-1">Forgot password</a>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        signIn() {
            this.post('/api/auth',
            {
                login: this.login,
                password: this.password
            })
            .then(res => {
                let user = this.$root.$children[0].User;

                user.id = res._id;
                user.login = res.login;
                user.basket = res.basket;

                this.$router.push('/' + res._id);
            })
        },
        signUp() {
            this.post('/api/auth/create',
            {
                login: this.login,
                password: this.password
            })
        },
        post(url, item) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then(d => d.json());
        },
    }
}
</script>

<style>

</style>