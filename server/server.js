var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('./config.js');
var cors = require('cors');
var session = require('express-session');
var app = module.exports = express();
app.use(express.static(__dirname + '/../public'));
var massiveInstance = massive.connectSync({connectionString: 'postgres://postgres:'+config.postgresPass+'@localhost/Contracts'});
app.set('db', massiveInstance);
var db = app.get('db');
var corsOptions = {origin: 'http://localhost:3000'};
var serverCtrl = require('./serverCtrl.js');
app.use(cors(corsOptions));
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));
app.use(bodyParser.json());

//Endpoints
app.get('/apartments', serverCtrl.getApartments);
app.get('/complexes', serverCtrl.getComplexes);
app.post('/user', serverCtrl.loginUser);
app.post('/apartment', serverCtrl.createApartment);
app.post('/apartment/delete', serverCtrl.deleteApt);


app.listen(3000,function() {
  console.log('Here');
});
