var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sfeercaptain' });
});

router.get('/test/:id', function(req,res,next){
    res.render('test',{output: req.params.id});
});

router.post('/test/submit', function(req, res, next) {
    var id = req.body.id;
  res.redirect('/test/'+ id);
});

router.get('/register', function(req, res, next){
  res.render('register.pug',{ title: 'Sfeercaptain', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

router.post('/register',function(req, res, next){
    req.check('naam' , 'Je moet een naam invullen').notEmpty();
    req.check('email' , 'invalid email adress').isEmail();
    req.check('email' , 'Mag niet leeg zijn').notEmpty()
    req.check('leeftijd' , 'Moet een nummer zijn').isNumeric().notEmpty();
    
    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else
        {
            req.session.success = true;
        }
    res.redirect('/register');
})

module.exports = router;
