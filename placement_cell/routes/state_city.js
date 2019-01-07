var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database : 'placement_cell'
  });
  
router.get('/getAllStates', function(req, res, next) {
  let query = 'select * from state';
  pool.query(query, function(err, result){
      if(err) throw err
      res.json(result);
  })
});

router.get('/getAllCities', function(req, res, next) {
    let state_id = req.query.state_id;
    let query = `select * from city where state_id = ${state_id}`;
    pool.query(query, function(err, result){
        if(err) throw err
        res.json(result);
    })
});
  
router.get('/getAllStatesAndCities', (req, res) => {
    let query = 'select c.*, (select s.name from state s where s._id = c.state_id) as state from city c'
    pool.query(query, (err, result) => {
        if(err) throw err
        res.json(result);
    })
})

module.exports = router;
