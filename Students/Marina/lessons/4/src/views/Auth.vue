<template>
  <div>
    <header>GEEk-SHOP</header>
    <main>
      <div class="">
        <form action="#">
          <label> Login <input v-model="login" type="text" /> </label>
          <label> Password <input v-model="password" type="text" /> </label>
          <a href="#" @click="signIn" class="btn btn-primary">Login</a>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      this.post("/api/auth", {
        login: this.login,
        password: this.password,
      }).then((res) => {
        let user = this.$root.$children[0].user;
        user._id = res._id;
        user.login = res.login;
        user.password = res.password;
console.log(`sign ${user}`)
        this.$router.push(`/${res._id}`)
      });
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
  },
};
</script>

<style></style>
