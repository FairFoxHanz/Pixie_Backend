const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppId,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      findOrCreate(profile, done);
    }
  )
);

async function findOrCreate(profile, done) {
  try {
    const existingUser = await User.findOne({
      facebookId: profile.id
    });
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUser = await new User({
      facebookId: profile.id,
      name: profile.displayName
    });
    newUser.save();
    return done(null, newUser);
  } catch (error) {
    console.log(error);
  }
}
