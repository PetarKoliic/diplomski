"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// import image from './models/image';
const passport_1 = __importDefault(require("passport"));
require('./auth');
const routes = require('./routes');
const app = express_1.default();
var ObjectId = require('mongoose').Types.ObjectId;
// var fs = require('fs-extra');
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// app.set("view engine", "ejs");
// app.set("view engine", "ejs")
// const multer = require("multer");
// var upload = multer({ storage: storage });
app.use('/uploads', express_1.default.static('uploads'));
// var path = require('path');
// require('dotenv/config');
mongoose_1.default.connect('mongodb://localhost:27017/umetnine');
const connection = mongoose_1.default.connection;
const db = connection.db;
connection.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
var path = require('path');
//////////////////////////////////////////////////
var usr_obj = {};
function save_info(firstname, lastname, username, email) {
    usr_obj = {
        "username": username, "email": email, "firstname": firstname,
        "lastname": lastname
    };
    console.log("***********************************");
}
exports.save_info = save_info;
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get("/image.png", (req, res) => {
    console.log("usao u img");
    res.sendFile(path.join(__dirname, "../uploads/" + req.body.url));
});
app.get('/auth-google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }), () => {
    console.log("i ja se pitam");
});
app.get('/auth-google/callback', passport_1.default.authenticate('google', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/fail'
}));
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
app.use('/', routes);
//////////////////////////////////////////////////
// app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map