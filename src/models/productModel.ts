import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "out of stock";
  farmer_id: mongoose.Schema.Types.ObjectId;
  category_id: mongoose.Schema.Types.ObjectId;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: { type: String, default: "active" },
    farmer_id: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
