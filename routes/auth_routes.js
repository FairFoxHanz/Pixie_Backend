const passport = require("passport");
const keys = require("../config/keys");
const fs = require("fs");
module.exports = app => {
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["user_friends"]
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect(`${keys.redirectDomain}/`);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect(`${keys.redirectDomain}/`);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
