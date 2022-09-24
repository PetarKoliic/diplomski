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
const appraisal_1 = __importDefault(require("./models/appraisal"));
const topic_1 = __importDefault(require("./models/topic"));
const user_1 = __importDefault(require("./models/user"));
const routes_1 = require("./routes");
const rating_1 = __importDefault(require("./models/rating"));
const util_1 = require("./util");
const util_2 = require("./util");
// import { monthly_fee } from "./routes";
// import { appraiser_percantage_fee } from "./routes";
const global_1 = __importDefault(require("./models/global"));
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
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let user_res;
        yield user_1.default.findOne({ username: username, password: password }, (err, user) => {
            // console.log("user");
            // console.log(user);
            if (err) {
                console.log("error delegate");
                return { msg: "no" };
            }
            else {
                // let retObj = { 'user': user };
                // console.log(user);
                user_res = user;
            }
        });
        return user_res;
    });
}
//////////////////////////////////////////////////
function register(user, username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        var res;
        let flag_exists = false;
        yield user_1.default.findOne({ email: email }, (err, user_obj) => __awaiter(this, void 0, void 0, function* () {
            if (user_obj) {
                flag_exists = true;
                res = { msg: "Email postoji" };
                console.log("email postoji");
                console.log(res);
                flag_exists = true;
                console.log("provera flaga u ifu " + flag_exists);
            }
            else {
                // await user.save().then((u: any) => {
                //     res = { "msg": "ok" };
                //     console.log("sacuvao sam");
                // });
            }
        }));
        yield user_1.default.findOne({ username: username }, (err, user_obj) => __awaiter(this, void 0, void 0, function* () {
            if (user_obj) {
                flag_exists = true;
                res = { msg: "Username postoji" };
            }
            else {
                console.log("usao u register i nisam pronasao nikoga");
            }
        }));
        // if (flag_exists == false) {
        // }
        console.log("provera flaga : " + flag_exists);
        if (flag_exists == false) {
            yield user.save().then((u) => {
                res = { msg: "ok" };
                console.log("sacuvao sam");
            });
        }
        console.log("vracam se sa rezultatom");
        console.log(res);
        return res;
    });
}
//////////////////////////////////////////////////
function check_old_password(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield user_1.default.findOne({ username: username, password: password }, (err, user) => {
            console.log("user");
            console.log(user);
            if (err)
                console.log("error delegate");
            else {
                // let retObj = { 'user': user };
                if (user != null)
                    res = { msg: "ok" };
                else
                    res = { msg: "no" };
            }
        });
        console.log(res);
        return res;
    });
}
function change_password(username, new_password) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield user_1.default.updateOne({ username: username }, { $set: { password: new_password } })
            .then((user) => {
            res = { msg: "ok" };
        })
            .catch((err) => {
            if (err)
                console.log(err);
            res = { msg: "no" };
        });
        return res;
    });
}
function add_appraisal(appraisal) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal
            .save()
            .then((u) => {
            res = { msg: "ok" };
        })
            .catch((err) => {
            res = { msg: "error" };
        });
        return res;
    });
}
function get_revenue() {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        res = yield global_1.default.findOne({ type: { $ne: "admin" } }, (err, res_val) => {
            if (err)
                console.log(err);
            else
                res = res_val;
            // console.log("response in callback");
            // console.log(res);
        });
    });
}
exports.get_revenue = get_revenue;
function add_revenue_monthly_subscription() {
    return __awaiter(this, void 0, void 0, function* () {
        let msg = { "msg": "ok" };
        let monthly_fee;
        yield global_1.default.findOne({ "name": "monthly_fee" }, (err, doc) => {
            if (err)
                console.log(err);
            else {
                let global_obj = doc.toObject();
                monthly_fee = global_obj["value"];
            }
        });
        yield global_1.default.updateOne({ "name": "revenue" }, {
            $inc: { "balance": monthly_fee }
        }).catch((err) => {
            msg = { "msg": "error incrementing value" };
            console.log(err);
        });
        return msg;
    });
}
function get_appraisals_user(appraisal) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        // await appraisal.save().then((u:any) => {
        //     res = { "msg": "ok" };
        // }).catch((err:any) => {
        //     res = { "msg": "error" };
        // })
        yield appraisal
            .save()
            .then((u) => {
            res = { msg: "ok" };
        })
            .catch((err) => {
            res = { msg: "error" };
        });
        return res;
    });
}
function get_current_appraisals_user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        // await appraisal.save().then((u:any) => {
        //     res = { "msg": "ok" };
        // }).catch((err:any) => {
        //     res = { "msg": "error" };
        // })
        yield appraisal_1.default.find({ username: username, finished: false }, (err, appraisals) => {
            console.log(appraisals);
            res = appraisals;
        });
        return res;
    });
}
function get_history_appraisals_user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        // await appraisal.save().then((u:any) => {
        //     res = { "msg": "ok" };
        // }).catch((err:any) => {
        //     res = { "msg": "error" };
        // })
        yield appraisal_1.default.find({ username: username, finished: true, value: { $ne: 0 } }, (err, appraisals) => {
            console.log(appraisals);
            res = appraisals;
        });
        return res;
    });
}
function get_current_appraisals_appraiser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        // await appraisal.save().then((u:any) => {
        //     res = { "msg": "ok" };
        // }).catch((err:any) => {
        //     res = { "msg": "error" };
        // })
        yield appraisal_1.default.find({ finished: false }, (err, appraisals) => {
            if (err)
                console.log(err);
            else {
                console.log(appraisals);
                let a2 = [];
                for (let i = 0; i < appraisals.length; i++) {
                    console.log("i : " + i + " duzina: " + appraisals.length);
                    let appraisal = appraisals[i].toObject();
                    let flag = false;
                    for (let j = 0; j < appraisal.evaluations.length; j++) {
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
                res = a2;
            }
        });
        return res;
    });
}
function give_appraisal(username, value, _id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        // await appraisal.save().then((u:any) => {
        //     res = { "msg": "ok" };
        // }).catch((err:any) => {
        //     res = { "msg": "error" };
        // })
        console.log("1");
        let rating;
        let evaluation;
        let error = null;
        yield user_1.default.findOne({ username: username }, (err, user) => {
            error = err;
            if (err)
                console.log(err);
            else {
                rating = user["rating"];
                console.log(user);
                console.log("rating : " + rating);
                evaluation = { username: username, rating: rating, value: value };
            }
        });
        if (!error) {
            yield appraisal_1.default.updateOne({ _id: _id }, { $push: { evaluations: evaluation } })
                .then((user) => {
                res = { msg: "ok" };
            })
                .catch((err) => {
                res = { msg: "no" };
            });
        }
        else
            res = { msg: "no" };
        yield user_1.default.updateOne({ "username": username }, { $inc: { "cnt_appraisals_monthly": 1 } });
        return res;
    });
}
function appraisal_change_mind(username, value, _id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.findOneAndUpdate({ _id: _id, "evaluations.username": username }, {
            $set: {
                "evaluations.$.value": value,
            },
        })
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            res = { msg: "ok" };
        }))
            .catch((err) => {
            if (err)
                console.log(err);
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
    });
}
function get_current_appraisals_appraiser_history(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.find({ finished: false, "evaluations.username": username }, (err, appraisals) => {
            if (err)
                console.log(err);
            else {
                console.log("appraisals");
                console.log(appraisals);
                res = appraisals;
            }
        });
        return res;
    });
}
function add_comment(username, _id, date_added, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        // await Appraisal.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
        //     if (err) console.log(err);
        //     else {
        //         console.log("appraisals");
        //         console.log(appraisals);
        //         res = appraisals;
        //     }
        // });
        yield topic_1.default.updateOne({ _id: _id }, {
            $push: {
                comments: {
                    username: username,
                    comment: comment,
                    date_added: date_added,
                },
            },
        })
            .then((user) => {
            res = { msg: "ok" };
        })
            .catch((err) => {
            res = { msg: "no" };
        });
        return res;
    });
}
function user_finish_appraisal(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.findOneAndUpdate({ _id: _id }, { $set: { value: 0, finished: true } })
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            res = { msg: "ok" };
        }))
            .catch((err) => {
            if (err)
                console.log(err);
            res = { msg: "no" };
        });
        return res;
    });
}
function finish_appraisal(_id, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.findOneAndUpdate({ _id: _id }, { $set: { value: value, finished: true } })
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            // console.log(user);
            //////// ovde funkcija koja radi update uppraisala
            let msg = yield routes_1.update_ratings(res, user.evaluations, value);
            // console.log("");
            res = { msg: msg };
        }))
            .catch((err) => {
            if (err)
                console.log(err);
            res = { msg: "no" };
        });
        return res;
    });
}
function get_all_current_appraisals() {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.find({ finished: false }, (err, appraisals) => {
            if (err)
                console.log(err);
            else {
                console.log("appraisals");
                console.log(appraisals);
                res = appraisals;
            }
        });
        return res;
    });
}
// get_topic
function get_topic(title) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
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
        let topic_loaded;
        yield topic_1.default.findOne({ title }, (err, topic) => {
            if (err)
                console.log(err);
            else {
                topic_loaded = topic;
            }
        });
        yield topic_1.default.updateOne({ 'title': title }, { $set: { 'views': parseInt(topic_loaded.get("views")) + 1 } }, (err, user) => {
            if (err)
                console.log(err);
        });
        return topic_loaded;
    });
}
function get_ratings_by_user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield rating_1.default.findOne({ username: username }, (err, ratings) => {
            if (err)
                console.log(err);
            else {
                res = ratings;
            }
        });
        return res;
    });
}
function get_rating(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield rating_1.default.findOne({ username: username }, (err, ratings) => {
            if (err)
                console.log(err);
            else {
                let rating = util_1.calculate_new_rating(ratings != null ? ratings.toObject() : {});
                res = { rating: rating };
            }
        });
        return res;
    });
}
function load_all_users() {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield user_1.default.find({ type: { $ne: "admin" } }, (err, users) => {
            if (err)
                console.log(err);
            else
                res = users;
        });
        return res;
    });
}
function delete_user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        var error;
        yield user_1.default.deleteOne({ username: username }, (err) => __awaiter(this, void 0, void 0, function* () {
            error = err;
            if (err)
                console.log(err);
            else {
                console.log("obrisali smo korisnika");
                // res.json({ 'msg': 'ok' });
            }
        }));
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!error) {
                yield appraisal_1.default.deleteMany({ username: username, finished: false }, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        console.log(err);
                    else {
                        console.log("obrisali smo appraisale");
                        res = { msg: "ok" };
                    }
                    resolve("success");
                }));
            }
            else {
                console.log(error);
                res = { msg: "no" };
            }
        }));
        yield promise;
        return res;
    });
}
function delete_topic(title, date_added) {
    return __awaiter(this, void 0, void 0, function* () {
        let error;
        let msg;
        yield topic_1.default.deleteOne({ "title": title, "date_added": date_added }, (err) => __awaiter(this, void 0, void 0, function* () {
            error = err;
            if (err) {
                console.log(err);
                msg = { 'msg': 'no' };
            }
            else {
                console.log("obrisali smo temu");
                msg = { 'msg': 'ok' };
            }
        }));
        return msg;
    });
}
function delete_comment(_id, username, comment, date_added) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield topic_1.default.findOneAndUpdate({ _id: _id }, { $pull: { comments: { username: username, comment: comment } } }, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("obrisali smo komentar");
                res = { msg: "ok" };
            }
        });
        return res;
    });
}
function delete_appraisal(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.deleteOne({ _id: id }, (err) => {
            if (err) {
                // console.log(err);
                console.log("ERROR");
            }
            else {
                console.log("obrisali smo umetninu");
                // res.json({ 'msg': 'ok' });
                res = { msg: "ok" };
            }
        });
        return res;
    });
}
function update_subscription(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.findOne({ username: username }, (err, user_doc) => {
                if (!err) {
                    let user_obj = user_doc.toObject();
                    // let valid_until = new Date(user_obj.valid_until);
                    let valid_until = new Date();
                    valid_until.setMonth(valid_until.getMonth() + 1);
                    console.log("valid until");
                    console.log(valid_until);
                    user_1.default.findOneAndUpdate({ username: username }, { $set: { valid_until: valid_until } }, (err, data) => {
                        if (err) {
                            res = { msg: "no" };
                        }
                        else {
                            res = { msg: "ok" };
                        }
                        resolve("success");
                    });
                }
                else {
                    res = { msg: "no" };
                    resolve("success");
                }
            });
        }));
        yield promise;
        return res;
    });
}
function get_subscription_valid_until(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield user_1.default.findOne({ username: username }, (err, user) => {
            if (!err) {
                res = { valid_until: user.get("valid_until") };
            }
            else {
                res = { msg: "no" };
            }
        });
        return res;
    });
}
function add_topic(_id, username, title, category, date, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield topic_1.default.findOne({ title: title }, (err, topic_found) => {
                if (topic_found) {
                    res = { msg: "postoji vec ista tema" };
                }
                else {
                    let topic = new topic_1.default({
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
        }));
        yield promise;
        return res;
    });
}
function get_number_of_payed_subscriptions() {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        let d = new Date();
        // svakog prvog u mesecu
        // 1. maja gledamo ko je platio
        // d.setDate(1);
        // d.setMonth(d.getMonth() - 1);
        let cnt = 0;
        yield user_1.default.find({ type: "user", valid_until: { $gte: d } }).count(function (err, count) {
            if (err)
                console.log(err);
            else {
                console.log("Count is", count);
                cnt = count;
            }
        });
        return cnt;
    });
}
// setInterval(get_number_of_payed_subscriptions, 1000 * 10);
const cron = require("node-cron");
cron.schedule("0 0 1 * * * * *", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("invoked cron job distributing money");
        let count = yield get_number_of_payed_subscriptions();
        let monthly_fee;
        let appraiser_percantage_fee;
        yield global_1.default.findOne({ "name": "monthly_fee" }, (err, doc) => {
            if (err)
                console.log(err);
            else {
                let global_obj = doc.toObject();
                monthly_fee = global_obj["value"];
            }
        });
        yield global_1.default.findOne({ "name": "appraiser_percantage_fee" }, (err, doc) => {
            if (err)
                console.log(err);
            else {
                let global_obj = doc.toObject();
                monthly_fee = global_obj["appraiser_percantage_fee"];
            }
        });
        console.log(monthly_fee);
        console.log(count);
        let budget = util_2.allocated_appraiser_budget(count, monthly_fee, appraiser_percantage_fee);
        console.log("budget : " + budget);
        yield user_1.default.find({ type: "appraiser" }, (err, appraisers) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log("error finding users");
            }
            else {
                var sum_quote = 0;
                console.log(appraisers);
                for (let i = 0; i < appraisers.length; i++) {
                    let appraiser = appraisers[i].toObject();
                    sum_quote +=
                        appraiser["cnt_appraisals_monthly"] *
                            appraiser["rating"] *
                            appraiser["rating"];
                }
                console.log("sum_quote : " + sum_quote);
                for (let i = 0; i < appraisers.length; i++) {
                    let appraiser = appraisers[i].toObject();
                    let money_owned = (budget / sum_quote) *
                        appraiser["cnt_appraisals_monthly"] *
                        appraiser["rating"] *
                        appraiser["rating"];
                    if (money_owned != 0 && money_owned != null && sum_quote != 0)
                        yield user_1.default.updateOne({ username: appraiser["username"] }, {
                            $set: { cnt_appraisals_monthly: 0 },
                            $inc: { balance: money_owned },
                        })
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
        }));
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
};
//# sourceMappingURL=services.js.map