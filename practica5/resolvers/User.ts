import { GraphQLError } from "graphql";
import { userModelType } from "../db/user.ts";
import {collectionModel, collectionModelType } from "../db/collection.ts";

export const user = {
  collecioncomics: async (parent:userModelType):Promise<collectionModelType> => {
    const res = await collectionModel.findById({_id:parent.collecioncomics}).exec()
    if(!res){
      throw new GraphQLError(`Internal API error`, {
        extensions: { code: "INTERNAL_ERROR" },
      });
    }
    return res;
  }
};