let socketIO = require('socket.io');
let MsgController = require('./controllers/message_controller');

module.exports = (app, server) => {
    server.get('/messages/:id', MsgController.load);

    let messageApp = socketIO(app);

    messageApp.on('connection', socket => {
        console.log('connected')
        socket.on('send', async msg => {
            console.log(msg)
            MsgController.send(msg)
            .then(pl => {
                let { status, message } = pl;
                if (status) {
                    socket.emit('send', message)
                }
            });
            //DataBase actions
            //todo

            // MsgController.receive().then(payload => {
            //     if (payload) {
            //         socket.emit('receive', { res: 'Hello Client' })
            //     }
            // })
        })
    })
};