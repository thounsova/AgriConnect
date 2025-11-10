import { time } from "console";
import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  _id: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

const cartItemSchema = new Schema<ICartItem>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, {timestamps: true });

export const cartItemModel = mongoose.model<ICartItem>("CartItem", cartItemSchema);
