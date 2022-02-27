import mongoose from 'mongoose';
// import { Evaluation } from './evaluation.model';
import { Comment } from './comment.model';
const Schema = mongoose.Schema;

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
        type: Array<Comment>()
    },
    views: {
        type: Number
    },

});

export default mongoose.model('topic', Topic, 'topics');