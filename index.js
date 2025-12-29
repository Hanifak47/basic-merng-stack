// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');
// const { MONGODB } = require('./config.js');

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// });

// // Bagian ini telah diperbaiki dengan menghapus objek konfigurasi yang usang
// mongoose
//     .connect(MONGODB)
//     .then(() => {
//         console.log('MongoDB Connected');
//         return server.listen({ port: 5000 });
//     })
//     .then((res) => {
//         console.log(`Server running at ${res.url}`);
//     })
//     .catch((err) => {
//         console.error(err);
//     });



// const { ApolloServer } = require('apollo-server');
// const { PubSub } = require('graphql-subscriptions');
// const mongoose = require('mongoose');

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');
// const { MONGODB } = require('./config.js');

// const pubsub = new PubSub();

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({ req, pubsub })
// });

// console.log('Starting server...');
// console.log('Connecting to MongoDB...');

// mongoose
//     .connect(MONGODB, {
//         serverSelectionTimeoutMS: 30000,
//         socketTimeoutMS: 30000,
//         family: 4
//     })
//     .then(() => {
//         console.log('✅ MongoDB Connected Successfully!');
//         return server.listen({ port: 5000 });
//     })
//     .then((res) => {
//         console.log(`🚀 Server running at ${res.url}`);
//     })
//     .catch((err) => {
//         console.error('❌ Connection error:');
//         console.error('Error name:', err.name);
//         console.error('Error message:', err.message);
//     });


const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGODB)
  .then(() => server.listen({ port: 5000 }))
  .then(res => {
    console.log(`🚀 Server ready at ${res.url}`);
  });
