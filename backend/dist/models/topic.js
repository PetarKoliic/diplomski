"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Topic = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    date_added: {
        type: Date
    },
    comments: {
        type: Array()
    },
    views: {
        type: Number
    },
});
exports.default = mongoose_1.default.model('topic', Topic, 'topics');
//# sourceMappingURL=topic.js.map