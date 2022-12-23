const { error } = require('console');
const { query } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const Day = mongoose.model('Day');
const Attraction = mongoose.model('Attraction');
const router = express.Router();

const UrlPlacesApi = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
const UrlDetailsApi = "https://maps.googleapis.com/maps/api/place/details/json?";
const key = "AIzaSyBcZADXVlfRvJGg8pbCQsKtTT7_7GEO5ew";

router.post('/attractionsByQuary', async (req, res) => {
    try {
        const {attraction ,area, pagetoken} = req.body; //get the attraction, area and if have page token 
        let url = UrlPlacesApi + "query=[" + attraction + ',' + area + "]&key=" + key ; // build the url for the api request
        if(pagetoken)
          url += "&pagetoken=" + pagetoken;//add pagetoken if exist to url

        https.get(url, function(response) { //fetch the attractions 
            if(response.statusMessage === 'OK')//check response status if ok 
            {
                let body =''; // save all the attraction
                response.on('data', function(chunk) {
                  body += chunk; //add attraction to body
                });
                response.on('end', function() { 
                    let places = JSON.parse(body); // convert all places to json for send to front
                    res.json(places);// return the places attraction as json
                  });                  
            }
            else
                throw error('server failed , please try again later.'); //error if cant fetch from api
          }).on('error', function(err) {
            return res.status(422).send(err.message);//case something worng response error
          });

    }
    catch (err) {
        return res.status(422).send(err.message);//case something worng response error
    }
});

router.post('/attractionDetails', async (req, res) => {
  try {
      const {placeId} = req.body;

      let url = UrlDetailsApi + "place_id=" + placeId + "&key=" + key ;
      https.get(url, function(response) {
          if(response.statusMessage === 'OK')
          {
              let body ='';
              response.on('data', function(chunk) {
                body += chunk;
              });
              response.on('end', function() {
                  let places = JSON.parse(body);
                  res.json(places);
                });                  
          }
          else
            return res.status(422).send("cant get api request , try again later.");
        }).on('error', function(err) {
          return res.status(422).send(err.message);
        });

  }
  catch (err) {
      return res.status(422).send(err.message);
  }
});

router.put('/addAttraction', async (req, res) => {
  const {dayId , name, type , startHour ,endHour , description ,hoursOpen , url} = req.body;

  try {
      let attr = new Attraction({name, type , startHour ,endHour , description ,hoursOpen , url});
      const day = await Day.updateOne({ _id: dayId }, {$push:{data : attr}});
      
      res.send();
  } catch (err) {
      res.status(422).send({ error: err.message });
  }
});

module.exports = router;
