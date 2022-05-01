
import user from './models/user';
import Appraisal from './models/appraisal';
import { Evaluation } from './models/evaluation.model';
import Topic from './models/topic';
import User from './models/user';
import { any } from 'async';
import { PropertyAccessEntityNameExpression } from 'typescript';
import { update_ratings } from './routes';
import rating from './models/rating';
import { calculate_individual_rating } from './util';
import { calculate_new_rating } from './util';





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

    await User.findOne({ 'username': username, 'password': password },
        (err, user) => {


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

}

//////////////////////////////////////////////////

async function register(user: any, username: string, email: string) {
    var res: any;
    await User.findOne({ "username": username }, async (err, user_obj) => {
        if (user_obj) {

            res = { "msg": "Username postoji" };
        }
        else {
            await User.findOne({ "email": email }, (err, user_obj) => {
                if (user_obj) {

                    res = { "msg": "Email postoji" };
                }
                else {
                    user.save().then((u: any) => {
                        res = { "msg": "ok" };
                    });
                }

            });
        }
    });

    return res;
}

//////////////////////////////////////////////////

async function check_old_password(username: string, password: string) {
    let res: any;

    await User.findOne({ 'username': username, 'password': password },
        (err, user) => {


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
}

async function change_password(username: string, new_password: string) {
    let res: any;
    await User.updateOne({ 'username': username }, { $set: { 'password': new_password } }).then((user: any) => {

        res = { 'msg': 'ok' };
    }).catch((err: any) => {
        if (err)
            console.log(err);
        res = { 'msg': 'no' };
    });


    return res;
}

async function add_appraisal(appraisal: Appraisal) {
    let res: any;


    await appraisal.save().then((u: any) => {
        res = { "msg": "ok" };
    }).catch((err: any) => {
        res = { "msg": "error" };
    })

    return res;
}

async function get_appraisals_user(appraisal: Appraisal) {
    let res: any;


    // await appraisal.save().then((u:any) => {
    //     res = { "msg": "ok" };
    // }).catch((err:any) => {
    //     res = { "msg": "error" };
    // })

    await appraisal.save().then((u: any) => {
        res = { "msg": "ok" };
    }).catch((err: any) => {
        res = { "msg": "error" };
    })

    return res;
}



async function get_current_appraisals_user(username: string) {
    let res: any;


    // await appraisal.save().then((u:any) => {
    //     res = { "msg": "ok" };
    // }).catch((err:any) => {
    //     res = { "msg": "error" };
    // })

    await Appraisal.find({ "username": username, "finished": false }, (err, appraisals) => {

        console.log(appraisals);

        res = appraisals;
    })

    return res;
}



async function get_history_appraisals_user(username: string) {
    let res: any;


    // await appraisal.save().then((u:any) => {
    //     res = { "msg": "ok" };
    // }).catch((err:any) => {
    //     res = { "msg": "error" };
    // })

    await Appraisal.find({ "username": username, "finished": true }, (err, appraisals) => {

        console.log(appraisals);

        res = appraisals;
    })

    return res;
}


async function get_current_appraisals_appraiser(username: string) {
    let res: Object;


    // await appraisal.save().then((u:any) => {
    //     res = { "msg": "ok" };
    // }).catch((err:any) => {
    //     res = { "msg": "error" };
    // })

    await Appraisal.find({ "finished": false }, (err, appraisals) => {
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
    })


    return res;
}




async function give_appraisal(username: string, value: number, _id: any) {
    let res: Object;


    // await appraisal.save().then((u:any) => {
    //     res = { "msg": "ok" };
    // }).catch((err:any) => {
    //     res = { "msg": "error" };
    // })

    console.log("1")
    let rating;
    let evaluation;
    let error: any = null;
    await User.findOne({ "username": username }, (err, user: any) => {

        error = err;

        if (err) console.log(err);
        else {

            rating = user["rating"];
            console.log(user);
            console.log("rating : " + rating);

            evaluation = { "username": username, "rating": rating, "value": value };
        }
    });

    if (!error) {
        await Appraisal.updateOne({ "_id": _id }, { $push: { "evaluations": evaluation } }).then(user => {
            res = { "msg": "ok" };
        }).catch(err => {
            res = { 'msg': 'no' };
        });

    }
    else res = { 'msg': 'no' };

    return res;
}


async function get_current_appraisals_appraiser_history(username: string) {
    let res: any;

    await Appraisal.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
        if (err) console.log(err);
        else {

            console.log("appraisals");
            console.log(appraisals);

            res = appraisals;
        }
    });


    return res;

}


async function add_comment(username: string, _id: string, date_added: Date, comment: string) {
    let res: any;

    // await Appraisal.find({ "finished": false, "evaluations.username": username }, (err, appraisals) => {
    //     if (err) console.log(err);
    //     else {

    //         console.log("appraisals");
    //         console.log(appraisals);

    //         res = appraisals;
    //     }
    // });

    await Topic.updateOne({ "_id": _id }, { $push: { "comments": { "username": username, "comment": comment, "date_added": date_added } } }).
        then(user => {
            res = { "msg": "ok" };
        }).catch(err => {
            res = { 'msg': 'no' };
        });;


    return res;

}


async function user_finish_appraisal(_id: any) {
    let res: Object;



    await Appraisal.findOneAndUpdate({ '_id': _id }, { $set: { 'value': 0, 'finished': true } }).then(async (user: any) => {

        res = { 'msg': "ok" };
    }).catch((err: any) => {
        if (err)
            console.log(err);
        res = { 'msg': 'no' };
    });


    return res;

}

async function finish_appraisal(_id: any, value: number) {
    let res: Object;



    await Appraisal.findOneAndUpdate({ '_id': _id }, { $set: { 'value': value, 'finished': true } }).then(async (user: any) => {

        // console.log(user);

        //////// ovde funkcija koja radi update uppraisala
        let msg = await update_ratings(res, user.evaluations, value);



        // console.log("");


        res = { 'msg': msg };
    }).catch((err: any) => {
        if (err)
            console.log(err);
        res = { 'msg': 'no' };
    });


    return res;

}


async function get_all_current_appraisals() {
    let res: Object;

    await Appraisal.find({ "finished": false }, (err, appraisals) => {
        if (err) console.log(err);
        else {

            console.log("appraisals");
            console.log(appraisals);

            res = appraisals;
        }
    })


    return res;

}

// get_topic
async function get_topic(title: string) {
    let res: Object;

    await Topic.findOneAndUpdate({ 'title': title }, { $inc: { "views": 1 } }, (err, topic) => {


        if (err)
            console.log('error delegate');
        else {
            // let retObj = { 'user': user };
            // console.log(topic);
            res = topic;
        }
    });


    return res;

}

async function get_ratings_by_user(username: string) {

    let res: Object;

    await rating.findOne({ "username": username }, (err, ratings) => {
        if (err) console.log(err);
        else {



            res = ratings;
        }
    })


    return res;

}

async function get_rating(username: string) {

    let res: Object;

    await rating.findOne({ "username": username }, (err, ratings) => {
        if (err) console.log(err);
        else {


            let rating = calculate_new_rating(ratings != null ? ratings.toObject() : {});

            res = { "rating": rating };
        }
    })


    return res;

}

async function load_all_users() {
    let res: Object;

    await User.find({ "type": { $ne: "admin" } }, (err, users) => {
        if (err)
            console.log(err);
        else
            res = users;
    });

    return res;

}

async function delete_user(username: string) {
    let res: Object;
    var error: any;
    await User.deleteOne({ 'username': username },  async (err) => {

        error = err;
        if (err)
            console.log(err);
        else {
            console.log('obrisali smo korisnika');
            // res.json({ 'msg': 'ok' });

        }


    });
    let promise= new Promise(async(resolve, reject) => {

    
    if (!error) {
        await Appraisal.deleteMany({ "username": username, "finished": false }, async (err) => {
            if (err)
                console.log(err);
            else {
                console.log('obrisali smo appraisale');
                res = { 'msg': 'ok' };
            }
            resolve("success");

        })
    }
    else {
        console.log(error);
        res = { "msg": "no" };
    }


});

    await promise;
    return res;

}


async function delete_comment(_id: any, username: string, comment: string, date_added: Date) {
    let res: Object;

    await Topic.findOneAndUpdate({ '_id': _id }, { $pull: { "comments": { "username": username, "comment": comment} } }, (err) => {

        if (err)
            console.log(err);
        else {
            console.log('obrisali smo komentar');
            res = { 'msg': 'ok' };

        }


    });

    return res;

}


async function delete_appraisal(id: any) {
    let res: Object;

    await Appraisal.deleteOne({ '_id': id }, (err) => {

        if (err)
            {
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

}