<template>
  <div class="auth w-100">
    <header>
      <div class="logo">
        <img src="../assets/logo.png" alt="Company logo" />
      </div>
    </header>
    <main class="d-flex">
      <div class="auth-form w-50 d-flex justify-content-center py-5">
        <form action="#" class="d-flex flex-column">
          <label class="d-flex justify-content-between">
            <input type="text" v-model="login" /><span>Логин</span>
          </label>
          <label class="d-flex justify-content-between">
            <input type="password" v-model="password" /><span>Пароль</span>
          </label>
          <label class="d-flex justify-content-start align-items-center">
            <input type="checkbox" v-model="admin" /><span class="pl-2"
              >Админка</span
            >
          </label>
          <div class="btns d-flex justify-content-center flex-wrap">
            <a href="#" class="signBtn sign-in mr-1 mt-1" @click="signIn"
              >Sign In</a
            >
            <a href="#" class="signBtn sign-up mr-1 mt-1" @click="signUp"
              >Sign Up</a
            >
            <a href="#" class="forgot mr-1 mt-1">Забыли пароль?</a>
          </div>
        </form>
      </div>
      <div
        class="greet w-50 d-flex flex-column align-items-center justify-content-center"
      >
        <h1>Добро пожаловать в GEEK-shop</h1>
        <p>Новичек? Регистрируйся. Бывалый? Логинься.</p>
        <p>
          Здесь утоляются самые изощренные желания в мире гейминг-индустрии.
        </p>
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
      admin: false,
    };
  },
  methods: {
    signIn() {
      this.post("/api/auth", {
        login: this.login,
        password: this.password,
        admin: this.admin,
      }).then((res) => {
        let user = this.$root.$children[0].User;

        user._id = res._id;
        user.login = res.login;
        user.basket = res.basket;
        user.admin = res.admin;

        this.$router.push("/" + res._id);
      });
    },
    signUp() {
      //validation
      //existing account
      this.post("/api/auth/create", {
        login: this.login,
        password: this.password,
        admin: this.admin,
      }).then((res) => {
        let user = this.$root.$children[0].User;

        user._id = res._id;
        user.login = res.login;
        user.basket = res.basket;
        user.admin = res.admin;

        this.$router.push("/" + res._id);
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

<style scoped>
.btns {
  width: 90%;
}
.auth {
  background: url("../assets/auth_bg.jpg");
  background-size: cover;
  height: 100vh;
}
.auth-form {
  background: rgba(0, 0, 0, 0.5);
  border-left: 1px solid #ea1772;
  border-right: 1px solid #ea1772;
  border-bottom: 1px solid #ea1772;
  text-shadow: 0 0 2px #000;
  color: #dfe7ec;
}
.logo {
  background: rgba(0, 0, 0, 0.5);
  border-left: 1px solid #ea1772;
  border-right: 1px solid #ea1772;
  border-top: 1px solid #ea1772;
}
.greet {
  background: rgba(0, 0, 0, 0.5);
  border-right: 1px solid #ea1772;
  border-bottom: 1px solid #ea1772;
  text-shadow: 0 0 2px #000;
}
.greet h1 {
  color: #ea1772;
}
.greet p {
  color: #dfe7ec;
}
.signBtn {
  display: block;
  padding: 10px;
  border: 1px solid #ea1772;
  border-radius: 5px;
  transition: all ease 0.3s;
  outline: none;
}
.signBtn:focus {
  box-shadow: 0 0 5px 2px #ea1772;
}
.sign-in {
  background: rgba(0, 0, 0, 0.3);
  color: #ea1772;
}
.sign-in:hover {
  background: rgba(0, 0, 0, 0.7);
}
.sign-up {
  background: #ea1772;
  color: #dfe7ec;
}
.sign-up:hover {
  background: #c71462;
}
.forgot {
  color: #468fbd;
}
</style>
