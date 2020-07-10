<template>
  <div>
        <button type="button" class="btn btn-primary btn-open-chat" data-toggle="modal" data-target="#exampleModalCenter">
            Launch demo modal
        </button>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="chat-wrapper h-100 overflowY-auto">
                        <div 
                            v-for="msg of messages" 
                            :class="msg.sender_id === $route.params.id ? 'user' : 'answer'"
                            class="d-fles flex-column"
                        >
                            <div>
                                <strong>{{ msg.sender_id === $route.params.id ? 'me' : 'Admin' }}</strong>
                            </div>
                            <div>
                                <span>{{msg.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <input type="text" v-model="text">
                    <button type="button" class="btn btn-primary" @click="send">Send</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
let socket = io('http://localhost:8080/')

export default {
    data() {
        return {
            messages: [],
            text: '',
            currentReceiver: '',

            //hardCode
            sender: '5f07408fffc3b7316c88d213',
            receiver: '5f074086ffc3b7316c88d211'
        }
    },
    mounted() {
        this.$parent.get('api/messages' + this.$route.path).then(d => {
            this.messages = d;
        })

        //hardCode
        let test = '5f07408fffc3b7316c88d213'
        this.receiver == test ? this.receiver = '5f074086ffc3b7316c88d211' : this.receiver = test;

        socket.on('receive', d => { console.log(d) })
    },
    methods: {
        send() {
            socket.emit('send', { 
                sender_id: this.$route.params.id,
                _id: this.receiver,
                text: this.text
             })
        }
    }
}
</script>

<style>

</style>