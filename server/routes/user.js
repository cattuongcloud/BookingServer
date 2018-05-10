var express = require("express");
var router = express.Router();
var {mongoose} = require('../db/mongoose');
var {User} = require('../models/user');
var {authenticate} = require('../middleware/authenticate');
const _ = require('lodash');
router.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  console.log(body);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token)
       .send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

router.get('/users/me', authenticate, (req, res) => {
  res.header('x-auth', req.token)
  .send(req.user);
 // res.send(req.user).header('x-auth', req.token);
});

// POST /users/login {email, password}
router.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});
router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;
