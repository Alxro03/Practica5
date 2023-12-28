import mongoose from "mongoose";
import { collection } from "../types.ts";

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  nombre: { type: String, required: true },
  comics: { type: [Schema.Types.ObjectId],ref:'comic', required: true },
});

export type collectionModelType = mongoose.Document & Omit<collection, "id" >;



export const collectionModel = mongoose.model<collectionModelType>("collection", collectionSchema);