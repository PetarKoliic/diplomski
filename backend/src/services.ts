
import user from './models/user';
import Appraisal from './models/appraisal';
import { Evaluation } from './models/evaluation.model';
import Topic from './models/topic';
import User from './models/user';






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

async function register(user: any, username: string, email: string)
{
    var res:any;
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
                    user.save().then((u : any) => {
                        res = { "msg": "ok" };
                    });
                }

            });
        }
    });

    return res;
}

//////////////////////////////////////////////////

async function check_old_password(username : string, password: string)
{
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
                        res ={ "msg": "no" };
                }


            });
    
    console.log(res);            

    return res;
}

async function change_password(username: string, new_password: string)
{
    let res : any;
    await User.updateOne({ 'username': username }, { $set: { 'password': new_password } }).then((user: any) => {

        res = { 'msg': 'ok' };
    }).catch((err: any) => {
        if (err)
            console.log(err);
        res = { 'msg': 'no' };
    });


    return res;
}

async function add_appraisal(appraisal: Appraisal)
{
    let res : any;
    

    await appraisal.save().then((u:any) => {
        res = { "msg": "ok" };
    }).catch((err:any) => {
        res = { "msg": "error" };
    })

    return res;
}


module.exports = {
    login,
    register,
    check_old_password,
    change_password,
    add_appraisal,

}