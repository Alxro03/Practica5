import { GraphQLError } from "graphql";
import { collectionModel, collectionModelType } from "../db/collection.ts";
import { comicModel, comicModelType } from "../db/comic.ts";
import { userModel } from "../db/user.ts";

export const collection = {
  comics: async (parent:collectionModelType):Promise<comicModelType[]> =>{
    const comics:comicModelType[] = await parent.comics.map(async (i:string) =>{
     const res=await comicModel.findById({_id:i}).exec()
      if(!res){
        throw new GraphQLError(`Internal API error`, {
          extensions: { code: "INTERNAL_ERROR" },
        });
      }
      return res
    })
    if(!comics||comics==null)return [];
    return comics
  }
};