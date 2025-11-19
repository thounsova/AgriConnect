import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
  },
  { timestamps: true }
);


export const userRoleModel = mongoose.model("userroles", userRoleSchema);
