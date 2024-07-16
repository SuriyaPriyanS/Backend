import mongoose from "mongoose";




const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://www.freepik.com/icon/man_145848#fromView=search&page=1&position=14&uuid=d7fed049-5008-45c3-bed7-7d95942cb37c"
    },

    

});



export default mongoose.model('User', UserSchema);