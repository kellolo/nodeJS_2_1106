let express = require('express');

let server = express();
server.use(express.json()); //popozje

const basketRouter = require('./routers/basket-router');
const catalogRouter = require('./routers/catalog-router');
server.use('/basket', basketRouter);
server.use('/catalog', catalogRouter);

server.listen(8080, () => {
    console.log('Server is running at port 8080')
});