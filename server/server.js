const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const makalemodel = require("./models/makaleModel");
const dburi =
  "mongodb+srv://mglryz:1234@cluster0.gqz8h.mongodb.net/blogDB?retryWrites=true&w=majority";

const typeDefs = gql`
  type Makale {
    id: ID!
    baslik: String!
    icerik: String!
  }
  type Query {
    makalegetir: [Makale]!
    tekmakale(id: ID!): Makale!
  }
  type Mutation {
    makaleOlustur(baslik: String!, icerik: String!): Makale!
    makaleSil(id: ID!): String!
  }
`;
const resolvers = {
  Query: {
    async makalegetir() {
      const makaleler = await makalemodel.find();
      return makaleler;
    },
    async tekmakale(parent, args) {
      try {
        const { id } = args;
        return await makalemodel.findById(id);
      } catch (error) {
        throw new error();
      }
    },
  },
  Mutation: {
    makaleOlustur: async (parent, args) => {
      try {
        const makale = {
          baslik: args.baslik,
          icerik: args.icerik,
        };
        return await makalemodel.create(makale);
      } catch (error) {
        throw new error();
      }
    },
    makaleSil: async (_, { id }) => {
      try {
        const silinecek = await makalemodel.findById(id);
        await silinecek.delete();
        return "Silindi";
      } catch (error) {
        throw new error();
      }
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo aktif");
    return server.listen({ port: 5000 });
  })
  .then(() => {});
