require('./models/user');
require('./services/passport');


const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const https = require("https");
const fs = require("fs");

//Certificates for https
const options = {
  key: fs.readFileSync("./config/certificates/pixie.key"),
  cert: fs.readFileSync("./config/certificates/pixie.crt")
};

const app = express();

mongoose.connect(keys.mongoURI);

//MIDDLEWARE:
//cookieSession sends data inside req.session
app.use(cookieSession({
    //Age set to 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/auth_routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT + 1);
https.createServer(options, app).listen(PORT);