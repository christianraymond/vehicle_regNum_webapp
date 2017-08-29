const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash')

const Models = require('./models');
const RegRoutes = require('./regNumbers');
const regRoutes = RegRoutes(Models);

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
}))

app.use(flash());

app.get('/home', function(req, res){
  res.send('This is my home page')
})
// ROUTES
app.get('/', regRoutes.index);
app.post('/add', regRoutes.add);
app.get('/', regRoutes.filterLoc);
app.post('/doFilter', regRoutes.doFilter);

app.set('port', process.env.PORT || 5000);
var port = 3000;
app.listen(port, function() {
  console.log('App runnig on ' + 'http://localhost:' + port);
})
