const {gql} = require('apollo-server');
const {prisma} = require('../db/client');

const typeDefs = gql`
    scalar Date

    type MyType {
        created: Date
    }

    type Query {
        "These are plants that will be on the user's plant stand"
        plantStand: [Plant!]!
        "Information of the user"
        user(id: ID!): User
        plant(id: ID!): Plant
    }

    type Mutation {
        createUser(username: String!, email: String!, hashedPassword: String!): CreateUserResponse!
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type User {
        id: ID!
        username: String!
        email: String!
        hashedPassword: String!
        plantList: [Plant!]
    }

    type Plant {
        id: ID!
        commonName: String!
        scientificName: String!
        lastWateredAt: Date
        lastFertilizedAt: Date
        lastRepottedAt: Date
        lastCleanedAt: Date
        waterVolumeRequirement: Int
        waterFrequencyRequirement: String
        sunRequirement: String
        soilRequirement: String
        propagationType: String
        flowers: String
        growthRate: String
        careLevel: String
        poisonousToHumans: Boolean
        poisonousToPets: Boolean
        description: String
        imageUrl: String
        careGuide: CareGuide
        questions: [FAQ!]!
    }

    type CareGuide {
        id: ID!
        watering: String
        sunlight: String
        pruning: String
    }

    type FAQ {
        id: ID!
        question: String
        answer: String
    }
`;

module.exports = {typeDefs};

