import { GraphQLError } from "graphql";
import { comicModel, comicModelType } from "../db/comic.ts";
import { userModel, userModelType } from "../db/user.ts";
import mongoose from "mongoose";
import { collectionModel } from "../db/collection.ts";

export const Mutation = {
  addcomic: async (
    _: unknown,
    args: { titulo: string; descripcion: string; formato: string }
  ): Promise<PetModelType> => {
    const comic = {
      titulo: args.titulo,
      descripcion: args.descripcion,
      formato: args.formato,
    };
    const newcomic = await comicModel.create(comic);
    return newcomic;
  },
  deletecomic: async (
    _: unknown,
    args: { id: string }
  ): Promise<comicModelType> => {
    const comic = await comicModel.findByIdAndDelete(args.id);
    if (!comic) {
      throw new GraphQLError(`No comic found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return comic;
  },
  updatecomic: async (
    _: unknown,
    args: { id: string; titulo: string; descripcion: string; formato: string }
  ): Promise<comicModelType> => {
    const comic = await comicModel.findByIdAndUpdate(
      args.id,
      { titulo: args.titulo, descripcion: args.descripcion, formato: args.formato },
      { new: true, runValidators: true }
    );
    if (!comic) {
      throw new GraphQLError(`No comic found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return comic;
  },

  adduser: async (
    _: unknown,
    args: { nombre: string; correo: string }
  ): Promise<userModelType> => {
    const collection = {
        nombre: "collection "+ args.nombre,
        comics: [],
    }
    const newcol = await collectionModel.create(collection)

    const user = {
      nombre: args.nombre,
      correo: args.correo,
      collecioncomics: newcol,
    };
    
    const newuser = await userModel.create(user);
    return newuser;
  },

  deleteuser: async (
    _: unknown,
    args: { id: string }
  ): Promise<userModelType> => {
    const user = await userModel.findByIdAndDelete(args.id);
    if (!user) {
      throw new GraphQLError(`No user found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    const collection = await collectionModel.findByIdAndDelete(user.collecioncomics);
    if (!collection) {
        throw new GraphQLError(`No collection found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
    return user;
  },

  updateuser: async (
    _: unknown,
    args: { id: string; nombre: string; correo: string }
  ): Promise<userModelType> => {
    const user = await userModel.findByIdAndUpdate(
      args.id,
      { nombre: args.nombre, correo: args.correo },
      { new: true, runValidators: true }
    );
    if (!user) {
      throw new GraphQLError(`No user found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return user;
  },

  addcomictocollection: async (
    _: unknown,
    args: { comicid: string, collectionid: string }
  ): Promise<string> => {
    let collection = await collectionModel.findById({_id:args.collectionid}).exec();
    let comic = await comicModel.findById({_id:args.comicid}).exec();

    if (!collection) {
      throw new GraphQLError(`No collection with id ${args.collectionid}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    if (!comic) {
        throw new GraphQLError(`No comic with id ${args.comicid}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
    collection.comics.push(args.comicid);
    collection.save();
    return "Done";
  },




};