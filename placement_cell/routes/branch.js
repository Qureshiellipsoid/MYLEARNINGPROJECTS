var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var pool = mysql.createPool(require('../database'));
  
router.get('/getBranch', function(req, res, next) {
  let query = 'select * from branch';
  pool.query(query, function(err, result){
      if(err) throw err
      res.json(result);
  })
});

module.exports = router