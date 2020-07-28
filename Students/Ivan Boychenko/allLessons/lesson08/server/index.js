let express = require('express');
let http = require('http');
let server = express();
let app = http.Server(server);
let msgApp = require('./msg-socket');

let db = require('mongoose');

db.connect('mongodb://localhost/geekshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(express.json());
let basketRouter = require('./routers/basket-router');
let catalogRouter = require('./routers/catalog-router');
let authRouter = require('./routers/auth-router');
let userRouter = require('./routers/reg-router');

server.use('/basket', basketRouter);
server.use('/catalog', catalogRouter);
server.use('/auth', authRouter);
server.use('/registration', userRouter);

msgApp(app, server);

app.listen(8080, () => {
    console.log('Server is running at port 8080')
});