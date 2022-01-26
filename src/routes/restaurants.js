const router = require('express').Router();

router.get('/restaurants', (req, res) => {
    res.render('restaurants');
});

module.exports = router;