const mongoose = require('mongoose');
const fetch = require('node-fetch');

var assert = require('assert');

describe('MongoDb Connection', function() {
    before(function(done){
        Mongoose.connect('mongodb://drabick:Tron1414!@ds035448.mlab.com:35448/mcp13', function(error){
            if (error) console.error('Error while connecting: ', error);
            console.log('connected');
            done(error);
        })
    })
})

describe('Get inital crimes', ()=> {
    it('Should get inital crimes', async ()=> {
        await fetch("https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=1")
            .then((res)=> {
                return res.json()
            })
            .then ((res)=> {
                console.log(res);
                assert.equal(res.ok);
            })
    })
})