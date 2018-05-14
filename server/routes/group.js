var express = require("express");
var router = express.Router();
var { mongoose } = require('../db/mongoose');
var { Group } = require('../models/group');
var { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');

router.post('/groups', authenticate, (req, res) => {
    var group = new Group({
        name: req.body.name,
        _creator: req.user._id
    });

    group.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/groups', authenticate, (req, res) => {
    Group.find({
        _creator: req.user._id
    }).then((groups) => {
        res.send({ groups });
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/groups/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Group.findOne({
        _id: id,
        _creator: req.user._id
    }).then((group) => {
        if (!group) {
            return res.status(404).send();
        }

        res.send({ group });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/groups/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Group.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((group) => {
        if (!group) {
            return res.status(404).send();
        }

        res.send({ group });
    }).catch((e) => {
        res.status(400).send();
    });
});


router.patch('/groups/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Group.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((group) => {
        if (!group) {
            return res.status(404).send();
        }

        res.send({ group });
    }).catch((e) => {
        res.status(400).send();
    })
});

module.exports = router;
