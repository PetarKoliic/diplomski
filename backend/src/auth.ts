import { consoleTestResultHandler } from "tslint/lib/test";
import { isNamedExports } from "typescript";
import user from "./models/user";
import {save_info} from "./server";

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GoogleClientID = '892034769909-pq8a98o1o5ltn2gph0no339urrnfi471.apps.googleusercontent.com';

const GoogleClientSecret = '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';

// app.use(cors());


passport.use(new GoogleStrategy({
    clientID: GoogleClientID,
    clientSecret: GoogleClientSecret,
    callbackURL: "http://localhost:4000/auth-google/callback",
    passReqToCallback   : true
  },
  function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
      // ovde napraviti bazu ako vec ne postoji korisnik ili ne ako se nisu vec ulogovali
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    // user = new user({"username": "imamo_novajliju"});

    // user.save();

    console.log(profile);

    save_info(profile.given_name, profile.family_name, profile.displayName, profile.email);


    // console.log("pravljenje novih korisnika");
    // console.log("request");
    // console.log(request);

    // console.log("accessToken");
    // console.log(accessToken);

    // console.log("refreshToken");
    // console.log(refreshToken);

    // console.log("profile");
    // console.log(profile);


    console.log("email");
    console.log(profile.email);

    console.log("name");
    console.log(profile.displayName);

    console.log("done");
    // console.log(done);

    return done(null, profile);
    // next();

  }
));



passport.serializeUser(function(user: any, done: any){
    done(null, user);
  });
  
  passport.deserializeUser(function(user: any, done: any){
    done(null, user);
  });


// 892034769909-pq8a98o1o5ltn2gph0no339urrnfi471.apps.googleusercontent.com