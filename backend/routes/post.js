const express = require('express');
const Post = require('../models/post');
const validation = require('../validation/validation');

const router = express.Router();

router.get('', (req, res, next) => {
    Post.find()
        .then((documents) => {
            res.status(200).json({
                post: documents
            });
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('', (req, res) => {

    const result = validation(req.body);

    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }
    const post = new Post({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        EmailName: req.body.EmailName,
        RoleName: req.body.RoleName
    });

    post.save().then((response) => {
        res.status(200).json({
            message: "post data successfully",
            post: response
        });
    }).catch((err) => {
        console.log(err);
    });

});

router.put('/:id', (req, res) => {

    const result = validation(req.body);

    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }
    console.log(req.body._id);
    const post = new Post({
        _id: req.params.id,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        EmailName: req.body.EmailName,
        RoleName: req.body.RoleName
    });

    Post.updateOne({ _id: req.params.id }, post)
        .then(() => {
            res.status(200).json({
                message: "update data successfully",
                post: post
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((result) => {
            console.log(result);
            res.status(200).send("post deleted successfully");
        }).catch(err => {
            res.status(404).send("given id is not vlaid");
        })

});

module.exports = router;