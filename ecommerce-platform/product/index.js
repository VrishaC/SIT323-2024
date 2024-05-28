const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo/product', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.listen(3001, () => console.log('Product service running on port 3001'));
