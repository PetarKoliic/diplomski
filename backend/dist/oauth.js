"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GoogleClientID = '892034769909-pq8a98o1o5ltn2gph0no339urrnfi471.apps.googleusercontent.com';
const GoogleClientSecret = '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';
passport.use(new GoogleStrategy({
    clientID: GoogleClientID,
    clientSecret: GoogleClientSecret,
    callbackURL: "http://localhost:4200/appraiser",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    // ovde napraviti bazu ako vec ne postoji korisnik ili ne ako se nisu vec ulogovali
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    console.log("pravljenje novih korisnika");
    console.log("request");
    console.log(request);
    console.log("accessToken");
    console.log(accessToken);
    console.log("refreshToken");
    console.log(refreshToken);
    console.log("profile");
    console.log(profile);
    console.log("done");
    console.log(done);
    return done(null, profile);
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// 892034769909-pq8a98o1o5ltn2gph0no339urrnfi471.apps.googleusercontent.com
//# sourceMappingURL=oauth.js.map