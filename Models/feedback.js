import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    data: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },


    

})

export  default  mongoose.model('feedback', feedbackSchema);