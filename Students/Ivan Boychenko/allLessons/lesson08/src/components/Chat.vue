<template>
  <div>
    <button
      type="button"
      class="btn btn-primary btn-open-chat"
      data-toggle="modal"
      data-target="#exampleModalCenter"
    >
      Чат
    </button>
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Чат</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="chat-wrapper h-100 overflowY-auto">
              <div
                v-for="msg of messages"
                :class="msg.senderId === $route.params.id ? 'user' : 'answer'"
                class="d-fles flex-column"
              >
                <div>
                  <strong>{{
                    msg.senderId === $route.params.id ? "me" : "Admin"
                  }}</strong>
                </div>
                <div>
                  <span>{{ msg.text }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <input type="text" v-model="text" />
            <button type="button" class="btn btn-primary" @click="send">
              Отправить
            </button>
          </div>
        </div>
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
      sender: "5f14e5e449cce7025981292d",
      receiver: "5f1789dbed5ddf3f38f9fdc7"
    };
  },
  methods: {
    send() {
      socket.emit("send", {
          senderId: this.$route.params.id,
          _id: this.receiver,
          text: this.text
      });
    },
  },
  mounted() {
      this.$parent.get('api/messages' + this.$route.path).then(d => {
          this.messages = d;
          console.log(d)
      })
      console.log(this.$route.path)
      console.log(this.$parent)
      let test = '5f14e5e449cce7025981292d'
      this.receiver == test ? this.receiver = '5f1789dbed5ddf3f38f9fdc7' : this.receiver = test;

    socket.on("receive", (d) => {
      // console.log(d);
    });
  },
};
</script>

<style></style>
