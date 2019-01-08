var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'public/images/student/' })

var pool = mysql.createPool(require('../database'));

makeUpdateQuery = (data, tableName, _id) => {
    let query = `update ${tableName} set `;
    let keys = Object.keys(data)
    let values = Object.values(data)
    console.log(keys, values)
    for( let i = 0 ; i < keys.length ; i++){
        query+= ` ${keys[i]} = '${values[i]}', `;
    }
    query = query.substr(0, query.length-2);
    query+= ` where _id = ${_id}`
    return query
}

router.get('/register' , (req, res) => {
    res.render('student/register.ejs');
})

router.post('/register_submit' , upload.single("pic") , (req, res) => {
    let query = 'INSERT INTO student1 SET ?'
    let data = req.body
    data.pic = req.file.filename
    pool.query(query, data, function(err,result){
       if(err) throw err;
       req.flash('isRedirected', true);
       res.redirect('/student/register');
    })
    
})


router.get('/displayAll' , (req, res) => {
    let query = `select s.*, (select branch_name from branch b where b._id = s.branch_code) as branch_name from student1 s`;
    pool.query(query, (err, result) => {
        if(err) throw err
        res.render('student/DisplayAll', {students: result})
    })
})


router.get('/displaybyid/:student_id' , (req, res) => {
    let student_id = req.params.student_id
    let query = `select * from student1 where _id = ${student_id}`
    pool.query(query, (err, result) => {
        if(err) throw err
        console.log(result)
        res.render('student/DisplayById', {student : result[0]})
    })
})


router.post('/updatebyid/:student_id' , (req, res) => {
    let data = req.body
    let student_id = req.params.student_id
    let query = makeUpdateQuery(data, 'student1' , student_id)
    pool.query(query, (err, result) => {
        if(err) throw err
        res.redirect('/student/displayAll');
    })
})

router.post('/updatepicbyid/:student_id', upload.single('pic'), (req, res) => {
   let student_id = req.params.student_id
   let query = `update student1 set pic = '${req.file.filename}' where _id = ${student_id} `
   pool.query(query, (err, result) => {
       if(err) throw err
       res.redirect('/student/displayAll');
   })
})



router.get('/deletebyid' , (req, res) => {
    let student_id = req.query.student_id
    let query = `delete from student1 where _id = ${student_id}`
    pool.query(query, (err, result) => {
        if(err) throw err
        res.redirect('displayAll')
    })
})

module.exports = router;
