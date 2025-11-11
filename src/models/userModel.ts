import mongoose, { Types, Schema, Document } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    full_name: string;
    email: string;
    address?: string;
    password: string;
    phone?: string;
    role: "farmer" | "admin";
    refreshToken: string;
}

const userSchema = new Schema<IUser>(
    {
        full_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        password: { type: String, required: true, unique: true },
        phone: { type: String },
        role: {
            type: String,
            enum: ["farmer", "admin"],
            default: "farmer",
        },
        refreshToken: { type: String },
    },
    { timestamps: true },
);

export const userModel = mongoose.model<IUser>("User", userSchema);

