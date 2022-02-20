"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// import image from './models/image';
const user_1 = __importDefault(require("./models/user"));
const image_1 = __importDefault(require("./models/image"));
const appraisal_1 = __importDefault(require("./models/appraisal"));
const rating_1 = __importDefault(require("./models/rating"));
const app = express_1.default();
var ObjectId = require('mongoose').Types.ObjectId;
// var fs = require('fs-extra');
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// app.set("view engine", "ejs");
// app.set("view engine", "ejs")
const multer = require("multer");
const DIR = './uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
var upload = multer({ storage: storage });
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
router.route('/login').post((req, res) => {
    console.log("inside login");
    let username = req.body.username;
    let password = req.body.password;
    console.log(username + ' ' + password);
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        console.log("user");
        console.log(user);
        if (err)
            console.log('error delegate');
        else {
            // let retObj = { 'user': user };
            console.log(user);
            res.json(user);
        }
    });
});
//////////////////////////////////////////////////
router.route('/register').post((req, res) => {
    let user = new user_1.default(req.body);
    if (req.body.type === "procenitelj") {
        user.set("rating", 5);
    }
    console.log(user);
    let username = req.body.username;
    let email = req.body.email;
    user_1.default.findOne({ "username": username }, (err, user_obj) => {
        if (user_obj) {
            res.json({ "msg": "Username postoji" });
        }
        else {
            user_1.default.findOne({ "email": email }, (err, user_obj) => {
                if (user_obj) {
                    res.json({ "msg": "Email postoji" });
                }
                else {
                    user.save().then(u => {
                        res.json({ "msg": "ok" });
                    });
                }
            });
        }
    });
});
//////////////////////////////////////////////////
router.route('/check-old-password').post((req, res) => {
    console.log("inside login");
    let username = req.body.username;
    let password = req.body.old_password;
    console.log(username + ' ' + password);
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        console.log("user");
        console.log(user);
        if (err)
            console.log('error delegate');
        else {
            // let retObj = { 'user': user };
            if (user != null)
                res.json({ "msg": "ok" });
            else
                res.json({ "msg": "no" });
        }
    });
});
//////////////////////////////////////////////////
router.route('/change-password').post((req, res) => {
    console.log("inside login");
    let username = req.body.username;
    let new_password = req.body.new_password;
    console.log(username + ' ' + new_password);
    user_1.default.updateOne({ 'username': username }, { $set: { 'password': new_password } }).then((user) => {
        res.status(200).json({ 'msg': 'ok' });
    }).catch((err) => {
        if (err)
            console.log(err);
        res.status(400).json({ 'msg': 'no' });
    });
});
///////////////////////////////////////////////////
var path = require('path');
router.post('/upload_pic', upload.single("picture"), (req, res) => {
    // let f = req.body.picture;
    console.log("usao u funkciju");
    //  console.log(f.size);
    let file = req.file;
    console.log(file);
    if (file) {
        let user = new image_1.default({ "img_name": file.originalname });
        user.save().then(u => {
            res.json({ "msg": "ok" });
        });
        // user.collection.updateOne({ "username": req.body.filename }, { $set: { "picture": file.filename } });
        // res.json((req as any).file);
    }
});
////////////////////////////////////////////
router.post('/add-appraisal', upload.array("images"), (req, res) => {
    let id = ObjectId(req.body.id);
    console.log("usao u add appraisal");
    console.log("username " + req.body.username);
    const files = req.files;
    let images = [];
    for (var i = 0; i < files.length; i++) {
        images.push(files[i].filename);
    }
    let appraisal = new appraisal_1.default({
        "_id": id, "username": req.body.username,
        "description": req.body.description,
        "img_names": images, "date_added": new Date(), "finished": false
    });
    appraisal.save().then(u => {
        res.json({ "msg": "ok" });
    }).catch(err => {
        res.json({ "msg": "error" });
    });
});
/////////////////////////////////////////////////
router.post('/get-appraisals-user', upload.array("images"), (req, res) => {
    let id = ObjectId(req.body.id);
    console.log("usao u add appraisal");
    console.log("username " + req.body.username);
    const files = req.files;
    let images = [];
    for (var i = 0; i < files.length; i++) {
        images.push(files[i].filename);
    }
    let appraisal = new appraisal_1.default({
        "_id": id, "username": req.body.username,
        "description": req.body.description,
        "img_names": images, "date_added": new Date(), "finished": false
    });
    appraisal.save().then(u => {
        res.json({ "msg": "ok" });
    }).catch(err => {
        res.json({ "msg": "error" });
    });
});
////////////////////////////////////////////////
router.route('/get-current-appraisals-user').post((req, res) => {
    let username = req.body.username;
    console.log("usao u get current appraisal");
    appraisal_1.default.find({ "username": username, "finished": false }, (err, appraisals) => {
        console.log(appraisals);
        res.json(appraisals);
    });
});
/////////////////////////////////////////////////
router.route('/get-current-appraisals-appraiser-history').post((req, res) => {
    let username = req.body.username;
    appraisal_1.default.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
        if (err)
            console.log(err);
        else {
            console.log("appraisals");
            console.log(appraisals);
            res.json(appraisals);
        }
    });
});
// Person.find({ 
//     "members.id": id1
//  }); 
// "evaluations.username": { $ne: username}}
/////////////////////////////////////////////////
// db.inventory.find( { quantity: { $nin: [ 5, 15 ] } }, { _id: 0 } )
router.route('/get-current-appraisals-appraiser').post((req, res) => {
    let username = req.body.username;
    // M.findOne({list: {$ne: 'A'}}
    appraisal_1.default.find({ "finished": false }, (err, appraisals) => {
        if (err)
            console.log(err);
        else {
            console.log(appraisals);
            let a2 = [];
            for (let i in appraisals) {
                let appraisal = appraisals[i].toObject();
                let flag = false;
                for (let j in appraisal.evaluations) {
                    console.log(appraisal.evaluations[j].username);
                    if (appraisal.evaluations[j].username === "ana")
                        flag = true;
                }
                if (!flag)
                    a2.push(appraisal);
            }
            // console.log(a2);
            res.json(a2);
        }
    });
});
/////////////////////////////////////////////////
router.route('/give-appraisal').post((req, res) => {
    let username = req.body.username;
    let value = req.body.value;
    let _id = ObjectId(req.body._id);
    console.log("username: " + username + " value: " + value + " _id" + _id);
    console.log("usao u current appraisals");
    user_1.default.findOne({ "username": username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            let rating = user["rating"];
            console.log(user);
            console.log("rating : " + rating);
            let evaluation = { "username": username, "rating": rating, "value": value };
            appraisal_1.default.updateOne({ "_id": _id }, { $push: { "evaluations": evaluation } }).
                then(user => {
                res.status(200).json({ "msg": "ok" });
            }).catch(err => {
                res.status(400).json({ 'msg': 'no' });
            });
            ;
        }
    });
});
/////////////////////////////////////////////////
router.route('/finish-appraisal').post((req, res) => {
    console.log(req.body.value);
    let value = req.body.value;
    let _id = ObjectId(req.body._id);
    // console.log("value: " + value + " _id : " + _id);
    // console.log("11111111111111111111111");
    appraisal_1.default.findOneAndUpdate({ '_id': _id }, { $set: { 'value': value, 'finished': true } }).then((user) => __awaiter(this, void 0, void 0, function* () {
        // console.log(user);
        //////// ovde funkcija koja radi update uppraisala
        let msg = yield update_ratings(res, user.evaluations, value);
        // console.log("55555555555555555555555555555555");
        res.status(200).json({ 'msg': msg });
    })).catch((err) => {
        if (err)
            console.log(err);
        res.status(400).json({ 'msg': 'no' });
    });
});
/////////////////////////////////////////////////
function update_ratings(res, evaluations, sold_value) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("2222222222222222222222222");
        // console.log(evaluations);
        let msg = null;
        // console.log("evaluations.length : " + evaluations.length);
        for (let i = 0; i < evaluations.length; i++) {
            let individual_rating = calculate_individual_rating(evaluations[i].value, sold_value);
            // console.log("individual ratings:");
            // console.log(individual_rating);
            yield rating_1.default.findOneAndUpdate({ 'username': evaluations[i].username }, { $push: { 'ratings': individual_rating } }).setOptions({ "upsert": true, "new": true }).then((ratings) => __awaiter(this, void 0, void 0, function* () {
                // console.log("333333333333333333");
                let username = ratings.toObject().username;
                let new_rating = calculate_new_rating(ratings.toObject());
                yield user_1.default.updateOne({ 'username': username }, { $set: { 'rating': new_rating } }).then((user) => {
                    // console.log("4.44444444");
                    // res.status(200).json({ 'msg': 'ok' });
                }).catch((err) => {
                    if (err)
                        console.log(err);
                    res.status(400).json({ 'msg': 'no' });
                });
            })).catch((err) => {
                if (err)
                    console.log(err);
                // res.status(400).json({ 'msg': 'no' });
                msg = "no";
            });
        }
        return msg == null ? "ok" : msg;
    });
}
////////////////////////////////////////////////
function calculate_individual_rating(appraised_value, sold_value) {
    let err = 10 * Math.abs(appraised_value - sold_value) / sold_value;
    if (err <= 3) {
        return 10 - err;
    }
    else if (err > 3 && err <= 5) {
        return -0.5 * err * err + 3 * err + 2.5;
    }
    else if (err > 5 && err <= 100) {
        return -(31 * Math.pow(err, 3)) / 5130000 + (49 * Math.pow(err, 2)) / 41040 - (9577 * err) / 102600 + 5579 / 1026;
    }
    else // err > 100
     {
        return 1 + 100 / err;
    }
}
function calculate_new_rating(rating) {
    let rating_val = 0;
    // console.log("calculate new rating");
    // console.log(rating);
    for (let i = 0; i < rating.ratings.length; i++) {
        rating_val += rating.ratings[i];
    }
    return rating_val / rating.ratings.length;
}
/////////////////////////////////////////////////
router.route('/get-all-current-appraisals').post((req, res) => {
    appraisal_1.default.find({ "finished": false }, (err, appraisals) => {
        if (err)
            console.log(err);
        else {
            console.log("appraisals");
            console.log(appraisals);
            res.json(appraisals);
        }
    });
});
/////////////////////////////////////////////////
router.route('/get-ratings-by-user').post((req, res) => {
    console.log(req);
    let username = req.body.username;
    console.log(username);
    rating_1.default.findOne({ "username": username }, (err, ratings) => {
        if (err)
            console.log(err);
        else {
            res.json(ratings);
        }
    });
});
router.route('/load-all-users').get((req, res) => {
    user_1.default.find({ "type": { $ne: "admin" } }, (err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});
//////////////////////////////////////////////////
router.route('/delete-user').post((req, res) => {
    console.log(req);
    let username = req.body.username;
    console.log(username);
    user_1.default.deleteOne({ 'username': username }, (err) => {
        if (err)
            console.log(err);
        else {
            console.log('obrisali smo korisnika');
            // res.json({ 'msg': 'ok' });
            appraisal_1.default.deleteMany({ "username": username, "finished": false }, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log('obrisali smo appraisale');
                    res.json({ 'msg': 'ok' });
                }
            });
        }
    });
});
/////////////////////////////////////////////////
router.route('/delete-appraisal').post((req, res) => {
    console.log(req);
    let id = ObjectId(req.body._id);
    console.log(id);
    appraisal_1.default.deleteOne({ '_id': id }, (err) => {
        if (err)
            console.log(err);
        else {
            console.log('obrisali smo umetninu');
            // res.json({ 'msg': 'ok' });
            res.json({ 'msg': 'ok' });
        }
    });
});
/////////////////////////////////////////////////////
// C:\Users\Petar\Desktop\diplomski\backend\uploads\1644117757163-slika.PNG
app.get("/image.png", (req, res) => {
    console.log("usao u img");
    res.sendFile(path.join(__dirname, "../uploads/" + req.body.url));
});
//////////////////////////////////////////////////
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map