import mongoose from 'mongoose';
// import { Evaluation } from './evaluation.model';

const Schema = mongoose.Schema;

let Global = new Schema({
    
    name: {
        type: String
    },
    value: {
        type: Number
    }

});

export default mongoose.model('global', Global, 'globals');