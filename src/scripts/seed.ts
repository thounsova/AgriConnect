// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { bookModel } from "@/models/bookModel";
// import { userModel } from "@/models/userModel";
// import { cartModel } from "@/models/cartModel";
// import { cartItemModel } from "@/models/cartIteamModel";
// import { OrderModel } from "@/models/orderModel";
// import { OrderItemModel } from "@/models/orderItemModel";

// dotenv.config();

// const mongoURI = process.env.MONGO_URI;
// const modelsToMigrate = [bookModel, userModel, cartModel, cartItemModel, OrderModel, OrderItemModel];

// const migrateSchema = async () => {
//   try {
//     await mongoose.connect(mongoURI || "", );
//     console.log("MongoDB connected for schema migration");

//     for (const Model of modelsToMigrate) {
//       const modelName = Model.modelName;
//       console.log(`Migrating schema for model: ${modelName}`);

//       const schemaFields = Object.keys(Model.schema.paths).filter(
//         (key) => !["_id", "__v"].includes(key)
//       );
      
//       const allDocuments = await Model.find({}).lean();

//       if (allDocuments.length === 0) {
//         console.log(`No documents found for model: ${modelName}, skipping migration.`);
//         continue;
//       }

//       for (const doc of allDocuments) {
//         const updateFields = {};
//         let needUpdate = false;

//         for (const field of schemaFields) {
//           if (doc[field] === undefined) {
//             const defaultValue = Model.schema.paths[field].options.default;
//             updateFields[field] = typeof defaultValue === "function" ? defaultValue() : defaultValue ?? null;
//             needUpdate = true;
//           }
//         }

//         if (needUpdate) {
//           await Model.updateOne({ _id: doc._id }, { $set: updateFields });
//           console.log(`Updated document with _id: ${doc._id} in model: ${modelName}`);
//         }
//       }
//     }

//     console.log("✅ Schema migration completed");

//   } catch (error) {
//     console.error("❌ Migration failed:", error);
//   } finally {
//     await mongoose.connection.close();
//     console.log("🚪 MongoDB connection closed");
//   }
// };

// migrateSchema();

