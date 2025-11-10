import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAuthor extends Document {
  _id: Types.ObjectId;
  full_name: string;
  email: string;
  phone: string;
  dob: Date;
  nationality: string;
}

const authorSchema = new Schema<IAuthor>(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    // versionKey: false, 
  }
);


export const authorModel = mongoose.model<IAuthor>("Author", authorSchema);
