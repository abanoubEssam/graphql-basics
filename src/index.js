import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4, v4 } from 'uuid';

// Type Definitions (Schema)
const typeDefs = `
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
    }
    type Query {
        hello: String!
        events: [Event]!
    }
    type Mutation {
        createEvent(input: EventInput ): Event!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return "This is my first Query!"
        },
        events() {
            return [
                { _id: '12asdasd', title: "tit1", description: "desc1", price: 15.99, date: "25-11-2019" }
            ]
        }
    },
    Mutation: {
        createEvent(parent, { input }, ctx, info) {
            const id = v4()
            return { _id: id , title: input.title , description: input.description , price: input.price , date: input.date }
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

const options = {
    port: 3000
}

server.start(options, ({ port }) => {
    console.log(`Graphql Server Up on Port ${port}`)
})