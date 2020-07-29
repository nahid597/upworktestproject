const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoute = require('./routes/post');


const app = express();
app.use(cors());

//golobal uri
//mongodb+srv://nahid597:yi4sd5ZzhZtqIn4u@cluster0.bowyc.mongodb.net/test?retryWrites=true&w=majority

//connect with mongodb
mongoose.connect('mongodb://nahid597:nahid123@ds253368.mlab.com:53368/upworktest', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => {
        console.log(err);
    }).then(() => {
        console.log("connected with database...");
    })

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api/posts', postRoute);

module.exports = app;