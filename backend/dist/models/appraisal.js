"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Appraisal = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    img_names: {
        type: Array()
    },
    username: {
        type: String
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    description: {
        type: String
    },
    date_created: {
        type: Date
    },
    author: {
        type: String
    },
    date_added: {
        type: Date
    },
    finished: {
        type: Boolean
    },
    evaluations: {
        type: Array()
    },
    value: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('appraisal', Appraisal, 'appraisals');
//# sourceMappingURL=appraisal.js.map