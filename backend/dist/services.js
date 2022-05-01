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
        yield user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
            // console.log("user");
            // console.log(user);
            if (err) {
                console.log('error delegate');
                return { "msg": "no" };
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
        yield user_1.default.findOne({ "username": username }, (err, user_obj) => __awaiter(this, void 0, void 0, function* () {
            if (user_obj) {
                res = { "msg": "Username postoji" };
            }
            else {
                yield user_1.default.findOne({ "email": email }, (err, user_obj) => {
                    if (user_obj) {
                        res = { "msg": "Email postoji" };
                    }
                    else {
                        user.save().then((u) => {
                            res = { "msg": "ok" };
                        });
                    }
                });
            }
        }));
        return res;
    });
}
//////////////////////////////////////////////////
function check_old_password(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
            console.log("user");
            console.log(user);
            if (err)
                console.log('error delegate');
            else {
                // let retObj = { 'user': user };
                if (user != null)
                    res = { "msg": "ok" };
                else
                    res = { "msg": "no" };
            }
        });
        console.log(res);
        return res;
    });
}
function change_password(username, new_password) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield user_1.default.updateOne({ 'username': username }, { $set: { 'password': new_password } }).then((user) => {
            res = { 'msg': 'ok' };
        }).catch((err) => {
            if (err)
                console.log(err);
            res = { 'msg': 'no' };
        });
        return res;
    });
}
function add_appraisal(appraisal) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal.save().then((u) => {
            res = { "msg": "ok" };
        }).catch((err) => {
            res = { "msg": "error" };
        });
        return res;
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
        yield appraisal.save().then((u) => {
            res = { "msg": "ok" };
        }).catch((err) => {
            res = { "msg": "error" };
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
        yield appraisal_1.default.find({ "username": username, "finished": false }, (err, appraisals) => {
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
        yield appraisal_1.default.find({ "username": username, "finished": true }, (err, appraisals) => {
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
        yield appraisal_1.default.find({ "finished": false }, (err, appraisals) => {
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
        yield user_1.default.findOne({ "username": username }, (err, user) => {
            error = err;
            if (err)
                console.log(err);
            else {
                rating = user["rating"];
                console.log(user);
                console.log("rating : " + rating);
                evaluation = { "username": username, "rating": rating, "value": value };
            }
        });
        if (!error) {
            yield appraisal_1.default.updateOne({ "_id": _id }, { $push: { "evaluations": evaluation } }).then(user => {
                res = { "msg": "ok" };
            }).catch(err => {
                res = { 'msg': 'no' };
            });
        }
        else
            res = { 'msg': 'no' };
        return res;
    });
}
function get_current_appraisals_appraiser_history(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
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
        yield topic_1.default.updateOne({ "_id": _id }, { $push: { "comments": { "username": username, "comment": comment, "date_added": date_added } } }).
            then(user => {
            res = { "msg": "ok" };
        }).catch(err => {
            res = { 'msg': 'no' };
        });
        ;
        return res;
    });
}
function user_finish_appraisal(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.findOneAndUpdate({ '_id': _id }, { $set: { 'value': 0, 'finished': true } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            res = { 'msg': "ok" };
        })).catch((err) => {
            if (err)
                console.log(err);
            res = { 'msg': 'no' };
        });
        return res;
    });
}
function finish_appraisal(_id, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.findOneAndUpdate({ '_id': _id }, { $set: { 'value': value, 'finished': true } }).then((user) => __awaiter(this, void 0, void 0, function* () {
            // console.log(user);
            //////// ovde funkcija koja radi update uppraisala
            let msg = yield routes_1.update_ratings(res, user.evaluations, value);
            // console.log("");
            res = { 'msg': msg };
        })).catch((err) => {
            if (err)
                console.log(err);
            res = { 'msg': 'no' };
        });
        return res;
    });
}
function get_all_current_appraisals() {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.find({ "finished": false }, (err, appraisals) => {
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
        yield topic_1.default.findOneAndUpdate({ 'title': title }, { $inc: { "views": 1 } }, (err, topic) => {
            if (err)
                console.log('error delegate');
            else {
                // let retObj = { 'user': user };
                // console.log(topic);
                res = topic;
            }
        });
        return res;
    });
}
function get_ratings_by_user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield rating_1.default.findOne({ "username": username }, (err, ratings) => {
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
        yield rating_1.default.findOne({ "username": username }, (err, ratings) => {
            if (err)
                console.log(err);
            else {
                let rating = util_1.calculate_new_rating(ratings != null ? ratings.toObject() : {});
                res = { "rating": rating };
            }
        });
        return res;
    });
}
function load_all_users() {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield user_1.default.find({ "type": { $ne: "admin" } }, (err, users) => {
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
        yield user_1.default.deleteOne({ 'username': username }, (err) => __awaiter(this, void 0, void 0, function* () {
            error = err;
            if (err)
                console.log(err);
            else {
                console.log('obrisali smo korisnika');
                // res.json({ 'msg': 'ok' });
            }
        }));
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!error) {
                yield appraisal_1.default.deleteMany({ "username": username, "finished": false }, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        console.log(err);
                    else {
                        console.log('obrisali smo appraisale');
                        res = { 'msg': 'ok' };
                    }
                    resolve("success");
                }));
            }
            else {
                console.log(error);
                res = { "msg": "no" };
            }
        }));
        yield promise;
        return res;
    });
}
function delete_comment(_id, username, comment, date_added) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield topic_1.default.findOneAndUpdate({ '_id': _id }, { $pull: { "comments": { "username": username, "comment": comment } } }, (err) => {
            if (err)
                console.log(err);
            else {
                console.log('obrisali smo komentar');
                res = { 'msg': 'ok' };
            }
        });
        return res;
    });
}
function delete_appraisal(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        yield appraisal_1.default.deleteOne({ '_id': id }, (err) => {
            if (err) {
                // console.log(err);
                console.log("ERROR");
            }
            else {
                console.log('obrisali smo umetninu');
                // res.json({ 'msg': 'ok' });
                res = { 'msg': 'ok' };
            }
        });
        return res;
    });
}
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
    delete_appraisal
};
//# sourceMappingURL=services.js.map