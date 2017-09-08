// server.js
// where your node app starts

// init project
var express = require('express'),
    ejs     = require('ejs'),
    moment  = require('moment'),
    app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/", function (request, response) {
  response.redirect(`/${moment().format('unix')}`);
});

app.get("/:id", function (request, response) {
  var date = request.params.id;
  var properDate = '';
  if (date > 0){
    if(date.length = 11){
      date /= 1000;
      properDate = moment.unix(date).format("MMMM, DD, YYYY");
      response.render('index', {unix: date, natural: properDate});
    }else if (date.length = 13){
      properDate = moment.unix(date).format("MMMM, DD, YYYY");
      response.render('index', {unix: date, natural: properDate});
    }
  }else {
      properDate = moment(date).format("MMMM, DD, YYYY");   
      response.render('index', {natural: date, unix: properDate});
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
