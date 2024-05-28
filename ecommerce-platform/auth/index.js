const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo/auth', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid password');
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.send({ token });
});

app.listen(3000, () => console.log('Auth service running on port 3000'));
