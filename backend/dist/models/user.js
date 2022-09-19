"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    rating: {
        type: Number
    },
    date_added: {
        type: Date
    },
    valid_until: {
        type: Date
    },
    // payed:{
    //     type: Number
    // },
    // owned: {
    //     type: Number
    // },
    // bonus: {
    //     type: Number
    // },
    cnt_appraisals_monthly: {
        type: Number
    },
    balance: {
        type: Number
    },
});
exports.default = mongoose_1.default.model('user', User, 'users');
//# sourceMappingURL=user.js.map