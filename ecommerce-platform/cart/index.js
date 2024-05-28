const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cart = require('./models/Cart');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo/cart', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/cart', async (req, res) => {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).send(cart);
});

app.get('/cart/:userId', async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.send(cart);
});

app.listen(3002, () => console.log('Cart service running on port 3002'));

