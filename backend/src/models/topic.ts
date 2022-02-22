import mongoose from 'mongoose';
// import { Evaluation } from './evaluation.model';
import { Comment } from './comment.model';

const Schema = mongoose.Schema;

let Topic = new Schema({
    
    username: {
        type: String
    },
    title: {
        type: String
    },
    theme: {
        type: String
    },
    comments: {
        type: Array<Comment>()
    }

});

export default mongoose.model('topic', Topic, 'topics');