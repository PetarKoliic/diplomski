import mongoose from 'mongoose';
// import { Evaluation } from './evaluation.model';
import { Reply } from './reply.model';
const Schema = mongoose.Schema;

let Topic = new Schema({
    
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
    replies: {
        type: Array<Reply>()
    }

});

export default mongoose.model('topic', Topic, 'topics');