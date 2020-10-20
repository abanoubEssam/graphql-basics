import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';
import { mongodbURL } from './constants';
import { Mutation } from './graphql/resolvers/Mutation';
import { Query } from './graphql/resolvers/Query';

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema/schema.graphql',
    resolvers: {
        Mutation,
        Query
    },
    context(request) {
        return {
            request
        }
    },
    middlewares: []
})


const options = {
    port: 3000
}

server.start(options, async ({ port }) => {
    try {
        await mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`db connected to ${mongodbURL}`)
    } catch (error) {
        console.log("Mongo ERROR", error)
    }
    console.log(`Graphql Server Up on Port ${port}`)
})