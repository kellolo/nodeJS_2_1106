let express = require('express');

const db = require('mongoose');

db.connect('mongodb://localhost/geekshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let server = express();
server.use(express.json()); //popozje

const basketRouter = require('./routers/basket-router');
const catalogRouter = require('./routers/catalog-router');
const authRouter = require('./routers/auth-router');
server.use('/basket', basketRouter);
server.use('/catalog', catalogRouter);
server.use('/auth', authRouter);

server.listen(8080, () => {
    console.log('Server is running at port 8080')
});