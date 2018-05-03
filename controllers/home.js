const router = require('express').Router();
const users = require('../models/users.js');


router.get('/', (req, res) => {
    var sessData = req.session;
    console.log(sessData);
    res.render('index.pug', {
        user: (sessData.user)? sessData.user.user_email: null

    }); 
});

router.get('/quiz', (req, res) => {
    var someAttribute = req.session.someAttribute;
    console.log(someAttribute);
    res.render('quiz.pug'); 
});

router.post('/quiz', (req, res) => {
    console.log(req.body)
    res.send('Ok')
});

router.post('/signup', (req,res) => {
    res.render('quiz.pug', {
        user: req.body.email
    });
});

router.post('/sign_in', (req, res) => {
    const checkUser = new users().loginUser(req.body.email, req.body.password);

    checkUser.then(data => {
        var sessData = req.session;
        console.log(data);
        if(data.length) {
            sessData.user = data[0];
            sessData.loggedIn = true; 
            res.redirect('/');
        } else {
            res.render('index.pug', {
                error: 'Wrong Login information'
            })
        }
        
    })
   
}); 

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
});

module.exports = router; 