import mongoose from "mongoose";
import { Schema } from "mongoose";

const RoomSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers:[{
        number:Number,
        unavailableDates:{type:[Date]}
    }],
}, { timestamps: true })

export default mongoose.model("Room", RoomSchema)