const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./route');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, console.log(`listening on PORT${PORT}`));