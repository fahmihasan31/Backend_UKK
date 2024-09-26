// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import user
const userRoute = require('./routes/userRoute');
app.use('/users', userRoute);

//import auth login
const authRoute = require('./routes/authRoute');
app.use('/login', authRoute);

const menuRoute = require('./routes/menuRoute');
app.use('/menu', menuRoute);

const mejaRoute = require('./routes/mejaRoute');
app.use('/meja', mejaRoute);

const transaksiRoute = require('./routes/transaksiRoute');
app.use('/transaksi', transaksiRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
