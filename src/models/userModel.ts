import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  roles: ("admin" | "farmer" | "customer")[]; //  plural and array type
}

const userSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    roles: {
      type: [String], //  array of strings
      enum: ["admin", "farmer", "customer"],
      default: ["farmer"],
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IUser>("User", userSchema);
