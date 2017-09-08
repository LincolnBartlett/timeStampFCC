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
  response.redirect(`/${moment().format('unix').slice(3)}`);
});

app.get("/:id", function (request, response) {
  var date = request.params.id;
  var properDate = '';
  var valid = false;
  
  if (date > 0){
    if(date > 100000000000){
      date /= 1000,
      valid = moment.unix(date).format('x') > 0;
      if (valid === true){
        properDate = moment.unix(date).format("MMMM, DD, YYYY");
        date *= 1000;
        response.render('index', {unix: date, natural: properDate, valid : valid});       
      } else {
          response.send("sorry");
      }

    } else {
      valid = moment.unix(date).format('x') > 0;
      if (valid == true){
        properDate = moment.unix(date).format("MMMM, DD, YYYY");
        response.render('index', {unix: date, natural: properDate, valid : valid});       
      } else {
          response.send("sorry");
      }
    }
  } else {
      date = moment(date).format('x');
      properDate = moment(date).format("MMMM, DD, YYYY");   
      response.render('index', {natural: date, unix: properDate, valid : valid});
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
