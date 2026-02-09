import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    deletedAt: {type: Date, default: null},
}, { timestamps: true })

export const UserModel = model("User", userSchema)