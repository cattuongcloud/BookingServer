var express = require("express");
var router = express.Router();
var { mongoose } = require('../db/mongoose');
var { User } = require('../models/user');
var { authenticate } = require('../middleware/authenticate');
const {ObjectID} = require('mongodb');
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

router.get('/drivers', authenticate, (req, res) => {
  User.find({
    groupID: "5af7df22b0bec1050899a8f6"
  }).then((drivers) => {
      res.send({ drivers });
  }, (e) => {
      res.status(400).send(e);
  });
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

router.patch('/users', authenticate, (req, res) => {
  var id = req.user._id;
  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  }
  User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }).then((user) => {
      if (!user) {
          return res.status(404).send();
      }

      res.send(req.user);
  }).catch((e) => {
      res.status(400).send();
  })
});

module.exports = router;
