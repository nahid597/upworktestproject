const express = require('express');
const bodyparser = require('body-parser');


const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.setHeader("Access-Control-Allow-Methods",
        "GET,POST, PATCH, PUT, DELETE, OPTIONS");

    next();
});

const posts = [
    { id: 1, FirstName: "Nhaid1", LastName: "haasan", EmailName: "nahid@gamil.com", RoleName: "artist" },
    { id: 1, FirstName: "Nhaid2", LastName: "haasa2", EmailName: "nahid@gamil.com", RoleName: "artist2" },
]

app.get('/api/posts', (req, res, next) => {
    res.status(200).json({
        post: posts
    });
});

app.post('/api/posts', (req, res) => {
    const post = req.body;
    console.log(post);

    res.status(200).json({
        message: "post data successfully",
        post: post
    });
})

module.exports = app;