const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path'); 

// Init app
const app = express();

// load routes 
const home = require('./controllers/home.js')


app.set('view engine', 'pug'); 
app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', home );

const _PORT = process.env.PORT || 3000

app.listen(_PORT, err => {
    if(err) throw err; 
    console.log('server running on port:', _PORT);
});