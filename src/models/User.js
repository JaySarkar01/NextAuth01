import mongoose from "mongoose";
import Email from "next-auth/providers/email";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        email:{
            type:String,
            unique: true,
            required: true,
        },
        password:{
            type: String,
            required: false,
        },
    },
    { timestamps:true}
);

export default mongoose.models.User || mongoose.model("User", userSchema);