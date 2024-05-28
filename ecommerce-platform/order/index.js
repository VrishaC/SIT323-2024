const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Order = require('./models/Order');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo/order', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/orders', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
});

app.get('/orders/:userId', async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId });
    res.send(orders);
});

app.listen(3003, () => console.log('Order service running on port 3003'));

