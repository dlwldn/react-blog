const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const router = require('./route');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/', router);

app.get('/api/hello', (req,res)=> {
    res.send("hhhhhhh");
})


app.listen(PORT, console.log(`listening on PORT${PORT}`));