var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/defined' , (req, res) => {
  for(let i = 0;i<6;i++){
    console.log(i)
  }
  setTimeout(() => {
    console.log("Hello Bhai 1111")
  } , 3000);
  console.log("hello bhai 1222222")
})

module.exports = router;
