const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//GET home page.
app.get('/', function(req, res, next) {
  res.render('home')
});

//A simple route displays wherever is added in the url.
app.post('/add', function(req, res) {
  var plateNumber = req.body.plate;
  // res.render('home')

  var dataPlates = {
    plateNumber: plateNumber
  }

  res.render('home', {
    dataPlates: dataPlates.plateNumber
  })
  return{
    dataPlates
  }
});

var port = 3000;
app.listen(port, function() {
  console.log('App runnig on ' + 'http://localhost:' + port);
})
