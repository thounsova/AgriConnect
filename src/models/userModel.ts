import mongoose, { Types, Schema, Document } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    full_name: string;
    user_name: string;
    email: string;
    password: string;
    phone?: string;
    role: "user" | "admin";
    refreshToken: string;
}

const userSchema = new Schema<IUser>(
    {
        full_name: { type: String, required: true },
        user_name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        phone: { type: String },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        refreshToken: { type: String },
    },
    { timestamps: true },
);

export const userModel = mongoose.model<IUser>("User", userSchema);

