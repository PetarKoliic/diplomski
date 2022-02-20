import mongoose from 'mongoose';
import { Evaluation } from './evaluation.model';

const Schema = mongoose.Schema;

let Appraisal = new Schema({
    
    _id: {
        type: Schema.Types.ObjectId
    },
    img_names: {
        type: Array<String>()
    },
    username: {
        type: String
    },
    description: {
        type: String
    },
    date_added: {
        type: Date
    },
    finished: {
        type: Boolean
    },
    evaluations:{
        type: Array<Evaluation>()
    },
    value: {
        type: Number
    }

});

export default mongoose.model('appraisal', Appraisal, 'appraisals');