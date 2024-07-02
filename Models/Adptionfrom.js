import mongoose from "mongoose";


const AdoptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        ref: 'User', // Assuming there's a User model to associate the post with its creator
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
export default  mongoose.model('AdoptionPost', AdoptionSchema);

