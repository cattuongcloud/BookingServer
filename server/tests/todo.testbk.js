process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {populateTodos, populateUsers} = require('./seed/seed');
var should = chai.should();
chai.use(chaiHttp);

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
  }, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
  }];

  const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }];

 
describe('Todo', function() { 
    beforeEach((done)=>{        
        User.remove({}).then(()=>{
            var userOne = new User(users[0]).save();
            var userTwo = new User(users[1]).save();
        }).then(()=>{
            Todo.remove({}).then(() => {
                Todo.insertMany(todos);
                
            })
        });        
        done();
    })
    it('should create a new todo', function(done) {
        var text = 'this is a textt';
        this.timeout(12000);
        chai.request(app)
        .post('/api/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text})
        .end((err, res)=>{
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.be.a('object');
            res.body.SUCCESS.should.have.property('text');            
            res.body.SUCCESS.should.have.property('_id');            
            done();
            
        })
        
      });
});

