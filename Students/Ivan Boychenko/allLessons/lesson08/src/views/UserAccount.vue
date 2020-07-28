<template>
    <div>
    <header>
        <div class="logo" @click="main">GEEK-shop</div>
    </header>

    <main>
        <div class="w-100 d-flex justify-content-center py-5">
            <form action="#" class="d-flex flex-column w-50 align-items-center">
                <p>Ваш id: {{id}}</p>
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
                    <a href="#" class="btn btn-primary mr-1 mt-1" @click="update">Update</a>
                </div>
            </form>
        </div>
        <div v-if="status">
                <h2>Данные успешно обновлены</h2>
            </div>
    </main>
  </div>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            status: false
        }
    },
    methods: {
        update(){
            this.post('/api/registration/update', {
                id: this.id,
                login: this.login,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            })
            .then(this.status = true)
        },
        main(){
            this.$router.push('/shop/' + this.$root.$children[0].User._id);
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
    },
    mounted(){
        let user = this.$root.$children[0].User;
        this.id = user._id;
        this.firstName = user.firstName;
        this.login = user.login;
        this.password = user.password;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
</script>
