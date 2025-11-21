import mongoose, { Schema, Document } from "mongoose";

export interface FarmerDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
}

const farmerSchema = new Schema<FarmerDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    

    
  },
  { timestamps: true }
);

export const FarmerModel = mongoose.model<FarmerDocument>(
  "Farmer",
  farmerSchema
);
