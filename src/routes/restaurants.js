const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/helpers');
const axios = require('axios');
var restaurants;
// google maps api key
const API_KEY = 'AIzaSyDBl2QGkM5HbAEcEGX0QfvlYlFOcqW952M';


// restaurants
router.get('/restaurants', isLoggedIn, (req, res)=>{
    res.render('restaurants', { restaurants });
    restaurants = null;

});

router.post('/restaurants/search', isLoggedIn, (req, res) => {
    const { location } = req.body;
    // make request to google maps api nearbysearch service
    const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&type=restaurant&radius=1500&key=${API_KEY}`;    
    axios.get(URL).then(response => {

        restaurants = response.data.results;

        }).catch(error => {
            
            console.log('error message: ', error.message);

        });
    req.flash('reload', 'reload');
    res.redirect('/restaurants')
});
      
    


module.exports = router;