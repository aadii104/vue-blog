var express = require('express');
var router = express.Router();


var jwt = require('jsonwebtoken');
var config = require('./../models/config');
var Model = require('./../models/model');
var utility = require('./../utilities/utilities');

router.post('/login',(req, res) =>{
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string')
    return res.json({
      success: false,
      message: 'data mismatch'
    });
  else {
    username = username.toLowerCase();
    Model.User.findOne({
      username: username
    }).exec()
      .then((user) => {
        if (!user)
          res.json({
            success: false,
            message: 'User mismatch'
          });
        else {
          return Model.validatePassword(password, user.password)
            .then((isMatch)=> {
              if (!isMatch)
                res.json({
                  success: false,
                  message: 'User mismatch'
                });
              else {
                var token = jwt.sign({
                  _doc: {
                    username: user.username
                  }
                },
                  config.secret, {
                    expiresIn: '1d'
                  });
                let secureToken = utility.encrypt(token, config.secret);
                res.json({
                  success: true,
                  token: secureToken
                });
              }
            });
        }
      })
      .catch((err) => {
        if (err !== 'Error' && err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: 'Shit!!! well sorry about these bugs, please be patient'
          });
        }
      });
  }
});

router.post('/signup', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if (!username || !password || typeof (username) !== 'string' ||
    typeof (password) !== 'string' || !password2 || typeof password2 !== 'string')
    return res.json({
      success: false,
      message: 'Incorrect credentials format'
    });
  if (password !== password2)
    return res.json({
      success: false,
      message: 'Passwords do not match'
    });
  else {
    username = username.toLowerCase();
    Model.User.findOne({
      username: username
    }).exec()
      .then(function (user) {
        if (user) {
          res.json({
            success: false,
            message: 'User is already registered. Please select another username.'
          });
          return Promise.reject('Error');
        } else {
          return Model.createHash(password);
        }
      })
      .then(function (hash) {
        return Model.User({
          username: username,
          password: hash
        });
      })
      .then(function (averageJoe) {
        return averageJoe.save();
      })
      .then(function () {
        res.json({
          success: true,
          message: 'User registration successful'
        });
      })
      .catch(function (err) {
        if (err !== 'Error' && err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: 'Something happened at our end. Check back after sometime.'
          });
        }
      });
  }
});



module.exports = router;
