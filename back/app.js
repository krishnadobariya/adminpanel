const express = require('express');

require("dotenv").config();
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const conn = require('./src/db/conn');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());


const userRoutes = require('./src/router/user.routes');
const itemRoutes = require('./src/router/item.routes');

app.use('/user', userRoutes);
app.use('/item', itemRoutes);


app.listen(port, () => {
    console.log(`server is connected ${port}`)
});


module.exports = app;