import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    profilePic:{
        type:String,
        default: ""
    },
    gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
    },
    
}, { timestamps: true }
)

const User= mongoose.model("User",userSchema);

export default User;