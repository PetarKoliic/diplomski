import user from "./models/user";
import Appraisal from "./models/appraisal";
import { Evaluation } from "./models/evaluation.model";
import Topic from "./models/topic";
import User from "./models/user";
import { any } from "async";
import { PropertyAccessEntityNameExpression, tokenToString } from "typescript";
import { update_ratings } from "./routes";
import rating from "./models/rating";
import { calculate_individual_rating } from "./util";
import { calculate_new_rating } from "./util";
import { allocated_appraiser_budget } from "./util";
import { promiseImpl } from "ejs";
// import { monthly_fee } from "./routes";
// import { appraiser_percantage_fee } from "./routes";
import Global from "./models/global";

// async function create(programmingLanguage){
//     const result = await db.query(
//       `INSERT INTO programming_languages
//       (name, released_year, githut_rank, pypl_rank, tiobe_rank)
//       VALUES
//       (?, ?, ?, ?, ?)`,
//       [
//         programmingLanguage.name, programmingLanguage.released_year,
//         programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
//         programmingLanguage.tiobe_rank
//       ]
//     );

//     let message = 'Error in creating programming language';

//     if (result.affectedRows) {
//       message = 'Programming language created successfully';
//     }

//     return {message};
//   }

async function login(username: string, password: string) {
  let user_res: any;

  await User.findOne(
    { username: username, password: password },
    (err, user) => {
      // console.log("user");
      // console.log(user);
      if (err) {
        console.log("error delegate");
        return { msg: "no" };
      } else {
        // let retObj = { 'user': user };

        // console.log(user);
        user_res = user;
      }
    }
  );

  return user_res;
}

//////////////////////////////////////////////////

async function register(user: any, username: string, email: string) {
  var res: any;
  let flag_exists: boolean = false;

  await User.findOne({ email: email }, async (err, user_obj) => {
      if (user_obj) {
        flag_exists = true;

        res = { msg: "Email postoji" };
        console.log("email postoji");
        console.log(res);
        flag_exists = true;

        console.log("provera flaga u ifu " + flag_exists);
      } else {
        // await user.save().then((u: any) => {
        //     res = { "msg": "ok" };
        //     console.log("sacuvao sam");
        // });
      }
    });

  await User.findOne({ username: username }, async (err, user_obj) => {
    if (user_obj) {
      flag_exists = true;
      res = { msg: "Username postoji" };
    } else {
      console.log("usao u register i nisam pronasao nikoga");
    }
  });

  // if (flag_exists == false) {
    
  // }
  console.log("provera flaga : " + flag_exists);

  if (flag_exists == false) {
    await user.save().then((u: any) => {
      res = { msg: "ok" };

      console.log("sacuvao sam");
    });
  }

  console.log("vracam se sa rezultatom");
  console.log(res);
  return res;
}

//////////////////////////////////////////////////

async function check_old_password(username: string, password: string) {
  let res: any;

  await User.findOne(
    { username: username, password: password },
    (err, user) => {
      console.log("user");
      console.log(user);
      if (err) console.log("error delegate");
      else {
        // let retObj = { 'user': user };

        if (user != null) res = { msg: "ok" };
        else res = { msg: "no" };
      }
    }
  );

  console.log(res);

  return res;
}

async function change_password(username: string, new_password: string) {
  let res: any;
  await User.updateOne(
    { username: username },
    { $set: { password: new_password } }
  )
    .then((user: any) => {
      res = { msg: "ok" };
    })
    .catch((err: any) => {
      if (err) console.log(err);
      res = { msg: "no" };
    });

  return res;
}

async function add_appraisal(appraisal: Appraisal) {
  let res: any;

  await appraisal
    .save()
    .then((u: any) => {
      res = { msg: "ok" };
    })
    .catch((err: any) => {
      res = { msg: "error" };
    });

  return res;
}

export async function get_revenue() {

let res: any;

res = await Global.findOne({ type: { $ne: "admin" } }, (err, res_val) => {
  if (err) console.log(err);
  else res = res_val;

  // console.log("response in callback");
  // console.log(res);
});

}


 async function add_revenue_monthly_subscription() {

  let msg: Object = {"msg": "ok"};
  let monthly_fee;


  await Global.findOne({"name": "monthly_fee"}, (err, doc) =>
  {
    if(err)
      console.log(err)
    else
      {
        let global_obj = doc.toObject();

        monthly_fee = global_obj["value"];
      }
  });


  await Global.updateOne(
    { "name": "revenue" },
    {
      $inc: { "balance": monthly_fee }
    }
  ).catch((err) => {

      msg = {"msg": "error incrementing value"};
      console.log(err);
    });

return msg;

}

async function get_appraisals_user(appraisal: Appraisal) {
  let res: any;

  // await appraisal.save().then((u:any) => {
  //     res = { "msg": "ok" };
  // }).catch((err:any) => {
  //     res = { "msg": "error" };
  // })

  await appraisal
    .save()
    .then((u: any) => {
      res = { msg: "ok" };
    })
    .catch((err: any) => {
      res = { msg: "error" };
    });

  return res;
}

async function get_current_appraisals_user(username: string) {
  let res: any;

  // await appraisal.save().then((u:any) => {
  //     res = { "msg": "ok" };
  // }).catch((err:any) => {
  //     res = { "msg": "error" };
  // })

  await Appraisal.find(
    { username: username, finished: false },
    (err, appraisals) => {
      console.log(appraisals);

      res = appraisals;
    }
  );

  return res;
}

async function get_history_appraisals_user(username: string) {
  let res: any;

  // await appraisal.save().then((u:any) => {
  //     res = { "msg": "ok" };
  // }).catch((err:any) => {
  //     res = { "msg": "error" };
  // })

  await Appraisal.find(
    { username: username, finished: true, value: {$ne: 0 }},
    (err, appraisals) => {
      console.log(appraisals);

      res = appraisals;
    }
  );

  return res;
}

async function get_current_appraisals_appraiser(username: string) {
  let res: Object;

  // await appraisal.save().then((u:any) => {
  //     res = { "msg": "ok" };
  // }).catch((err:any) => {
  //     res = { "msg": "error" };
  // })

  await Appraisal.find({ finished: false }, (err, appraisals) => {
    if (err) console.log(err);
    else {
      console.log(appraisals);

      let a2 = [];

      for (let i = 0; i < appraisals.length; i++) {
        console.log("i : " + i + " duzina: " + appraisals.length);
        let appraisal = appraisals[i].toObject();
        let flag: boolean = false;
        for (let j = 0; j < appraisal.evaluations.length; j++) {
          console.log("usao a nije trebalo");
          console.log("j : " + j + " duzina: " + appraisals.length);
          console.log(appraisal.evaluations[j].username);
          if (appraisal.evaluations[j].username === username) flag = true;
        }

        if (!flag) a2.push(appraisal);
      }

      console.log("prazno");
      console.log(a2);

      res = a2;
    }
  });

  return res;
}

async function give_appraisal(username: string, value: number, _id: any) {
  let res: Object;

  // await appraisal.save().then((u:any) => {
  //     res = { "msg": "ok" };
  // }).catch((err:any) => {
  //     res = { "msg": "error" };
  // })

  console.log("1");
  let rating;
  let evaluation;
  let error: any = null;
  await User.findOne({ username: username }, (err, user: any) => {
    error = err;

    if (err) console.log(err);
    else {
      rating = user["rating"];
      console.log(user);
      console.log("rating : " + rating);

      evaluation = { username: username, rating: rating, value: value };
    }
  });

  if (!error) {
    await Appraisal.updateOne(
      { _id: _id },
      { $push: { evaluations: evaluation } }
    )
      .then((user) => {
        res = { msg: "ok" };
      })
      .catch((err) => {
        res = { msg: "no" };
      });
  } else res = { msg: "no" };


  await User.updateOne({"username": username},
  {$inc: {"cnt_appraisals_monthly": 1}});
  

  return res;
}

async function appraisal_change_mind(
  username: string,
  value: number,
  _id: any
) {
  let res: any;

  await Appraisal.findOneAndUpdate(
    { _id: _id, "evaluations.username": username },
    {
      $set: {
        "evaluations.$.value": value,
      },
    }
  )
    .then(async (user: any) => {
      res = { msg: "ok" };
    })
    .catch((err: any) => {
      if (err) console.log(err);
      res = { msg: "no" };
    });

  // await Appraisal.findOneAndUpdate({ '_id': _id }, { $set: { 'value': 0, 'finished': true } }).then(async (user: any) => {

  //     res = { 'msg': "ok" };
  // }).catch((err: any) => {
  //     if (err)
  //         console.log(err);
  //     res = { 'msg': 'no' };
  // });

  // return res;

  return res;
}

async function get_current_appraisals_appraiser_history(username: string) {
  let res: any;

  await Appraisal.find(
    { finished: false, "evaluations.username": username },
    (err, appraisals) => {
      if (err) console.log(err);
      else {
        console.log("appraisals");
        console.log(appraisals);

        res = appraisals;
      }
    }
  );

  return res;
}

async function add_comment(
  username: string,
  _id: string,
  date_added: Date,
  comment: string
) {
  let res: any;

  // await Appraisal.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
  //     if (err) console.log(err);
  //     else {

  //         console.log("appraisals");
  //         console.log(appraisals);

  //         res = appraisals;
  //     }
  // });

  await Topic.updateOne(
    { _id: _id },
    {
      $push: {
        comments: {
          username: username,
          comment: comment,
          date_added: date_added,
        },
      },
    }
  )
    .then((user) => {
      res = { msg: "ok" };
    })
    .catch((err) => {
      res = { msg: "no" };
    });

  return res;
}

async function user_finish_appraisal(_id: any) {
  let res: Object;

  await Appraisal.findOneAndUpdate(
    { _id: _id },
    { $set: { value: 0, finished: true } }
  )
    .then(async (user: any) => {
      res = { msg: "ok" };
    })
    .catch((err: any) => {
      if (err) console.log(err);
      res = { msg: "no" };
    });

  return res;
}

async function finish_appraisal(_id: any, value: number) {
  let res: Object;

  await Appraisal.findOneAndUpdate(
    { _id: _id },
    { $set: { value: value, finished: true } }
  )
    .then(async (user: any) => {
      // console.log(user);

      //////// ovde funkcija koja radi update uppraisala
      let msg = await update_ratings(res, user.evaluations, value);
 

      // console.log("");

      res = { msg: msg };
    })
    .catch((err: any) => {
      if (err) console.log(err);
      res = { msg: "no" };
    });

  return res;
}

async function get_all_current_appraisals() {
  let res: Object;

  await Appraisal.find({ finished: false }, (err, appraisals) => {
    if (err) console.log(err);
    else {
      console.log("appraisals");
      console.log(appraisals);

      res = appraisals;
    }
  });

  return res;
}

// get_topic
async function get_topic(title: string) {
  let res: Object;

  // await Topic.findOneAndUpdate(
  //   { title: title },
  //   { $inc: { views: 1 } },
  //   (err, topic) => {
  //     if (err) console.log("error delegate");
  //     else {
  //       // let retObj = { 'user': user };
  //       // console.log(topic);
        
  //       // console.log("topic");
  //       // console.log(topic);
  //       res = topic;
  //     }
  //   }
  // );

  let topic_loaded: any;
  await Topic.findOne({title}, (err, topic) => {

    if(err)
      console.log(err);
    
    else
    {
      topic_loaded = topic;
    }
  });

  await Topic.updateOne({ 'title': title}, {$set :{'views' : parseInt(topic_loaded.get("views")) + 1}}, (err, user) => {
    if(err)
      console.log(err);
  });

  return topic_loaded;
}

async function get_ratings_by_user(username: string) {
  let res: Object;

  await rating.findOne({ username: username }, (err, ratings) => {
    if (err) console.log(err);
    else {
      res = ratings;
    }
  });

  return res;
}

async function get_rating(username: string) {
  let res: Object;

  await rating.findOne({ username: username }, (err, ratings) => {
    if (err) console.log(err);
    else {
      let rating = calculate_new_rating(
        ratings != null ? ratings.toObject() : {}
      );

      res = { rating: rating };
    }
  });

  return res;
}

async function load_all_users() {
  let res: Object;

  await User.find({ type: { $ne: "admin" } }, (err, users) => {
    if (err) console.log(err);
    else res = users;
  });

  return res;
}

async function delete_user(username: string) {
  let res: Object;
  var error: any;
  await User.deleteOne({ username: username }, async (err) => {
    error = err;
    if (err) console.log(err);
    else {
      console.log("obrisali smo korisnika");
      // res.json({ 'msg': 'ok' });
    }
  });
  let promise = new Promise(async (resolve, reject) => {
    if (!error) {
      await Appraisal.deleteMany(
        { username: username, finished: false },
        async (err) => {
          if (err) console.log(err);
          else {
            console.log("obrisali smo appraisale");
            res = { msg: "ok" };
          }
          resolve("success");
        }
      );
    } else {
      console.log(error);
      res = { msg: "no" };
    }
  });

  await promise;
  return res;
}

async function delete_topic(title: string, date_added: Date)
{
  let error;
  let msg: Object;
  await Topic.deleteOne({ "title": title, "date_added": date_added}, async (err) => {
    error = err;
    if (err) 
    {
      console.log(err);
      msg = { 'msg': 'no' };

    }
    else {
      console.log("obrisali smo temu");
      msg = { 'msg': 'ok' };
    }
  });

  return msg;
}

async function delete_comment(
  _id: any,
  username: string,
  comment: string,
  date_added: Date
) {
  let res: Object;

  await Topic.findOneAndUpdate(
    { _id: _id },
    { $pull: { comments: { username: username, comment: comment } } },
    (err) => {
      if (err) console.log(err);
      else {
        console.log("obrisali smo komentar");
        res = { msg: "ok" };
      }
    }
  );

  return res;
}

async function delete_appraisal(id: any) {
  let res: Object;

  await Appraisal.deleteOne({ _id: id }, (err) => {
    if (err) {
      // console.log(err);
      console.log("ERROR");
    } else {
      console.log("obrisali smo umetninu");
      // res.json({ 'msg': 'ok' });

      res = { msg: "ok" };
    }
  });

  return res;
}

async function update_subscription(username: string) {
  let res: Object;

  let promise = new Promise(async (resolve, reject) => {
    await User.findOne({ username: username }, (err, user_doc) => {
      if (!err) {
        let user_obj = user_doc.toObject();

        // let valid_until = new Date(user_obj.valid_until);
        let valid_until = new Date();
        valid_until.setMonth(valid_until.getMonth() + 1);

        console.log("valid until");
        console.log(valid_until);
        User.findOneAndUpdate(
          { username: username },
          { $set: { valid_until: valid_until } },
          (err, data) => {
            if (err) {
              res = { msg: "no" };
            } else {
              res = { msg: "ok" };
            }
            resolve("success");
          }
        );
      } else {
        res = { msg: "no" };
        resolve("success");
      }
    });
  });

  await promise;

  return res;
}

async function get_subscription_valid_until(username: string) {
  let res: Object;

  await User.findOne({ username: username }, (err, user) => {
    if (!err) {
      res = { valid_until: user.get("valid_until") };
    } else {
      res = { msg: "no" };
    }
  });

  return res;
}

async function add_topic(
  _id: string,
  username: string,
  title: string,
  category: string,
  date: Date,
  comment: any
) {
  let res: Object;

  let promise = new Promise(async (resolve, reject) => {
    await Topic.findOne({ title: title }, (err, topic_found) => {
      if (topic_found) {
        res = { msg: "postoji vec ista tema" };
      } else {
        let topic = new Topic({
          _id: _id,
          username: username,
          title: title,
          date_added: date,
          comments: [comment],
          category: category,
          views: 0,
        });

        topic
          .save()
          .then((u) => {
            res = { msg: "ok" };
            resolve("sucess");
          })
          .catch((err) => {
            res = { msg: "greska unutar servera" };
            resolve("sucess");
          });
      }
    });
  });

  await promise;

  return res;
}

async function get_number_of_payed_subscriptions() {
  let res: Object;

  let d = new Date();
  // svakog prvog u mesecu
  // 1. maja gledamo ko je platio
 
 
  // d.setDate(1);
  // d.setMonth(d.getMonth() - 1);
  let cnt = 0;

  await User.find({ type: "user", valid_until: { $gte: d } }).count(function (
    err,
    count
  ) {
    if (err) console.log(err);
    else {
      console.log("Count is", count);
      cnt = count;
    }
  });

  return cnt;
}

// setInterval(get_number_of_payed_subscriptions, 1000 * 10);

	// 0 0 1 * * * * *
const cron = require("node-cron");

cron.schedule("0 0 1 * * * * *", async function () {	

  console.log("invoked cron job distributing money");

  let count = await get_number_of_payed_subscriptions();	

  let monthly_fee;
  let appraiser_percantage_fee;
  await Global.findOne({"name": "monthly_fee"}, (err, doc) =>
  {
    if(err)
      console.log(err)
    else
      {
        let global_obj = doc.toObject();

        monthly_fee = global_obj["value"];
      }
  });

  await Global.findOne({"name": "appraiser_percantage_fee"}, (err, doc) =>
  {
    if(err)
      console.log(err)
    else
      {
        let global_obj = doc.toObject();

        appraiser_percantage_fee = global_obj["value"];
      }
  });

  console.log("monthly fee : " + monthly_fee);
  console.log("appraiser percantage fee : " + appraiser_percantage_fee);


  console.log(count);
  let budget = allocated_appraiser_budget(	
    count,	
    monthly_fee,	
    appraiser_percantage_fee	
  );
  
  console.log("budget : " + budget);
  
  
  await User.find({ type: "appraiser", cnt_appraisals_monthly: { $gt: 0 } }, async (err: any, appraisers: any) => {	
    if (err) {	
      console.log("error finding users");	
    } else {	
      var sum_quote = 0;
      // console.log(appraisers);	
      for (let i = 0; i < appraisers.length; i++) {	
        let appraiser = appraisers[i].toObject();	
        sum_quote +=	
          appraiser["cnt_appraisals_monthly"] *	
          appraiser["rating"] *	
          appraiser["rating"];	
      }	
      console.log("sum_quote : " + sum_quote);
      console.log("budget: " + budget);	
      for (let i = 0; i < appraisers.length; i++) {	
        let appraiser = appraisers[i].toObject();	
        let money_owned =	
          (budget / sum_quote) *	
          appraiser["cnt_appraisals_monthly"] *	
          appraiser["rating"] *	
          appraiser["rating"];
          
          console.log("money_owned");
          console.log(money_owned);
        if (money_owned != 0 && money_owned != null && sum_quote != 0)	
          await User.updateOne(	
            { username: appraiser["username"] },	
            {	
              $set: { cnt_appraisals_monthly: 0 },	
              $inc: { balance: money_owned },	
            }	
          )	
            .then((user) => {	
              console.log(user);	
            })	
            .catch((err) => {	
              console.log(err);	
            });	
        // .then((user: any) => {	
        // }).catch((err: any) => {	
        //         if (err)	
        //             console.log(err);	
        //     });	
        // await User.updateOne({ 'username': username }, { $set: { 'password': new_password } }).then((user: any) => {	
        //     res = { 'msg': 'ok' };	
        // }).catch((err: any) => {	
        //     if (err)	
        //         console.log(err);	
        //     res = { 'msg': 'no' };	
        // });	
      }	
    }	
  });	
});


module.exports = {
  login,
  register,
  check_old_password,
  change_password,
  add_appraisal,
  get_appraisals_user,
  get_current_appraisals_user,
  get_history_appraisals_user,
  get_current_appraisals_appraiser,
  give_appraisal,
  appraisal_change_mind,
  get_current_appraisals_appraiser_history,
  add_comment,
  user_finish_appraisal,
  finish_appraisal,
  get_all_current_appraisals,
  get_topic,
  get_ratings_by_user,
  get_rating,
  load_all_users,
  delete_user,
  delete_comment,
  delete_appraisal,
  update_subscription,
  get_subscription_valid_until,
  add_topic,
  get_number_of_payed_subscriptions,
  get_revenue,
  add_revenue_monthly_subscription,
  delete_topic
}
