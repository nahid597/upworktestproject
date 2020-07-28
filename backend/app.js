const express = require('express');
const bodyparser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const cors = require('cors');
const validation = require('./validation/validation');


const app = express();
app.use(cors());

//golobal uri
//mongodb+srv://nahid597:yi4sd5ZzhZtqIn4u@cluster0.bowyc.mongodb.net/test?retryWrites=true&w=majority

//connect with mongodb
mongoose.connect('mongodb://localhost/post-data', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => {
        console.log(err);
    }).then(() => {
        console.log("connected with database...");
    })

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// app.use((req, res, next) => {

//     res.setHeader("Access-Control-Allow-Origin", "*");

//     res.setHeader("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//     res.setHeader("Access-Control-Allow-Methods",
//         "GET,POST, PATCH, PUT, DELETE, OPTIONS");

//     next();
// });

app.get('/api/posts', (req, res, next) => {
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

app.get('/api/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
        })
});


app.post('/api/posts', (req, res) => {

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

    //console.log(post);

    post.save();

    res.status(200).json({
        message: "post data successfully",
        post: post
    });
});

app.put('/api/posts/:id', (req, res) => {

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



app.delete('/api/posts/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((result) => {
            console.log(result);
            res.status(200).send("post deleted successfully");
        }).catch(err => {
            res.status(404).send("given id is not vlaid");
        })

});


module.exports = app;