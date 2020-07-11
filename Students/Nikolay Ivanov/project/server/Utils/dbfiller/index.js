const fs = require('fs');
const db = require('mongoose');

const basket = './server/Utils/dbfiller/basket.json';
const catalog = './server/Utils/dbfiller/catalog.json';

const Products = require('../../db/models/products');

db.connect('mongodb://localhost/geekshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function readJSON(urlFile) {
    return new Promise((res,rej) => {
        fs.readFile(urlFile, 'utf-8', (err, data) => {
            if(!err) {
                res(JSON.parse(data));
            } else {
                rej('Error reading file: ' + urlFile);
            }
        })
    })
}

async function writeCollection(array) {
    await array.forEach(async item => {
        try {
            let newProduct = await Products.create({
                name: item.product_name,
                price: item.price,
                img: item.img || 'default'
            });
            console.log(newProduct.name + ' added.');
        } 
        catch(err) {
            console.log('Err filling in writing Model: ' + err);
        }
    })
}

readJSON(catalog)
    .then(d => {
        writeCollection(d)
    })
    .catch(d => {console.log(d)});