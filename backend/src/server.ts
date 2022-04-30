import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Schema } from 'mongoose';
// import image from './models/image';
import passport from 'passport';


require('./auth');

const routes = require('./routes');


const app = express();
var ObjectId = require('mongoose').Types.ObjectId;
// var fs = require('fs-extra');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set("view engine", "ejs");

// app.set("view engine", "ejs")


// const multer = require("multer");




// var upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));


// var path = require('path');
// require('dotenv/config');



mongoose.connect('mongodb://localhost:27017/umetnine');

const connection = mongoose.connection;

const db = connection.db;

connection.once('open', () => {
    console.log('mongo open');
})

const router = express.Router();
var path = require('path');

//////////////////////////////////////////////////

var usr_obj: any = {};
export function save_info(firstname: string, lastname: string, username: string, email: string) {
    usr_obj = {
        "username": username, "email": email, "firstname": firstname,
        "lastname": lastname
    };
    console.log("***********************************");
}

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/image.png", (req, res) => {

    console.log("usao u img");

    res.sendFile(path.join(__dirname, "../uploads/" + req.body.url));
});


app.get('/auth-google', passport.authenticate('google', { scope: ['email', 'profile'] }),
    () => {
        console.log("i ja se pitam");
    });


app.get('/auth-google/callback', passport.authenticate('google',
    {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/fail'
    },
));


app.get('/auth/fail', (req, res) => {

    res.send("Greska neka");
});

app.get('/auth/success', (req, res) => {

    console.log("user object");
    console.log(usr_obj);


    let username = usr_obj["username"];
    let email = usr_obj["email"];
    let firstname = usr_obj["firstname"];
    let lastname = usr_obj["lastname"];




    res.redirect('http://localhost:4200/redirect' + '/?email=' + email + "&username=" + username + "&firstname=" + firstname + "&lastname=" + lastname);

    // res.redirect('http://localhost:4200/redirect/'+ email + "/"+ username);

});


app.get('/redirect', (req, res) => {
    res.redirect("https://google.com");
});

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
//   
// var upload = multer({ storage: storage });

// var ObjectId = require('mongoose').Types.ObjectId;
// app.post('/', upload.single('image'), (req, res, next) => {

//////////////////////////////////////////////////




app.use('/',  routes);


//////////////////////////////////////////////////




// app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));