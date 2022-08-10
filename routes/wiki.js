var express = require('express');
var router = express.Router();

//WIKI ENDPOINTS

//Home page
router.get('/', function(req,res){
    res.send("Wiki home page");
})

//About home page
router.get('/about', function(req,res){
    res.send("About this Wiki");
})

module.exports = router;