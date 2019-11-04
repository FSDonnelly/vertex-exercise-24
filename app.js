let express = require('express');
let app = express();
const PORT = process.env.PORT || 3000;

let products = [];
let id = 1;

app.use(express.static('public'));
app.use(express.json());

app.get(`/products`, (req, res) => {
  res.send(products);
});

app.post(`/products`, (req, res) => {
  let newProduct = req.body;
  newProduct.id = id;
  id++;
  products.push(newProduct);
  res.send(`Created`);
});

app.put(`/products/:id`, (req, res) => {
  let productId = +req.params.id;
  let productForUpdate;
  for (let i = 0; i < products.length; i++) {
    let element = products[i];
    if (element.id === productId) {
      productForUpdate = element;
      break;
    }
  }
  if (productForUpdate) {
    productForUpdate.price = req.body.price;
    res.send(`Updated`);
  } else {
    res.send(`Rejected`);
  }
});

app.delete(`/products/:id`, (req, res) => {
  let productId = +req.params.id;
  for (let i = 0; i < products.length; i++) {
    let element = products[i];
    if (element.id === productId) {
      products.splice(i, 1);
      res.send(`Deleted`);
    }
  }
  res.send(`Rejected`);
});

app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
