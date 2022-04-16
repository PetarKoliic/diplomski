import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Schema } from 'mongoose';
// import image from './models/image';

import User from './models/user';
import Image from './models/image';
import { FileslistFormatter } from 'tslint/lib/formatters';
import Appraisal from './models/appraisal';
import { Evaluation } from './models/evaluation.model';
import { find } from 'tslint/lib/utils';
import rating from './models/rating';
import { Ratings } from './models/ratings.model';
import Topic from './models/topic';
import { Comment } from './models/comment.model';
import user from './models/user';
import { name } from 'ejs';
import passport from 'passport';

require('./auth');


const app = express();
var ObjectId = require('mongoose').Types.ObjectId;
// var fs = require('fs-extra');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set("view engine", "ejs");

// app.set("view engine", "ejs")


const multer = require("multer");
const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, DIR);
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

var upload = multer({ storage: storage });

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
router.route('/login').post(
    (req, res) => {


        console.log("inside login");

        let username = req.body.username;
        let password = req.body.password;
        console.log(username + ' ' + password);


        User.findOne({ 'username': username, 'password': password },
            (err, user) => {


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
    }
);
//////////////////////////////////////////////////

router.route('/register').post((req, res) => {

    let user = new User(req.body);

    if (req.body.type === "appraiser") {
        user.set("rating", 5);
    }

    console.log(user);

    let username = req.body.username;
    let email = req.body.email;
    User.findOne({ "username": username }, (err, user_obj) => {
        if (user_obj) {

            res.json({ "msg": "Username postoji" });
        }
        else {
            User.findOne({ "email": email }, (err, user_obj) => {
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


router.route('/check-old-password').post(
    (req, res) => {


        console.log("inside login");

        let username = req.body.username;
        let password = req.body.old_password;
        console.log(username + ' ' + password);


        User.findOne({ 'username': username, 'password': password },
            (err, user) => {


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
    }
);

//////////////////////////////////////////////////

router.route('/change-password').post(
    (req, res) => {


        console.log("inside login");

        let username = req.body.username;
        let new_password = req.body.new_password;
        console.log(username + ' ' + new_password);


        User.updateOne({ 'username': username }, { $set: { 'password': new_password } }).then((user: any) => {

            res.status(200).json({ 'msg': 'ok' });
        }).catch((err: any) => {
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

    let file = (req as any).file;
    console.log(file);

    if (file) {

        let user = new Image({ "img_name": file.originalname });


        user.save().then(u => {
            res.json({ "msg": "ok" });
        })

        // user.collection.updateOne({ "username": req.body.filename }, { $set: { "picture": file.filename } });
        // res.json((req as any).file);
    }


});


////////////////////////////////////////////

router.post('/add-appraisal', upload.array("images"), (req, res) => {


    let id = ObjectId(req.body.id);


    console.log("usao u add appraisal");
    console.log("username " + req.body.username);
    const files = (req as any).files;

    let images = [];

    for (var i = 0; i < files.length; i++) {
        images.push(files[i].filename)
    }

    let appraisal = new Appraisal({
        "_id": id, "username": req.body.username,
        "description": req.body.description, "name": req.body.name,
        "country": req.body.country, "date_created": req.body.date,
        "img_names": images, "date_added": new Date(), "finished": false,
        "author": req.body.author,
    });


    appraisal.save().then(u => {
        res.json({ "msg": "ok" });
    }).catch(err => {
        res.json({ "msg": "error" });
    })
});


/////////////////////////////////////////////////


router.post('/get-appraisals-user', upload.array("images"), (req, res) => {


    let id = ObjectId(req.body.id);


    console.log("usao u add appraisal");
    console.log("username " + req.body.username);
    const files = (req as any).files;

    let images = [];

    for (var i = 0; i < files.length; i++) {
        images.push(files[i].filename)
    }

    let appraisal = new Appraisal({
        "_id": id, "username": req.body.username,
        "description": req.body.description,
        "img_names": images, "date_added": new Date(), "finished": false
    });


    appraisal.save().then(u => {
        res.json({ "msg": "ok" });
    }).catch(err => {
        res.json({ "msg": "error" });
    })
});

////////////////////////////////////////////////

router.route('/get-current-appraisals-user').post((req, res) => {

    let username = req.body.username;

    console.log("usao u get current appraisal");

    Appraisal.find({ "username": username, "finished": false }, (err, appraisals) => {

        console.log(appraisals);

        res.json(appraisals);
    })
});


////////////////////////////////////////////////

router.route('/get-history-appraisals-user').post((req, res) => {

    let username = req.body.username;

    console.log("usao u get current appraisal");

    Appraisal.find({ "username": username, "finished": true }, (err, appraisals) => {

        console.log(appraisals);

        res.json(appraisals);
    })
});


/////////////////////////////////////////////////

router.route('/get-current-appraisals-appraiser-history').post((req, res) => {

    let username = req.body.username;

    Appraisal.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
        if (err) console.log(err);
        else {

            console.log("appraisals");
            console.log(appraisals);

            res.json(appraisals);
        }
    })
});

// Person.find({ 
//     "members.id": id1
//  }); 
// "evaluations.username": { $ne: username}}
/////////////////////////////////////////////////
// db.inventory.find( { quantity: { $nin: [ 5, 15 ] } }, { _id: 0 } )


router.route('/get-current-appraisals-appraiser').post((req, res) => {

    console.log("username");
    let username = req.body.username;
    console.log(username);

    console.log("usao u appraisals appraiser ");
    // M.findOne({list: {$ne: 'A'}}


    Appraisal.find({ "finished": false }, (err, appraisals) => {
        if (err) console.log(err);
        else {


            console.log(appraisals);



            let a2 = [];

            for (let i = 0; i < appraisals.length; i++) {
                console.log("i : " + i + " duzina: " + appraisals.length);
                let appraisal = appraisals[i].toObject();
                let flag: boolean = false;
                for (let j = 0; j < appraisal.evaluations; j++) {
                    console.log("usao a nije trebalo");
                    console.log("j : " + j + " duzina: " + appraisals.length);
                    console.log(appraisal.evaluations[j].username);
                    if (appraisal.evaluations[j].username === username)
                        flag = true;
                }

                if (!flag)
                    a2.push(appraisal);
            }

            console.log("prazno");
            console.log(a2);

            res.json(a2);
        }
    })


});






/////////////////////////////////////////////////

router.route('/give-appraisal').post((req, res) => {

    let username = req.body.username;
    let value = req.body.value;
    let _id = ObjectId(req.body._id);


    console.log("username: " + username + " value: " + value + " _id" + _id);

    console.log("usao u current appraisals");

    User.findOne({ "username": username }, (err, user: any) => {
        if (err) console.log(err);
        else {

            let rating = user["rating"];
            console.log(user);
            console.log("rating : " + rating);

            let evaluation = { "username": username, "rating": rating, "value": value };


            Appraisal.updateOne({ "_id": _id }, { $push: { "evaluations": evaluation } }).
                then(user => {
                    res.status(200).json({ "msg": "ok" });
                }).catch(err => {
                    res.status(400).json({ 'msg': 'no' });
                });;

        }
    })
});


/////////////////////////////////////////////////

router.route('/add-comment').post((req, res) => {

    let username = req.body.username;
    let date_added = req.body.date_added;
    let comment = req.body.comment;
    let _id = ObjectId(req.body._id);

    console.log("usli smo ovde");


    console.log("username: " + username + " date: " + date_added + " _id: " + _id +
        " comment: " + comment);



    Topic.updateOne({ "_id": _id }, { $push: { "comments": { "username": username, "comment": comment, "date_added": date_added } } }).
        then(user => {
            res.status(200).json({ "msg": "ok" });
        }).catch(err => {
            res.status(400).json({ 'msg': 'no' });
        });;



});

/////////////////////////////////////////////////


router.route('/user-finish-appraisal').post((req, res) => {

    console.log(req.body.value);
    let _id = ObjectId(req.body._id);


    // console.log("value: " + value + " _id : " + _id);


    // console.log("11111111111111111111111");

    Appraisal.findOneAndUpdate({ '_id': _id }, { $set: { 'value': 0, 'finished': true } }).then(async (user: any) => {

        res.status(200).json({ 'msg': "ok" });
    }).catch((err: any) => {
        if (err)
            console.log(err);
        res.status(400).json({ 'msg': 'no' });
    });


});



/////////////////////////////////////////////////


router.route('/finish-appraisal').post((req, res) => {

    console.log(req.body.value);
    let value = req.body.value;
    let _id = ObjectId(req.body._id);


    // console.log("value: " + value + " _id : " + _id);


    // console.log("11111111111111111111111");

    Appraisal.findOneAndUpdate({ '_id': _id }, { $set: { 'value': value, 'finished': true } }).then(async (user: any) => {

        // console.log(user);

        //////// ovde funkcija koja radi update uppraisala
        let msg = await update_ratings(res, user.evaluations, value);



        // console.log("55555555555555555555555555555555");


        res.status(200).json({ 'msg': msg });
    }).catch((err: any) => {
        if (err)
            console.log(err);
        res.status(400).json({ 'msg': 'no' });
    });


});

/////////////////////////////////////////////////

async function update_ratings(res: any, evaluations: Evaluation[], sold_value: number) {

    // console.log("2222222222222222222222222");


    // console.log(evaluations);

    let msg = null;

    // console.log("evaluations.length : " + evaluations.length);
    for (let i = 0; i < evaluations.length; i++) {


        let individual_rating = calculate_individual_rating(evaluations[i].value, sold_value);

        // console.log("individual ratings:");
        // console.log(individual_rating);


        await rating.findOneAndUpdate({ 'username': evaluations[i].username }, { $push: { 'ratings': individual_rating } }).setOptions({ "upsert": true, "new": true }).then(async (ratings: any) => {
            // console.log("333333333333333333");


            let username = ratings.toObject().username;

            let new_rating = calculate_new_rating(ratings.toObject());

            await User.updateOne({ 'username': username }, { $set: { 'rating': new_rating } }).then((user: any) => {

                // console.log("4.44444444");

                // res.status(200).json({ 'msg': 'ok' });
            }).catch((err: any) => {
                if (err)
                    console.log(err);
                res.status(400).json({ 'msg': 'no' });
            });




        }).catch((err: any) => {
            if (err)
                console.log(err);
            // res.status(400).json({ 'msg': 'no' });

            msg = "no"
        });

    }
    return msg == null ? "ok" : msg;
}

////////////////////////////////////////////////


function calculate_individual_rating(appraised_value: number, sold_value: number) {

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

function calculate_new_rating(rating: Ratings) {
    let rating_val = 0


    // console.log("calculate new rating");
    // console.log(rating);

    if (rating == null)
        return 5;
    else if (rating.ratings == null)
        return 5;

    else {
        for (let i = 0; i < rating.ratings.length; i++) {
            rating_val += rating.ratings[i];
        }
        if (rating.ratings.length > 0)
            return rating_val / rating.ratings.length;
        else
            return 5;

    }
}






/////////////////////////////////////////////////


router.route('/get-all-current-appraisals').post((req, res) => {


    Appraisal.find({ "finished": false }, (err, appraisals) => {
        if (err) console.log(err);
        else {

            console.log("appraisals");
            console.log(appraisals);

            res.json(appraisals);
        }
    })
});

//////////////////////////////////////////////////
router.route('/get-topic').post(
    (req, res) => {


        console.log("inside login");

        let title = req.body.title;
        console.log(title);


        Topic.findOneAndUpdate({ 'title': title }, { $inc: { "views": 1 } }, (err, topic) => {


            if (err)
                console.log('error delegate');
            else {
                // let retObj = { 'user': user };
                console.log(topic);
                res.json(topic);
            }
        });
    }
);


/////////////////////////////////////////////////

router.route('/get-ratings-by-user').post((req, res) => {

    console.log(req);

    let username = req.body.username;
    console.log(username);


    rating.findOne({ "username": username }, (err, ratings) => {
        if (err) console.log(err);
        else {



            res.json(ratings);
        }
    })
});


/////////////////////////////////////////////////


router.route('/get-rating').post((req, res) => {

    let username = req.body.username;

    rating.findOne({ "username": username }, (err, ratings) => {
        if (err) console.log(err);
        else {


            let rating = calculate_new_rating(ratings != null ? ratings.toObject() : {});

            res.json({ "rating": rating });
        }
    })



});

////////////////////////////////////////////////

router.route('/load-all-users').get((req, res) => {

    User.find({ "type": { $ne: "admin" } }, (err, users) => {
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


    User.deleteOne({ 'username': username }, (err) => {

        if (err)
            console.log(err);
        else {
            console.log('obrisali smo korisnika');
            // res.json({ 'msg': 'ok' });

            Appraisal.deleteMany({ "username": username, "finished": false }, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log('obrisali smo appraisale');
                    res.json({ 'msg': 'ok' });
                }
            })
        }


    });

});


//////////////////////////////////////////////////
// TODO
router.route('/delete-comment').post((req, res) => {

    console.log("usao u delete comment");

    let username = req.body.username;
    let date_added = req.body.date_added;
    let _id = ObjectId(req.body._id);

    console.log(username + " " + date_added + " " + _id);

    // List.findOneAndUpdate({ name: listName }, { $pull: { <field1>: <value|condition> } }

    Topic.findOneAndUpdate({ '_id': _id }, { $pull: { "comments": { "username": username, "date_added": date_added } } }, (err) => {

        if (err)
            console.log(err);
        else {
            console.log('obrisali smo komentar');
            res.json({ 'msg': 'ok' });

        }


    });

});

/////////////////////////////////////////////////


router.route('/delete-appraisal').post((req, res) => {

    console.log(req);

    let id = ObjectId(req.body._id);
    console.log(id);


    Appraisal.deleteOne({ '_id': id }, (err) => {

        if (err)
            console.log(err);
        else {
            console.log('obrisali smo umetninu');
            // res.json({ 'msg': 'ok' });

            res.json({ 'msg': 'ok' });
        }

    });

});

//////////////////////////////////////////////////


router.route('/get-all-topics').post((req, res) => {


    Topic.find({}, (err, topics) => {

        res.json(topics);
    })
});


//////////////////////////////////////////////////


router.route('/add-topic').post((req, res) => {

    let username = req.body.username;
    let title = req.body.title;
    let category = req.body.category;
    let comment_description = req.body.comment;
    let date = req.body.date;
    let _id = ObjectId(req.body._id);


    console.log("usao u add-topic");

    let comment = {
        "comment": comment_description, "date_added": date, "username": username,
    };




    Topic.findOne({ "title": title }, (err, topic_found) => {

        if (topic_found) {
            res.json({ "msg": "postoji vec ista tema" });
        }

        else {

            let topic = new Topic({
                "_id": _id,
                "username": username, "title": title,
                "date_added": date, "comments": [comment],
                "category": category, "views": 0
            });


            topic.save().then(u => {
                res.json({ "msg": "ok" });
            }).catch(err => {
                res.json({ "msg": "greska unutar servera" });
            });
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

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
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




    res.redirect('http://localhost:4200/redirect' + '/?email=' + email + "&username=" + username+ "&firstname="+ firstname + "&lastname=" + lastname);

    // res.redirect('http://localhost:4200/redirect/'+ email + "/"+ username);

});


app.get('/redirect', (req, res) => {
    res.redirect("https://google.com");
});

var usr_obj: any = {};
export function save_info(firstname: string, lastname: string, username: string, email: string) {
    usr_obj = { "username": username, "email": email, "firstname": firstname,
"lastname": lastname };
    console.log("***********************************");
}

//////////////////////////////////////////////////

router.route('/login-register').post((req, res) => {



    let username = req.body.username;
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname; 

    console.log("username");
    console.log(username);
    console.log("email");
    console.log(email);


    User.findOne({ "email": email }, (err, user) => {
        if (user) {


            res.json(user);
        }
        else {
            let user = new User({"username": username,
            "firstname": firstname, "lastname": lastname, 
            "email": email, "type": "user", "rating": 5});
            user.save().then(u => {
                res.json(u);
            });
        }

    });
});



//////////////////////////////////////////////////

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));