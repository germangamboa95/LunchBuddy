const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('index.pug', {
        user: "German"
    }); 
});

router.get('/quiz', (req, res) => {
    res.render('quiz.pug', {
        user: 'German'
    }); 
});

router.post('/quiz', (req, res) => {
    console.log(req.body)
    res.send('Ok')
});


module.exports = router; 