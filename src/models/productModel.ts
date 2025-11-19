import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "out of stock";
  user_id: mongoose.Schema.Types.ObjectId;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "out of stock"],
      default: "active",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",       // FK -> USER.id
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
