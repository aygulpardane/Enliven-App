require('dotenv').config();
const express = require('express');
const {PORT} = process.env;
const {ApolloServer} = require('apollo-server-express');
const {startStandaloneServer} = require('@apollo/server/standalone');
const {typeDefs} = require('./src/schema');
const {resolvers} = require('./src/resolvers');
const PlantAPI = require('../server/datasources/plant-api');

async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();
    server.applyMiddleware({app});

    app.use((req, res) => {
        res.status(200);
        res.send('Hello!');
        res.end();
    });

    await new Promise(
        resolve => app.listen({port: PORT}, resolve)
    )

    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);

    return {server, app};
}

startApolloServer();

// BELOW IS HOW TO START THE APP WITH CONNECTION TO REST API
// async function startApolloServer() {
//     const app = express();
//     const server = new ApolloServer({
//         typeDefs,
//         resolvers
//     });
//     // new below
//     await startStandaloneServer(server, {
//     context: async () => {
//       const { cache } = server;

//       return {
//         dataSources: {
//           plantAPI: new PlantAPI({ cache }),
//         },
//       };
//     },
//     });
//     // new above
//     server.applyMiddleware({app});

//     app.use((req, res) => {
//         res.status(200);
//         res.send('Hello!');
//         res.end();
//     });

//     await new Promise(
//         resolve => app.listen({port: PORT}, resolve)
//     )

//     console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);

//     return {server, app};
// };

// startApolloServer();




