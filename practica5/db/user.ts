import mongoose from "mongoose";
import { user } from "../types.ts";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  collecioncomics: {type:Schema.Types.ObjectId,ref:'collection', required:true},
});

export type userModelType = mongoose.Document & Omit<user, "id">;


export const userModel = mongoose.model<userModelType>(
  "user",
  userSchema
);