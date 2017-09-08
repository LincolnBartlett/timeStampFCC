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
  if (date > 0){
    date /= 1000;
      var properDate = moment.unix(date).format("MMMM, DD, YYYY");
  response.render('index', {date: date, properDate: properDate});
  }else {
    response.send("not a number");
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
