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
const user_1 = __importDefault(require("./models/user"));
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
module.exports = {
    login,
    register,
    check_old_password,
    change_password,
    add_appraisal,
};
//# sourceMappingURL=services.js.map