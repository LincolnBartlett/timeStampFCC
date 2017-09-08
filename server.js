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
  var final;
  var finalCon= function(unix, natural){
    return {
      "unix" : unix,
      "natural" : natural
    };
  };
  if (date > 0){
        if(date > 100000000000){
          date /= 1000,
          valid = moment.unix(date).format('x') > 0;
            if (valid === true){
              properDate = moment.unix(date).format("MMMM, DD, YYYY");
              date *= 1000;
              final = finalCon(Number(date), properDate);  
              response.render('index', {final: final});       
            } else {
                final = finalCon(null, null); 
                response.render('index', {final: final}); 
            }
        } else {
          valid = moment.unix(date).format('x') > 0;
            if (valid == true){
              properDate = moment.unix(date).format("MMMM, DD, YYYY");
              final = finalCon(Number(date), properDate); 
              response.render('index', {final: final});       
            } else {
              final = finalCon(null, null); 
            }
        }
  } else {
      properDate = moment(date).format("MMMM, DD, YYYY");  
      date = moment(date).format('x');
      valid = moment.unix(date).format('x') > 0;
        if (valid == true){
          final = finalCon(Number(date), properDate); 
          response.render('index', {final: final});
        }else{
          final = finalCon(null, null); 
          response.render('index', {final: final}); 
        }
  }
});
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
