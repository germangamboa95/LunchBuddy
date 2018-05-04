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

    res.redirect('/results');
});

router.get('/results', (req,res) => {
    var sessData = req.session;
    let email = sessData.user.user_email
    const user = new users();
    user.getMyMatch()
    .then(data => {
        const matches = matchCalculator(data,email).map(item => item[0]);
        user.getUsers()
        .then(data => {
           let y = data.filter(item => {
                for(let x of matches){
                    console.log(x);
                    if(x == item.user_id) {
                        matches.shift();
                        return item;
                    }
                }
            })
            console.log(y);
            res.render('results.pug',{
                matches: y,
                user: (sessData.user)? sessData.user.user_email: null
            });
        });
        
         
    })
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
            res.redirect('/results');
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








const matchCalculator = (data, email) => {
    const userInfo = {};
    data.forEach(item => {
      if (item.user_email == email) {
        userInfo.questions = {
          question_one: item.question_one,
          question_two: item.question_two,
          question_three: item.question_three,
          question_four: item.question_four,
          question_five: item.question_five
        };
      }
    });
    console.log(userInfo)
    const sums= []; 
  
    data.forEach(item => {
      let currentComp;
      
      if (item.user_email != email) {
  
        currentComp = {
          question_one: item.question_one,
          question_two: item.question_two,
          question_three: item.question_three,
          question_four: item.question_four,
          question_five: item.question_five
          
        };
  
        let adder = 0; 
  
        for(let x in currentComp) {
          if(currentComp[x] == userInfo.questions[x]) {
              adder++;
          }
        }
  
  
        sums.push([item.user_id,adder]);
      }
  
    });

    return sums.filter(item => item[1] > 3)
  }

module.exports = router; 
