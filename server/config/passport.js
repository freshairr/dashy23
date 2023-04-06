var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
require('dotenv').config({path: __dirname + '/.env',debug: true })

module.exports = function (passport) {
  authUser = (req, accessToken, refreshToken, profile, done) => {
    console.log(profile, done);
    User.create({'google.id': profile.id }, function (err, user) {
        return done(null, profile); 
      });
    }
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/oauth2/redirect/accounts.google.com",
        scope: [ 'profile' ],
        state: true,
        passReqToCallback: true
      }, authUser))

    passport.serializeUser( (user, done) => {
      done(null, user)
   })
  
   passport.deserializeUser((user, done) => {
    done (null, user)
  })
}
