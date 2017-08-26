const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash')

const RegRoutes = require('./regNumbers');
const Models = require('./models');
const models = Models('mongodb://localhost/regNumber');
const regRoutes = RegRoutes(models);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));

app.use(flash());
//GET home page.
app.get('/', function(req, res, next) {
  res.render('home');
});

app.get('/regNumbers', RegRoutes.index);
app.get('/regNumbers/add', RegRoutes.addingSection);
app.post('/add', RegRoutes.add);

var port = 3000;
app.listen(port, function() {
  console.log('App runnig on ' + 'http://localhost:' + port);
})
