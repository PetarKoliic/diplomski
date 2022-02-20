import mongoose from 'mongoose';
// import { Evaluation } from './evaluation.model';

const Schema = mongoose.Schema;

let Rating = new Schema({
    
    username: {
        type: String
    },
    ratings: {
        type: Array<Number>()
    }

});

export default mongoose.model('rating', Rating, 'ratings');