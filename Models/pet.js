import mongoose from "mongoose";



const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    breed: {
        type: String,
        required: true,
    },

    age : {
       type: Number,
       required: true,
    },

    temperament: {
        type: String,
        required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
        
    }
   

        
})

const Pet = mongoose.model('Pet', PetSchema);

export default Pet;