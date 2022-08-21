const express = require("express");
const router = express.Router();
import User from "./models/user";
import Image from "./models/image";
import { FileslistFormatter } from "tslint/lib/formatters";
import Appraisal from "./models/appraisal";
import { Evaluation } from "./models/evaluation.model";
import { find } from "tslint/lib/utils";
import rating from "./models/rating";
import { Ratings } from "./models/ratings.model";
import Topic from "./models/topic";
import { Comment } from "./models/comment.model";
import user from "./models/user";
import { name } from "ejs";
import { calculate_individual_rating } from "./util";
import { calculate_new_rating } from "./util";
// import {register} from './services';


// var services = require("./services");


const services = require('./services');
const multer = require("multer");

export const monthly_fee = 10;
export const appraiser_percantage_fee = 0.5;

var ObjectId = require("mongoose").Types.ObjectId;

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, DIR);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

const DIR = "./uploads/";



router.route("/login").post(async (req: any, res: any) => {
  console.log("inside login");

  let username = req.body.username;
  let password = req.body.password;
  console.log(username + " " + password);

  //  res.json("ajde");
  try {
    let msg = await services.login(username, password);

    res.json(msg);
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
  }
});

//////////////////////////////////////////////////

router.route("/register").post(async (req: any, res: any) => {
  let user = new User(req.body);

  console.log("user");

  user.set("owned", monthly_fee);

  console.log(user);

  if (req.body.type === "appraiser") {
    user.set("rating", 5);
    user.set("cnt_appraisals_monthly", 0);
    user.set("balance", 0);

  }

  console.log(user);

  let username = req.body.username;
  let email = req.body.email;

  let msg = await services.register(user, username, email);

  console.log("finalni rezultat");
  console.log(msg);

  res.json(msg);
});
//////////////////////////////////////////////////

router.route("/register-google").post(async (req: any, res: any) => {
  let user = new User(req.body);

  console.log("user");

  if (req.body.type === "user") 
    user.set("owned", monthly_fee);

  console.log(user);

  if (req.body.type === "appraiser") {
    user.set("rating", 5);
    user.set("cnt_appraisals_monthly", 0);
    user.set("balance", 0);
  }

  console.log(user);

  let username = req.body.username;
  let email = req.body.email;

  let msg = await services.register(user, username, email);

  console.log("finalni rezultat");
  console.log(msg);

  res.json(msg);
});
//////////////////////////////////////////////////

router.route("/check-old-password").post(async (req: any, res: any) => {
  console.log("inside check-old password");

  let username = req.body.username;
  let password = req.body.old_password;
  console.log(username + " " + password);

  let msg = await services.check_old_password(username, password);

  res.json(msg);
});

//////////////////////////////////////////////////

router.route("/change-password").post(async (req: any, res: any) => {
  console.log("inside password");

  let username = req.body.username;
  let new_password = req.body.new_password;
  console.log(username + " " + new_password);

  let msg = await services.check_old_password(username, new_password);

  res.json(msg);
});

///////////////////////////////////////////////////

router.post("/upload_pic", upload.single("picture"), (req: any, res: any) => {
  // let f = req.body.picture;

  console.log("usao u funkciju");

  //  console.log(f.size);

  let file = (req as any).file;
  console.log(file);

  if (file) {
    let user = new Image({ img_name: file.originalname });

    user.save().then((u) => {
      res.json({ msg: "ok" });
    });

    // user.collection.updateOne({ "username": req.body.filename }, { $set: { "picture": file.filename } });
    // res.json((req as any).file);
  }
});

////////////////////////////////////////////

router.post(
  "/add-appraisal",
  upload.array("images"),
  async (req: any, res: any) => {
    let id = ObjectId(req.body.id);

    console.log("usao u add appraisal");
    console.log("username " + req.body.username);
    const files = (req as any).files;

    let images = [];

    for (var i = 0; i < files.length; i++) {
      images.push(files[i].filename);
    }

    let appraisal = new Appraisal({
      _id: id,
      username: req.body.username,
      description: req.body.description,
      name: req.body.name,
      country: req.body.country,
      date_created: req.body.date,
      img_names: images,
      date_added: new Date(),
      finished: false,
      author: req.body.author,
    });

    let msg = await services.add_appraisal(appraisal);

    res.json(msg);
  }
);

/////////////////////////////////////////////////

router.post(
  "/get-appraisals-user",
  upload.array("images"),
  async (req: any, res: any) => {
    let id = ObjectId(req.body.id);

    console.log("usao u add appraisal");
    console.log("username " + req.body.username);
    const files = (req as any).files;

    let images = [];

    for (var i = 0; i < files.length; i++) {
      images.push(files[i].filename);
    }

    let appraisal = new Appraisal({
      _id: id,
      username: req.body.username,
      description: req.body.description,
      img_names: images,
      date_added: new Date(),
      finished: false,
    });

    let msg = await services.get_appraisals_user(appraisal);

    res.json(msg);
  }
);

////////////////////////////////////////////////

router
  .route("/get-current-appraisals-user")
  .post(async (req: any, res: any) => {
    let username = req.body.username;

    console.log("usao u get current appraisal");

    let msg = await services.get_current_appraisals_user(username);

    res.json(msg);
  });

////////////////////////////////////////////////

router
  .route("/get-history-appraisals-user")
  .post(async (req: any, res: any) => {
    let username = req.body.username;

    console.log("usao u get current appraisal");

    let msg = await services.get_history_appraisals_user(username);

    res.json(msg);
  });

/////////////////////////////////////////////////

router
  .route("/get-current-appraisals-appraiser-history")
  .post(async (req: any, res: any) => {
    let username = req.body.username;

    // Appraisal.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
    //     if (err) console.log(err);
    //     else {

    //         console.log("appraisals");
    //         console.log(appraisals);

    //         res.json(appraisals);
    //     }
    // });

    let msg = await services.get_current_appraisals_appraiser_history(username);

    res.json(msg);
  });

// Person.find({
//     "members.id": id1
//  });
// "evaluations.username": { $ne: username}}
/////////////////////////////////////////////////
// db.inventory.find( { quantity: { $nin: [ 5, 15 ] } }, { _id: 0 } )

router
  .route("/get-current-appraisals-appraiser")
  .post(async (req: any, res: any) => {
    console.log("username");
    let username = req.body.username;
    console.log(username);

    console.log("usao u appraisals appraiser ");
    // M.findOne({list: {$ne: 'A'}}

    // Appraisal.find({ "finished": false }, (err, appraisals) => {
    //     if (err) console.log(err);
    //     else {

    //         console.log(appraisals);

    //         let a2 = [];

    //         for (let i = 0; i < appraisals.length; i++) {
    //             console.log("i : " + i + " duzina: " + appraisals.length);
    //             let appraisal = appraisals[i].toObject();
    //             let flag: boolean = false;
    //             for (let j = 0; j < appraisal.evaluations.length; j++) {
    //                 console.log("usao a nije trebalo");
    //                 console.log("j : " + j + " duzina: " + appraisals.length);
    //                 console.log(appraisal.evaluations[j].username);
    //                 if (appraisal.evaluations[j].username === username)
    //                     flag = true;
    //             }

    //             if (!flag)
    //                 a2.push(appraisal);
    //         }

    //         console.log("prazno");
    //         console.log(a2);

    //         res.json(a2);
    //     }
    // })

    let msg = await services.get_current_appraisals_appraiser(username);

    res.json(msg);
  });

/////////////////////////////////////////////////

router.route("/give-appraisal").post(async (req: any, res: any) => {
  let username = req.body.username;
  let value = req.body.value;
  let _id = ObjectId(req.body._id);

  console.log("username: " + username + " value: " + value + " _id" + _id);

  console.log("usao u give appraisals");

  // User.findOne({ "username": username }, (err, user: any) => {
  //     if (err) console.log(err);
  //     else {

  //         let rating = user["rating"];
  //         console.log(user);
  //         console.log("rating : " + rating);

  //         let evaluation = { "username": username, "rating": rating, "value": value };

  //         Appraisal.updateOne({ "_id": _id }, { $push: { "evaluations": evaluation } }).
  //             then(user => {
  //                 res.status(200).json({ "msg": "ok" });
  //             }).catch(err => {
  //                 res.status(400).json({ 'msg': 'no' });
  //             });;

  //     }
  // })
  let msg = await services.give_appraisal(username, value, _id, res);

  res.json(msg);
});

/////////////////////////////////////////////////

router.route("/appraisal-change-mind").post(async (req: any, res: any) => {
  let username = req.body.username;
  let value = req.body.value;
  let _id = ObjectId(req.body._id);

  console.log("username: " + username + " value: " + value + " _id" + _id);

  console.log("usao u appraisal change mind");

  let msg = await services.appraisal_change_mind(username, value, _id, res);

  res.json(msg);
});

/////////////////////////////////////////////////

router.route("/add-revenue-monthly-subscription").post(async (req: any, res: any) => {
  

  let msg = await services.add_revenue_monthly_subscription();

  res.json(msg);
});



/////////////////////////////////////////////////

router.route("/add-comment").post(async (req: any, res: any) => {
  let username = req.body.username;
  let date_added = req.body.date_added;
  let comment = req.body.comment;
  let _id = ObjectId(req.body._id);

  console.log("usli smo ovde");

  console.log(
    "username: " +
      username +
      " date: " +
      date_added +
      " _id: " +
      _id +
      " comment: " +
      comment
  );

  // Topic.updateOne({ "_id": _id }, { $push: { "comments": { "username": username, "comment": comment, "date_added": date_added } } }).
  //     then(user => {
  //         res.status(200).json({ "msg": "ok" });
  //     }).catch(err => {
  //         res.status(400).json({ 'msg': 'no' });
  //     });;

  let msg = await services.add_comment(username, _id, date_added, comment);

  res.json(msg);
});

/////////////////////////////////////////////////

router.route("/user-finish-appraisal").post(async (req: any, res: any) => {
  console.log(req.body.value);
  let _id = ObjectId(req.body._id);

  // Appraisal.findOneAndUpdate({ '_id': _id }, { $set: { 'value': 0, 'finished': true } }).then(async (user: any) => {

  //     res.status(200).json({ 'msg': "ok" });
  // }).catch((err: any) => {
  //     if (err)
  //         console.log(err);
  //     res.status(400).json({ 'msg': 'no' });
  // });

  let msg = await services.user_finish_appraisal(_id);

  res.json(msg);
});

/////////////////////////////////////////////////

router.route("/finish-appraisal").post(async (req: any, res: any) => {
  console.log(req.body.value);
  let value = req.body.value;
  let _id = ObjectId(req.body._id);

  // console.log("value: " + value + " _id : " + _id);

  // console.log("11111111111111111111111");

  // Appraisal.findOneAndUpdate({ '_id': _id }, { $set: { 'value': value, 'finished': true } }).then(async (user: any) => {

  //     // console.log(user);

  //     //////// ovde funkcija koja radi update uppraisala
  //     let msg = await update_ratings(res, user.evaluations, value);

  //     // console.log("");

  //     res.status(200).json({ 'msg': msg });
  // }).catch((err: any) => {
  //     if (err)
  //         console.log(err);
  //     res.status(400).json({ 'msg': 'no' });
  // });

  let msg = await services.finish_appraisal(_id, value);
  res.json(msg);
});

/////////////////////////////////////////////////

export async function update_ratings(
  res: any,
  evaluations: Evaluation[],
  sold_value: number
) {
  // console.log("2222222222222222222222222");

  // console.log(evaluations);

  let msg = null;

  // console.log("evaluations.length : " + evaluations.length);
  for (let i = 0; i < evaluations.length; i++) {
    let individual_rating = calculate_individual_rating(
      evaluations[i].value,
      sold_value
    );

    // console.log("individual ratings:");
    // console.log(individual_rating);

    await rating
      .findOneAndUpdate(
        { username: evaluations[i].username },
        { $push: { ratings: individual_rating }
         }
      )
      .setOptions({ upsert: true, new: true })
      .then(async (ratings: any) => {
        // console.log("333333333333333333");

        let username = ratings.toObject().username;

        let new_rating = calculate_new_rating(ratings.toObject());

        await User.updateOne(
          { username: username },
          { $set: { rating: new_rating }, 
          $inc: {cnt_appraisals_monthly: 1} }
        )
          .then((user: any) => {
            // console.log("4.44444444");
            // res.status(200).json({ 'msg': 'ok' });
          })
          .catch((err: any) => {
            if (err) console.log(err);
            res.status(400).json({ msg: "no" });
          });
      })
      .catch((err: any) => {
        if (err) console.log(err);
        // res.status(400).json({ 'msg': 'no' });

        msg = "no";
      });
  }
  return msg == null ? "ok" : msg;
}

/////////////////////////////////////////////////

router.route("/get-all-current-appraisals").post(async (req: any, res: any) => {
  // Appraisal.find({ "finished": false }, (err, appraisals) => {
  //     if (err) console.log(err);
  //     else {

  //         console.log("appraisals");
  //         console.log(appraisals);

  //         res.json(appraisals);
  //     }
  // })

  let msg = await services.get_all_current_appraisals();
  res.json(msg);
});

//////////////////////////////////////////////////
router.route("/get-topic").post(async (req: any, res: any) => {
  console.log("inside login");

  let title = req.body.title;
  console.log(title);

  // Topic.findOneAndUpdate({ 'title': title }, { $inc: { "views": 1 } }, (err, topic) => {

  //     if (err)
  //         console.log('error delegate');
  //     else {
  //         // let retObj = { 'user': user };
  //         console.log(topic);
  //         res.json(topic);
  //     }
  // });

  let msg = await services.get_topic(title);
  res.json(msg);
});

/////////////////////////////////////////////////

router.route("/get-ratings-by-user").post(async (req: any, res: any) => {
  console.log(req);

  let username = req.body.username;
  console.log(username);

  // rating.findOne({ "username": username }, (err, ratings) => {
  //     if (err) console.log(err);
  //     else {

  //         res.json(ratings);
  //     }
  // })
  let msg = await services.get_ratings_by_user(username);
  res.json(msg);
});

/////////////////////////////////////////////////

router.route("/get-rating").post(async (req: any, res: any) => {
  let username = req.body.username;

  // rating.findOne({ "username": username }, (err, ratings) => {
  //     if (err) console.log(err);
  //     else {

  //         let rating = calculate_new_rating(ratings != null ? ratings.toObject() : {});

  //         res.json({ "rating": rating });
  //     }
  // })

  let msg = await services.get_rating(username);
  res.json(msg);
});

////////////////////////////////////////////////

router.route("/load-all-users").get(async (req: any, res: any) => {
  // User.find({ "type": { $ne: "admin" } }, (err, users) => {
  //     if (err)
  //         console.log(err);
  //     else
  //         res.json(users);
  // });

  let msg = await services.load_all_users();
  res.json(msg);
});

//////////////////////////////////////////////////

router.route("/delete-user").post(async (req: any, res: any) => {
  console.log(req);

  let username = req.body.username;
  console.log(username);

  // User.deleteOne({ 'username': username }, (err) => {

  //     if (err)
  //         console.log(err);
  //     else {
  //         console.log('obrisali smo korisnika');
  //         // res.json({ 'msg': 'ok' });

  //         Appraisal.deleteMany({ "username": username, "finished": false }, (err) => {
  //             if (err)
  //                 console.log(err);
  //             else {
  //                 console.log('obrisali smo appraisale');
  //                 res.json({ 'msg': 'ok' });
  //             }
  //         })
  //     }

  // });

  let msg = await services.delete_user(username);
  res.json(msg);
});

//////////////////////////////////////////////////
//
router.route("/delete-comment").post(async (req: any, res: any) => {
  console.log("usao u delete comment");

  let username = req.body.username;
  let date_added = req.body.date_added;
  let comment = req.body.comment;
  let _id = ObjectId(req.body._id);

  console.log(username + " " + date_added + " " + _id);

  // List.findOneAndUpdate({ name: listName }, { $pull: { <field1>: <value|condition> } }

  // date added ne radi
  // "date_added": date_added
  // Topic.findOneAndUpdate({ '_id': _id }, { $pull: { "comments": { "username": username, "comment": comment} } }, (err) => {

  //     if (err)
  //         console.log(err);
  //     else {
  //         console.log('obrisali smo komentar');
  //         res.json({ 'msg': 'ok' });

  //     }

  // });

  let msg = await services.delete_comment(_id, username, comment, date_added);
  res.json(msg);
});

/////////////////////////////////////////////////

router.route("/delete-appraisal").post(async (req: any, res: any) => {
  console.log("usao u delete appriasal");
  console.log(req.body._id);

  let id = ObjectId(req.body._id);
  console.log(id);

  // Appraisal.deleteOne({ '_id': id }, (err) => {

  //     if (err)
  //         console.log(err);
  //     else {
  //         console.log('obrisali smo umetninu');
  //         // res.json({ 'msg': 'ok' });

  //         res.json({ 'msg': 'ok' });
  //     }

  // });

  let msg = await services.delete_appraisal(id);
  res.json(msg);
});

//////////////////////////////////////////////////

router.route("/get-all-topics").post((req: any, res: any) => {
  Topic.find({}, (err, topics) => {
    res.json(topics);
  });
});

//////////////////////////////////////////////////

router.route("/update-subscription").post(async (req: any, res: any) => {
  let username = req.body.username;

  console.log("pocetak");

  // User.findOne({ "username": username }, (err, user_doc) => {
  //     if (!err) {

  //         let user_obj = user_doc.toObject();

  //         let valid_until = new Date(user_obj.valid_until);
  //         valid_until.setMonth(valid_until.getMonth() + 1);

  //         console.log("valid until");
  //         console.log(valid_until);
  //         User.findOneAndUpdate({ "username": username }, { $set: { "valid_until": valid_until } }, (err, data) => {

  //             if (err) {
  //                 res.status(400).json({ "msg": "no" });
  //             }
  //             else {

  //                 res.json({ "msg": "ok" });
  //             }

  //         });
  //     }
  //     else {

  //         res.status(400).json({ "msg": "no" });
  //     }

  // });

  let msg = await services.update_subscription(username);
  res.json(msg);
});

//////////////////////////////////////////

router
  .route("/get-subscription-valid-until")
  .post(async (req: any, res: any) => {
    let username = req.body.username;

    console.log("get-subscription-valid-until");

    // User.findOne({ "username": username }, (err, user) => {
    //     if (!err) {
    //         res.json({ "valid_until": user.get("valid_until") });
    //     }
    //     else {
    //         res.status(400).json({ "msg": "no" });
    //     }

    // });

    let msg = await services.get_subscription_valid_until(username);
    res.json(msg);
  });

// col.findOneAndUpdate(
//     { _id : item._id }
//     , { $set : { nextRun : new Date(item.nextRun.getTime() + 86400000}}

//     var nextRunDate = new Date(item.nextRun);
//     nextRunDate.setMonth(nextRunDate.getMonth() + 1);
//     col.findOneAndUpdate(
//         { _id : item._id },
//         { $set : { nextRun : nextRunDate } }
//     );

//////////////////////////////////////////////////

router.route("/add-topic").post(async (req: any, res: any) => {
  let username = req.body.username;
  let title = req.body.title;
  let category = req.body.category;
  let comment_description = req.body.comment;
  let date = req.body.date;
  let _id = ObjectId(req.body._id);

  console.log("usao u add-topic");

  let comment = {
    comment: comment_description,
    date_added: date,
    username: username,
  };

  // Topic.findOne({ "title": title }, (err, topic_found) => {

  //     if (topic_found) {
  //         res.json({ "msg": "postoji vec ista tema" });
  //     }

  //     else {

  //         let topic = new Topic({
  //             "_id": _id,
  //             "username": username, "title": title,
  //             "date_added": date, "comments": [comment],
  //             "category": category, "views": 0
  //         });

  //         topic.save().then(u => {
  //             res.json({ "msg": "ok" });
  //         }).catch(err => {
  //             res.json({ "msg": "greska unutar servera" });
  //         });
  //     }
  // });

  let msg = await services.add_topic(
    _id,
    username,
    title,
    category,
    date,
    comment
  );
  res.json(msg);
});

/////////////////////////////////////////////////////

// C:\Users\Petar\Desktop\diplomski\backend\uploads\1644117757163-slika.PNG

//////////////////////////////////////////////////

router.route("/login-register").post((req: any, res: any) => {
  let username = req.body.username;
  let email = req.body.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;

  console.log("username");
  console.log(username);
  console.log("email");
  console.log(email);

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.json(user);
    } else {
      // let user = new User({
      //     "username": username,
      //     "firstname": firstname, "lastname": lastname,
      //     "email": email, "type": "user", "rating": 5
      // });
      // user.save().then(u => {
      //     res.json(u);
      // });

      res.json({ msg: "unregistered" });
    }
  });
});

const stripe = require("stripe")(
  "sk_test_51KpTakHwTNfRVrcdzFx83eNapyiseDRXrx2LbLgEvojEhABm6AjfE6jPJ79UpdNyqsVwgcRPdXDcoV9YfWFekxSH00EO6Q3Ach"
);

router.route("/pay").post((req: any, res: any) => {
  console.log("token");
  console.log("*********************");
  // console.log(req.body);
  console.log("email");
  let token;
  // let email = req.body.card.name;
  // console.log(email);

  try {
    console.log(req.body);
    token = req.body.token;
    let email = token.email;

    const customer = stripe.customers
      .create({
        email: email,
        source: token.id,
      })
      .then((customer: any) => {
        console.log(customer);
        return stripe.charges.create({
          amount: monthly_fee * 100,
          description: "Test Purchase using express and Node",
          currency: "EUR",
          customer: customer.id,
        });
      })
      .then((charge: any) => {
        console.log(charge);
        res.json({
          data: "success",
        });
      })
      .catch((err: any) => {
        res.json({
          data: "failure",
        });
      });
    return true;
  } catch (error) {
    return false;
  }
});

//////////////////////////////////////////////////

router
  .route("/get-number-of-payed-subscriptions")
  .get(async (req: any, res: any) => {
    await services.get_number_of_payed_subscriptions();
    // res.json({ "monthly_fee": monthly_fee });
    res.json({ msg: "ok" });
  });

/////////////////////////////////////////////////

router.route("/get-monthly-fee").get((req: any, res: any) => {
  res.json({ monthly_fee: monthly_fee });
});

///////////////////////////////////////////

module.exports = router;
