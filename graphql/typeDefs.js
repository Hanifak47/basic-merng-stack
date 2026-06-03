// ppenentuan schema untuk frontend, beda dengan model yaitu penentuan schema untuk db

// segala isi dari GQL baik type maupuun input penamaanya wajib sama dengan method pada resolver contoh likepost mutation = dengan likepost pada resolver post.js (cek sendiir)
// mekanismenya adalah typedefs terhubung dengan apollo server -> typedefs inilah yg menghubungkan ke index js dan index js otomatis mencari method likepost

// apollo inilah nanti yg menghubungkan typedefs ini degnan frontend
const { gql } = require('apollo-server');

// input  → data dikirim  FRONTEND → RESOLVER (bentuk datanya seperti apa)
// type   → data dikirim  RESOLVER → FRONTEND (bentuk datanya seperti apa)


// segala tag yg ada gql nya ada kaitannya dengan graphql
module.exports = gql`

# maksudnya adalah ketika query post maka bisa mengembalikan field id sd commentcount
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type Like{
    id: ID!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

# maksudnya adalah  <nama method>, <parameter>, <return value> , isi method biasanya mengembalikan field yang sesuai
# jika returnnya adalah Post maka isi method bisa return field field yg ada pada post
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
    
  type Subscription{
    newPost: Post!
  }
`;