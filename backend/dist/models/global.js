"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import { Evaluation } from './evaluation.model';
const Schema = mongoose_1.default.Schema;
let Global = new Schema({
    name: {
        type: String
    },
    value: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('global', Global, 'globals');
//# sourceMappingURL=global.js.map