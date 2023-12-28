// The GraphQL schema
export const typeDefs = `#graphql
 type comic {
    id: String!
    titulo: String!
    descripcion: String!
    formato: String!
  }

 type user {
    id: String!
    nombre: String!
    correo: String!
    collecioncomics: collection!
  }

 type collection {
    id: String!
    nombre: String!
    comics: [comic!]!
 }


  type Query {
    comics: [comic!]!
    comic(id: ID!): comic!
    users: [user!]!
    user(id: ID!): user!
  }

  type Mutation {
    addcomic(titulo: String!, descripcion: String!, formato: String!): comic!
    deletecomic(id: ID!): comic!
    updatecomic(id: ID!, titulo: String, descripcion: String, formato: String): comic!
    adduser(nombre: String!, correo: String!): user!
    deleteuser(id: ID!): user!
    updateuser(id: ID!, nombre: String, correo: String): user!
    addcomictocollection(comicid: ID!, collectionid: ID!): String!
    
  }
`;