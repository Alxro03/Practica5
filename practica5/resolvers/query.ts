import { GraphQLError } from "graphql";
import { comicModel, comicModelType } from "../db/comic.ts";
import { userModel, userModelType } from "../db/user.ts";
import { collectionModel } from "../db/collection.ts";

export const Query = {
  comics: async (): Promise<comicModelType[]> => {
    const comics = await comicModel.find().exec();
    return comics;
  },

  comic: async (_: unknown, args: { id: string }): Promise<comicModelType> => {
    const comic = await comicModel.findById(args.id);
    if (!comic) {
      throw new GraphQLError(`No comic found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return comic;
  },

  users: async (): Promise<userModelType[]> => {
    const users = await userModel.find().exec();
    return users;
  },

  user: async (
    _: unknown,
    args: { id: string }
  ): Promise<userModelType> => {
    const user = await userModel.findById(args.id);
    if (!user) {
      throw new GraphQLError(`No user found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return user;
  },
};