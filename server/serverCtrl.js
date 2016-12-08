var app = require('./server.js');
var db = app.get('db');
var config = require('./config.js');
var sg = require('sendgrid')(config.sendgridKey);
module.exports = ({
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
    if(req.session.currentUser){
      db.create_apartment([req.session.currentUser.id, req.session.currentUser.name, req.body.complex, req.body.perRoom, req.body.singleRoom, req.body.gender, req.body.rent], function(err,apartment) {
      res.send(apartment);
      });
    } else { res.send('nope'); }
  },
  deleteApt: function(req,res) {
    if(req.session.currentUser.id === req.body.user_id){
      db.delete_apartment([req.session.currentUser.id, req.body.id],function(err, apartment) {
        res.send(apartment);
        console.log('deleted');
      });
    } else {console.log(req.body);
      console.log(req.session.currentUser.id);
    }
  },

  send: function(req,res,next) {

    var helloEmail = function(from,to,subj,cont){
      var helper = require('sendgrid').mail;

      from_email = new helper.Email(from);
      to_email = new helper.Email(to);
      subject = subj;
      content = new helper.Content("text/plain", cont);
      mail = new helper.Mail(from_email, subject, to_email, content);
      email = new helper.Email("test2@example.com");
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
        res.send('Email Sent!');
      });
    };

    sendEmail(helloEmail(req.body.from,req.body.to,req.body.subj,req.body.cont));
  }


});
