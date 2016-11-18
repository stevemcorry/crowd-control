var app = require('./server.js');
var db = app.get('db');

module.exports = ({
  getApartments: function(req,res,next) {
    db.get_apartments(function(err, products) {
      res.send(products);
    });
  },
  createUser: function(req,res,next) {
    db.create_user([req.body.email, req.body.password] , function(err, user) {
      res.send( user);
    });
  },
  createApartment: function(req,res) {
    db.create_apartment([req.body.user_id, req.body.name, req.body.complex, req.body.perRoom, req.body.singleRoom, req.body.gender, req.body.rent], function(err,apartment) {
      res.send(apartment);
    });
  }

});
