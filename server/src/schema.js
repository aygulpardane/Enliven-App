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
        "Information of the plant"
        plant(id: ID!): Plant
        "Information of the care guide"
        careGuide(id: ID!): CareGuide
    }

    type Mutation {
        createUser(username: String!, email: String!, hashedPassword: String!): CreateUserResponse!

        loginUser(email: String!, hashedPassword: String!): LoginUserResponse!

        updateUser(id: ID!, username: String!, email: String!, hashedPassword: String!): UpdateUserResponse!

        deleteUser(id: ID!): DeleteUserResponse!

        addToPlantStand(userId: ID!, plantId: ID!): AddToPlantStandResponse!

        updatePlantInPlantStand(userId: ID!, plantId: ID!, updatedPlantInfo: PlantInput!): UpdatePlantResponse!

        deletePlantFromPlantStand(userId: ID!, plantId: ID!): DeletePlantFromPlantStandResponse!
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type LoginUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String!
        user: User
    }

    type UpdateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type DeleteUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    type AddToPlantStandResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: User
    }

    input PlantInput {
        lastWateredAt: Date
        lastFertilizedAt: Date
        lastRepottedAt: Date
        lastCleanedAt: Date
    }

    type UpdatePlantResponse {
        code: Int!
        success: Boolean!
        message: String!
        plant: Plant
    }

    type DeletePlantFromPlantStandResponse {
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
        User: [User]
    }

    type CareGuide {
        id: ID!
        watering: String
        sunlight: String
        pruning: String
        plant: Plant
    }
`;

module.exports = {typeDefs};

