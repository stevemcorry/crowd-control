var app = require('./server.js');
var db = app.get('db');
var config = require('./config.js');
var sg = require('sendgrid')(config.sendgridKey);

module.exports = {
  getApartments: function(req,res,next) {
    db.get_apartments(function(err, products) {
      res.send(products);
    });
  },
  getComplexes: function(req,res) {
    db.get_complexes(function(err,complexes) {
      res.send(complexes);
    });
  },
  loginUser: function(req,res,next) {
    db.check_email([req.body.email] , function(err,email) {
      if(email[0]){
        db.check_user([req.body.email, req.body.password, req.body.name] , function(err, user) {
          if(user[0]){
            req.session.currentUser = user[0];
            res.send(user[0]);
          } else {
            res.send('nope');
          }
        });
      } else {
        db.create_user([req.body.email, req.body.password, req.body.name] , function(err, user) {
          res.send(user[0]);
          req.session.currentUser = user[0];
        });
      }
    });
  },
  createApartment: function(req,res) {
    if(req.body.user){
      db.create_apartment([req.body.user.id, req.body.user.name, req.body.complex, req.body.perRoom, req.body.singleRoom, req.body.gender, req.body.rent], function(err,apartment) {
      res.send(apartment);
      });
    } else { res.send('nope'); }
  },
  deleteApt: function(req,res) {
    if(req.body.user.id == req.body.user_id){
      db.delete_apartment([req.body.user.id, req.body.id],function(err, apartment) {
        res.send(apartment);
      });
    } else {console.log(req.body);
    }

  },

  send: function(req,res,next) {
    console.log(req.body , 'here');

    var helloEmail = function(){
      var helper = require('sendgrid').mail;
      from_email = new helper.Email(req.body.from);
      to_email = new helper.Email(req.body.to);
      subject = req.body.subj;
      content = new helper.Content("text/plain", req.body.cont);
      mail = new helper.Mail(from_email, subject, to_email, content);
      email = new helper.Email("test2@example.com");
      console.log(mail.toJSON());
      mail.personalizations[0].addTo(email);

      return mail.toJSON();
    };

    var sendEmail= function(toSend){
      console.log(JSON.stringify(toSend, null, 2));

      var requestBody = toSend;
      var emptyRequest = require('sendgrid-rest').request;
      var requestPost = JSON.parse(JSON.stringify(emptyRequest));
      requestPost.method = 'POST';
      requestPost.path = '/v3/mail/send';
      requestPost.body = requestBody;
      sg.API(requestPost, function (error, response) {
        console.log(response);
        res.send(error);
      });
    };

    sendEmail(helloEmail());
  }


};
