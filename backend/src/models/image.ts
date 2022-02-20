import mongoose from 'mongoose';
import { Evaluation } from './evaluation.model';

const Schema = mongoose.Schema;

let Image = new Schema({
    
    img_name: {
        type: String
    },
    ratings: {
        type: Array<Evaluation>()
    }

});

export default mongoose.model('image', Image, 'images');

