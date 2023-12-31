import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    country:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

export default mongoose.model("User", userSchema)