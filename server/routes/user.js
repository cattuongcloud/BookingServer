var express = require("express");
var router = express.Router();
var { mongoose } = require('../db/mongoose');
var { User } = require('../models/user');
var { authenticate } = require('../middleware/authenticate');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var multer  = require('multer');
var now = new Date(); 
var currentDate = now.getDate().toString()+now.getMonth().toString()+now.getFullYear().toString();
var fs = require('fs')
var uploadPath = './server/uploads/'+ currentDate;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
});

//var upload = multer({ storage: storage });

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const checkUploadPath = (req, res, next) => {
  fs.exists(uploadPath, function(exists) {
     if(exists) {
       next();
     }
     else {
       fs.mkdir(uploadPath, function(err) {
         if(err) {
           console.log('Error in folder creation');
           res.send(err);
         }  
         next();
       })
     }
  })
}


router.post('/users', (req, res) => {
  console.log(req.file);
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

router.post('/usersimage',checkUploadPath, upload.single('profilePic'), (req, res) => {
  console.log(req.file);
  var body = _.pick(req.body, ['email', 'password']);
  body.profilePic = req.file ? req.file.path : '';
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


router.get('/users', (req, res) => {

  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1);

  query.limit = size;
  
  User.count({}, (err, count) => {
    if(err){
      res.status(400).send(err);
    }
  }).then(()=>{
    User.find({}).limit(query.limit).skip(query.skip).then((users) => {
      res.send({ users });
  }, (e) => {
      res.status(400).send(e);
  });

  }) 
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
