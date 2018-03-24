const passport = require("passport");

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
      res.redirect("/test/" + req.user.username);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/sprawdzamy");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
