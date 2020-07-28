<template>
  <div>
    <header>
        <div class="logo">GEEK-shop</div>
    </header>

    <main>
        <div class="w-100 d-flex justify-content-center py-5">
            <form action="#" class="d-flex flex-column w-50 align-items-center">
                <label for="" class="d-flex w-50 justify-content-between">
                    <input type="text" class="w-75" v-model="firstName"><span>First Name</span>
                </label>
                <label for="" class="d-flex w-50 justify-content-between">
                    <input type="text" class="w-75" v-model="lastName"><span>Last name</span>
                </label>
                <label for="" class="d-flex w-50 justify-content-between">
                    <input type="text" class="w-75" v-model="email"><span>E-mail</span>
                </label>
                <label for="" class="d-flex w-50 justify-content-between">
                    <input type="text" class="w-75" v-model="login"><span>Login</span>
                </label>
                <label for="" class="d-flex w-50 justify-content-between">
                    <input type="password" class="w-75" v-model="password"><span>Password</span>
                </label>
                <div class="btns d-flex justify-content-center flex-wrap">
                    <a href="#" class="btn btn-primary mr-1 mt-1" @click="signUp">Registration</a>
                </div>
            </form>
        </div>
        <div v-if="!status">
            <h1>Заполните необходимые поля</h1>
        </div>
    </main>
  </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            status: true
        }
    },
    methods: {
        signUp(){ 
            this.post('/api/registration/create', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                login: this.login,
                password: this.password,
            })
            .then(res => {
                let user = this.$root.$children[0].User;

                // user._id = res._id;
                // user.firstName = res.firstName;
                // user.lastName = res.lastName;
                user.email = res.email;
                user.login = res.login;
                user.password = res.password;

                if(!res.status) {
                    this.status = res.status;
                } else {
                    this.$router.push('/')
                }
                //this.$router.push('/')
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
    .btns {
        width: 20%
    }
</style>