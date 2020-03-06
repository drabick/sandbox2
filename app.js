const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const handlebars = require('express-handlebars');
const fetch = require('node-fetch');
const connectDB = require('./db');

const app = express();
require('dotenv/config');

//Import post routes
const postsRoute = require('./routes/posts');
//Import gets routes
const getsRoute = require('./routes/gets');

//middleware
app.use(bodyparser.json());
app.use('/gets', getsRoute);
app.use('/posts', postsRoute);

//Handlebar engine
//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',defaultLayout: 'index',
    }));
app.set('view engine', 'handlebars');

//routes
//app.get('/', (req,res) => {
//    res.send('We are on home page');    
//});
var cdata;

fetch("https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=block like" + " '%25STATE%25'")
.then(response => {
    return response.json()
})
.then(data => {
//Work with JSON data here
console.log(data[0].id) // Grab first Crime ID from first JSON element in Crime array
cdata = data;
})
.catch(err=> {
// Do something for an error here
})

//load index layout and fill it with main html data into body
app.get('/', (req, res) => {
    
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    //res.render('main', {layout : 'index'});
    
    res.render('main', {crimes: cdata});

    });

// Connect to database
connectDB();
    
// lisgerner

app.listen(3000);