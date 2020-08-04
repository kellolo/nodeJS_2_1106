let express = require('express');
let server = express();
let http = require('http');
let app = http.Server(server); // Танец с бубном, если хотим поставить сокеты с express
let msgApp = require('./msgSocket');
let db = require('mongoose');

db.connect('mongodb://localhost/geekshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(express.json()); //popozje
let basketRouter = require('./routers/basket-router');
let catalogRouter = require('./routers/catalog-router');
let authRouter = require('./routers/auth-router');
server.use('/basket', basketRouter);
server.use('/catalog', catalogRouter);
server.use('/auth', authRouter);

msgApp(app, server);

app.listen(8080, () => {
    console.log('Server is running at port 8080')
});