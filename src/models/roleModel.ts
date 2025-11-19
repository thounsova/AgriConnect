import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRole extends Document {
  _id: Types.ObjectId;
  name: string; // e.g., "Admin", "Farmer", "Customer"
  dicription?: string;
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true },
  dicription: { type: String },
  
});

export const roleModel = mongoose.model<IRole>("roles", roleSchema);
