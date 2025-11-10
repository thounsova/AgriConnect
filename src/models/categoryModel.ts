import mongoose, { Schema } from "mongoose";
import { ICategory } from "@/types/category-type";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const categoryModel = mongoose.model<ICategory>("Category", categorySchema);


