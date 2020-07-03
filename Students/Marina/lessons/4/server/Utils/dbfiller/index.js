let db = require("mongoose");
let fs = require("fs");

let catalog = "./server/Utils/dbfiller/catalog.json";
let basket = "./server/Utils/dbfiller/basket.json";

let Products = require("../../db/models/products");

db.connect("mongodb://localhost/geekshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function readJSON(url) {
  return new Promise((res, rej) => {
    fs.readFile(url, "utf-8", (err, data) => {
      if (!err) {
        res(JSON.parse(data));
      } else {
        console.log(`Error reading file ${url}`);
      }
    });
  });
}

async function writeCollection(array) {
  await array.forEach(async (element) => {
    try {
      let newProduct = await Products.create({
        name: element.product_name,
        price: element.price,
        img: element.img || "default",
      });
      console.log(`${newProduct} added`);
    } catch (error) {
      console.log(`Error filling model ${error}`);
    }
  });
}

readJSON(catalog)
  .then((data) => writeCollection(data))
  .catch((error) => console.log(error));
