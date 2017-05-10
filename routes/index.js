var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userDataSchema = new schema({
    naam: {type:String, required: true},
    email: {type:String, required: true},
    leeftijd: {type:String, required: true}
});

var userData = mongoose.model('userDate',userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sfeercaptain' });
});

router.get('/register', function(req, res, next){
  res.render('register',{ title: 'Sfeercaptain', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

/*router.get('/loggedInUser', function(req, res, next){
    res.render('loggedInUser',{ title: 'Sfeercaptain' });
    req.session.errors = null;
});*/

router.post('/register',function(req, res, next){

   /* req.check('naam' , 'Je moet een naam invullen').notEmpty();
    req.check('email' , 'invalid email adress').isEmail();
    req.check('email' , 'Mag niet leeg zijn').notEmpty();
    req.check('leeftijd' , 'Moet een nummer zijn').isNumeric().notEmpty();

    var item = {
        naam: req.body.naam,
        email: req.body.email,
        leeftijd: req.body.leeftijd
    };

    var data = new userData(item);

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else
        {
            req.session.success = true;
            data.save();
            /*res.redirect('/loggedInUser');*/
        /*}*/
});


/*router.get('/test/:id', function(req,res,next){
 res.render('test',{output: req.params.id});
 });

 router.post('/test/submit', function(req, res, next) {
 var id = req.body.id;
 res.redirect('/test/'+ id);
 });*/


module.exports = router;
