var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var multer  = require('multer')
var upload = multer({ dest: 'public/images/company/' })

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
    res.render('company/register.ejs');
})

router.post('/register_submit' , upload.single("logo") , (req, res) => {
    let query = 'INSERT INTO company SET ?'
    let data = req.body
    data.logo = req.file.filename
    pool.query(query, data, function(err,result){
       if(err) throw err;
       req.flash('isRedirected', true);
       res.redirect('/company/register');
    })
    
})


router.get('/displayAll' , (req, res) => {
    let query = `select c.* , (select name from state s where s._id = c.state_id) as state,  (select name from city ci where ci._id = c.city_id) as city from company c`;
    pool.query(query, (err, result) => {
        if(err) throw err
        res.render('company/DisplayAll', {companies: result})
    })
})


router.get('/displaybyid/:company_id' , (req, res) => {
    if(req.session.company != undefined && req.session.company.authenticated == true ){
        let company_id = req.params.company_id
        let query = `select * from company where _id = ${company_id}`
        pool.query(query, (err, result) => {
            if(err) throw err
            console.log(result)
            res.render('company/DisplayById', {company : result[0]})
        })
    }    
    else{
        res.redirect('/company/login');
    }    
})


router.post('/updatebyid/:company_id' , (req, res) => {
    let data = req.body
    let company_id = req.params.company_id
    let query = makeUpdateQuery(data, 'company' , company_id)
    pool.query(query, (err, result) => {
        if(err) throw err
        res.redirect('/company/displayAll');
    })
})

router.post('/updatelogobyid/:company_id', upload.single('logo'), (req, res) => {
   let company_id = req.params.company_id
   let query = `update company set logo = '${req.file.filename}' where _id = ${company_id} `
   pool.query(query, (err, result) => {
       if(err) throw err
       res.redirect('/company/displayAll');
   })
})

router.get('/login', (req, res) => {
    let authenticated = req.flash("authenticated")[0];
    console.log(authenticated);
    res.render('company/login' , {authenticated : authenticated});
})

router.post('/check_login', (req, res) => {
    let query = `select * from company where email_id = '${req.body.email_id}' and password = '${req.body.password}'`
    pool.query(query, (err, result) => {
        if(err) throw err
        if(result.length == 0){
            req.flash("authenticated","false")
            res.redirect('/company/login');
        }
        else {
            req.session.company = {}
            req.session.company.authenticated = true
            req.session.company.info = result[0]
            res.render('company/DashBoard.ejs', {company : req.session.company.info})
        }
        res.end()
    })
})



router.get('/deletebyid' , (req, res) => {
    let company_id = req.query.company_id
    let query = `delete from company where _id = ${company_id}`
    pool.query(query, (err, result) => {
        if(err) throw err
        res.redirect('displayAll')
    })
})

router.get('/logout', (req, res) => {
    req.session.company.authenticated = false
    req.session.company = null
    res.redirect('/company/login')
})

module.exports = router;



// data = req.body
// let query = `insert into company(name,
//     hr,
//     email_id,
//     mobile_no,
//     website,
//     state_id,
//     city_id,
//     local_address,
//     password,
//     logo) values(
//     '${data.name}',
//     '${data.hr_name}',
//     '${data.email_id}',
//     '${data.mobile_no}',
//     '${data.WEBSITE}',
//     '${data.state}',
//     '${data.city}',
//     '${data.local_address}',
//     '${data.password}',
//     '${req.file.filename}'
//     )`;