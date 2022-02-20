"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import { Evaluation } from './evaluation.model';
const Schema = mongoose_1.default.Schema;
let Rating = new Schema({
    username: {
        type: String
    },
    ratings: {
        type: Array()
    }
});
exports.default = mongoose_1.default.model('rating', Rating, 'ratings');
//# sourceMappingURL=rating.js.map