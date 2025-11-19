import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  status: "active" | "inactive";
}

const userSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

export const farmerModel = mongoose.model<IUser>("farmers", userSchema);
