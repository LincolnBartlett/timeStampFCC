// server.js
// where your node app starts

// init project
var express = require('express'),
    ejs     = require('ejs');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/", function (request, response) {
  response.redirect(`/${Date.now()}`);
});

app.get("/:id", function (request, response) {
  var date = request.params.id;
  var dateArr = date.split(' ');
  var unixCheck = false;
  var normCheck = false;
  dateArr.forEach(function (thing){
    if (thing === Number){
        
        response.render('index', {id: thing + "test"} );
    }
  });
  
  
  //response.render('index', {id: dateArr});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
