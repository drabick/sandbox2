const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cr = require('../lib/streetData')

var cdata;

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 

//For handlebar index page
router.get('/about', (req,res) => {
    res.send('this is from get routers about');
});

router.post('/street', async (req,res,next) => {

//Get Street to serqch for
console.log('Search for steet');
console.log(req.body.street);
let street = req.body.street;

    try {
        cdata = await cr.getStreetData(street);
      } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
      }
    res.render('main', {crimes: cdata});
});

module.exports = router;