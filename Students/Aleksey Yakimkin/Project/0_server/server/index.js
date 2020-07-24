let express = require('express');

let db = require('mongoose');
db.connect('mongodb://localhost/geekshop',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let server = express();
server.use(express.json()); //popozje

let basketRouter = require('./routers/basket-router');
server.use('/basket', basketRouter);

let catalogRouter = require('./routers/catalog-router');
server.use('/catalog', catalogRouter);

let authRouter = require('./routers/auth-router');
server.use('/auth', authRouter);

let http = require('http');
let app = http.Server(server);

let msgApp = require('./msgSocket');
msgApp(app, server);

app.listen(8080, () => {  // server. меняем на app.
    console.log('Server is running at port 8080')
});