import mongoose from "mongoose";


const ApplicationSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    

    pet: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true,
    },
    status: {
    type: String,
    enum:['pending', 'Approved', 'rejected', ],
    default: 'pending',

    } ,
    date: {
        type: Date,
        default: Date.now,
    }  ,
    message: {
        type: String,
        required: true,
    }  ,
    
    
})



export default mongoose.model('Application', ApplicationSchema);