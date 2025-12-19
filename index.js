const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
// Memanggil variabel MONGODB dari file config.js
const { MONGODB } = require('./config.js');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Menghubungkan ke MongoDB tanpa opsi yang sudah tidak didukung (deprecated)
mongoose
    .connect(MONGODB)
    .then(() => {
        console.log('MongoDB Connected successfully');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((err) => {
        console.error('Connection error:', err.message);
    });