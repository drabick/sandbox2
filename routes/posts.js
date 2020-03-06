const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const fetch = require('node-fetch');
const handlebars = require('express-handlebars');

const bodyParser = require('body-parser');

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 

router.post('/street', (req,res) => {
    var cdata;
    fetch("https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=block like" + " '%25ADAM%25'")
    .then(response => {
        return response.json()
    })
    .then(data => {
    //Work with JSON data here
    console.log(data[0].id) // Grab first Crime ID from first JSON element in Crime array
    cdata = data;
    res.render('main', {crimes: cdata});
    })
    .catch(err=> {
    // Do something for an error here
    console.log('error in new fetch');
    })    
    
    console.log('post steet')
    console.log(req.body.street);
    
    res.redirect('back');

});

module.exports = router;