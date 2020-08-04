<template>
  <div>
    <header>
        <div class="logo">GEEK-shop</div>
    </header>

    <main>
        <div class="w-100 d-flex justify-content-center py-5">
            <form action="#" class="d-flex flex-column w-50 align-items-center">
                <label for="" class="d-flex w-50 justify-content-between">
                    <input type="text" class="w-75" v-model="login"><span>Login</span>
                </label>
                <label for="" class="d-flex w-50 justify-content-between">
                    <input type="password" class="w-75" v-model="password"><span>Password</span>
                </label>
                <div class="btns d-flex justify-content-center flex-wrap">
                    <a href="#" class="btn btn-primary mr-1 mt-1" @click="signIn">Login</a>
                    <a href="#" class="btn btn-secondary mr-1 mt-1" @click="signUp">Sign Up</a>
                    <a href="#" class="mr-1 mt-1">Forgot password</a>
                </div>
                <div v-if="!auth">
                    <h2>Введите данные</h2>
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
            password: '',
            auth: true
        }
    },
    methods: {
        signIn() {
            if(this.login === '' || this.password === ''){
                this.auth = false;
                return;
            }
            this.post('/api/auth', {
                login: this.login,
                password: this.password
            })
            .then(res => {
                let user = this.$root.$children[0].User;

                user._id = res._id;
                user.login = res.login;
                user.basket = res.basket;
                user.firstName = res.firstName;
                user.lastName = res.lastName;
                user.email = res.email;
                user.password = res.password;

                this.$router.push('/shop/' + res._id);
            })
        },
        signUp() {
            this.$router.push('/registration')
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
    .btns {
        width: 20%
    }
</style>