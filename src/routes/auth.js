const router = require('express').Router();


router.get('/signin', (req, res) => {
    res.send('signin');
});

module.exports = router;