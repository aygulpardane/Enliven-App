const prisma = require('../db/client');

// Per the GraphQL specification, the ID type is serialized the same way as a String. Therefore you convert to a Number because the id in the Prisma schema is an int.

const resolvers = {
    Query: {
        // this returns a list of all the plants
        plantStand: async () => {
            try {
                const plants = await prisma.plant.findMany();
                return plants
            } catch (error) {
                return {
                    message: "Unable to get plants"
                }
            }
        },

        // this returns a single user
        user:  async (_, {id}) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {id: Number(id)},
                });

                return user
            } catch (error) {
                return {
                    message: "Unable to get user"
                }
            };
        },

        // this returns a single plant
        plant: (_, {id}) => {
            return prisma.plant.findUnique({
                where: {id: Number(id)},
            });
        },
    },
    Mutation: {
        createUser: (_, {email, username, hashedPassword}) => {
            return prisma.user.create({
                data: {
                    code: 200,
                    success: true,
                    message: `Successfully created new user`,
                    user: {
                        create: {
                            username,
                            email,
                            hashedPassword
                        },
                    },
                },
            });
        },
    },
    User: { // not sure about this
        plantList: ({id}) => {
            return prisma.user
            .findUnique({
                where: {id: id},
            })
            .plantList()
        }
    },
};

module.exports = {resolvers};
