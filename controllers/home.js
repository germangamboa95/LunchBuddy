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
    var sessData = req.session;

    res.render('quiz.pug', {
        user: (sessData.user)? sessData.user.user_email: null
    }); 
});

router.post('/quiz', (req, res) => {
    console.log(req.body)
    var sessDataUser = req.session.user;
    const dataToSave = {
        id: sessDataUser.user_id,
        one: req.body.question_one,
        two: req.body.question_two,
        three: req.body.question_three,
        four: req.body.question_four,
        five: req.body.question_five
    }

    new users().addQuiz(dataToSave)
    .then(data => console.log(data))

    res.send(dataToSave);
});

router.post('/signup', (req,res) => {
    signUpData = req.body; 
    passMatch = req.body.password == req.body.password_check;
    var sessData = req.session;
    console.log(signUpData, passMatch);
    if(passMatch) {
        const addNew = new users().addUser(req.body.email, req.body.password);
        addNew.then(data => {
            new users().loginUser(req.body.email, req.body.password)
            .then(data => {
                sessData.user = data[0];
                sessData.loggedIn = true; 
                res.redirect('/quiz')

            })
        });
    }
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