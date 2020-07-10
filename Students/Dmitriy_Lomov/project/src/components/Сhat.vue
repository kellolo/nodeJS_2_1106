<template>
  <div class="modal-bg">
    <div
      class="modal-wrapper d-flex flex-column justify-content-between pb-3"
    >
      <div class="modal-top d-flex justify-content-center align-items-center">
        <button class="close-btn" @click="this.toggleShowChat">
          &times;
        </button>
        <h3 class="modal-title">Чат</h3>
      </div>
      <div class="modal-main">
        <p>test</p>
        <div class="chat-wrapper">
          <div
            v-for="msg of messages"
            :key="msg._id"
            :class="msg.sender_id === $route.params.id ? 'user' : 'answer'"
            class="d-fles flex-column"
          >
            <div>
              <strong>{{
                msg.sender_id === $route.params.id ? "me" : "Admin"
              }}</strong>
            </div>
            <div>
              <span>{{ msg.text }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-bottom">
        <input type="text" v-model="text" />
        <button type="button" class="send-btn" @click="send">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
let socket = io("http://localhost:8080/");

export default {
  data() {
    return {
      messages: [],
      text: "",
      currentReceiver: "",
    };
  },
  mounted() {
    this.$parent.get("api/messages" + this.$route.path).then((d) => {
      this.messages = d;
    });
    socket.on("receive", (d) => {
      console.log(d);
    });
  },
  methods: {
    send() {
      socket.emit("send", {
        sender_id: this.$route.params.id,
        _id: '',
        text: this.text,
      });
    },
    toggleShowChat() {
      this.$parent._data.showChat = !this.$parent._data.showChat;
    },
  },
};
</script>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}
.modal-wrapper {
  position: fixed;
  top: 30%;
  left: 24%;
  width: 50em;
  height: 20em;
  background: #000;
  border-radius: 10px;
  color: #ea1772;
  border: 1px solid #ea1772;
}
.modal-top {
  position: relative;
  border-bottom: 1px solid #ea1772;
}
.close-btn {
  position: absolute;
  right: 2px;
  top: 2px;
  background: inherit;
  border: none;
  border-radius: 4px;
  color: #ea1772;
  font-size: 1.2em;
  outline: none;
  transition: all ease 0.3s;
}
.close-btn:focus {
  border-bottom: 1px solid #ea1772;
  border-left: 1px solid #ea1772;
}
.close-btn:hover {
  border-bottom: 1px solid #ea1772;
  border-left: 1px solid #ea1772;
  box-shadow: -1px 1px 2px #ea1772;
}
.close-btn:active {
  box-shadow: none;
  color: #c0135e;
}
.modal-main {
}
.modal-bottom {
}
.send-btn {
  background: #ea1772;
  border: 1px solid #ea1772;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  color: #fff;
  transition: all ease 0.3s;
  outline: none;
  margin-left: 10px;
}
.send-btn:focus {
  box-shadow: 0 0 5px 2px #ea1772;
}
.send-btn:hover {
  background: #c71462;
}
</style>
