require("./models/user");
require("./services/passport");

const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

const https = require("https");
const fs = require("fs");

//Certificates for https
const options = {
  key: fs.readFileSync("./config/certificates/pixie.key"),
  cert: fs.readFileSync("./config/certificates/pixie.crt")
};

const app = express();

mongoose.connect(keys.mongoURI);

app.use(cors({ origin: keys.redirectDomain, credentials: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "cookie_secret",
    name: "cookie_name",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require("./routes/auth_routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT + 1);
https.createServer(options, app).listen(PORT);
