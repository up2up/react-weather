require("es6-promise").polyfill();
require("isomorphic-fetch");
const express = require('express');
const http = require('http');
const DARKSKYAPI = "https://api.darksky.net/forecast/";
const DARKSKYKEY = "88b7e1d01f726689e8b8507e176c0eea";
const port = 3333;

const app = express();
http.createServer(app).listen(port);

app.get('/api/', (req, res) => {
  res.json({
    message: "This is the server api"
  });
});

const apiurl = `${DARKSKYAPI}${DARKSKYKEY}/`;
app.get('/api/darksky', (req, res) => {
  try {
    let geoLocation = `${req.query.latitude},${req.query.longitude}`;
    let url = apiurl + geoLocation;
    console.log('Fetching ' + url);
    fetch(url)
      .then(response => {
        if (response.status != 200){
          res.status(response.status).json({'message' : 'Bad response from Dark Sky API'});
        }
        return response.json();
      })
      .then(body => res.status(200).json(body));
  } catch(error){
    res.status(500).json({'message': 'Errors occurs requesting Dark Sky API', 'details' : error});
  }
});

console.log('Server is listening on port ' + port);
