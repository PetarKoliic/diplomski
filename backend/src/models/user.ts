import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type : String
    },
    rating: {
        type: Number
    },
    date_added: {
        type: Date
    },
    valid_until: {
        type: Date
    },
    payed:{
        type: Number
    },
    owned: {
        type: Number
    },
    bonus: {
        type: Number
    },
    cnt_appraisals_monthly: {
        type: Number
    },
    balance: {
        type: Number
    },


});

export default mongoose.model('user', User, 'users');