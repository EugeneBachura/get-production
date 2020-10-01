const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
  { title: "My App", prev: "Irure commodo sint et reprehenderit laborum aute nostrud sit sit aute ullamco eiusmod ullamco dolore.", body: "Aute officia non commodo dolore do labore in ullamco occaecat do proident enim. Incididunt dolore quis in proident elit ut. Ullamco Lorem incididunt aliqua pariatur. Veniam cillum officia ex tempor Lorem ex aliqua excepteur voluptate exercitation duis deserunt id. Anim est laboris cillum adipisicing. Nisi id ipsum eiusmod commodo tempor occaecat veniam incididunt aute in aute ex. Duis nulla amet enim commodo.", img: "/images/1.jpg"},
  { title: "OK, GOOGLE", prev: "Eiusmod voluptate sit minim do aliqua cupidatat proident aliquip aute elit anim ex.", body: "Fugiat exercitation aliqua enim voluptate dolore elit qui mollit eiusmod ea. Sint commodo reprehenderit nisi officia veniam. Eu tempor labore quis esse. Aliquip nulla officia deserunt excepteur amet voluptate ipsum sint voluptate. Dolore veniam aute labore esse aliqua quis veniam sunt in eiusmod tempor id ut consequat.", img: "/images/2.jpg"},
  { title: "Aute officia", prev: "Et labore dolor fugiat eiusmod quis duis laborum reprehenderit mollit occaecat proident.", body: "Ea ut mollit aute eiusmod nisi consectetur ad dolor voluptate ipsum nisi velit. Amet enim in tempor sit eu. Consectetur esse ad fugiat quis do excepteur cillum quis. Nulla elit irure eiusmod non commodo minim reprehenderit magna nisi eu nisi sint proident nulla. Ullamco id aliqua exercitation dolore nulla. Eiusmod Lorem sint irure incididunt veniam nisi do et qui. Exercitation ad consectetur occaecat ex adipisicing deserunt exercitation irure nulla anim sit irure nisi.", img: "/images/3.jpg"}
];

const USERS = [
  { login: "login", password: "password" },
  { login: "email@gmail.com", password: "password" }
];

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
    user(login: String, password: String): Boolean
  }

  type Post {
    id: ID!
    title: String
    prev: String
    body: String
    img: String
  }

  type User {
    login: String
    password: String
  }
`);


const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
  user: ({ login, password }) => USERS.some(user => (user.login === login)&&(user.password === password))
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`GraphQL API server runing: localhost:${port}/graphql`);