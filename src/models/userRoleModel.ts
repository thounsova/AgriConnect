import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserRole extends Document {
  user_id: Types.ObjectId;
  role_id: Types.ObjectId;
}

const userRoleSchema = new Schema<IUserRole>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

// Ensure combination of user_id + role_id is unique
userRoleSchema.index({ user_id: 1, role_id: 1 }, { unique: true });

export const userRoleModel = mongoose.model<IUserRole>("UserRole", userRoleSchema);
