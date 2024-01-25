const prisma = require('../db/client');

// Per the GraphQL specification, the ID type is serialized the same way as a String. Therefore you convert to a Number because the id in the Prisma schema is an int.

const resolvers = {
    Query: {
        // !!!!!!!!! <
        // NEED TO CHANGE this so that returns a list of all the plants belonging to one person
        // this does not return the questions field because that field needs a resolver of its own which is written below
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
    // User: { // not sure about this
    //     plantList: ({id}) => {
    //         return prisma.user
    //         .findUnique({
    //             where: {id: id},
    //         })
    //         .plantList()
    //     }
    // },
    Plant: {
        questions: (parent) => {
            // console.log(parent); // this returns an array of two objects
            // console.log(parent.questions); // this is undefined
            return prisma.plant.findMany();
        }
    },
    FAQ: {
        question: (parent) => {
            // console.log(parent[0]); // this returns an array of two objects?!
            // console.log(parent); // this returns two arrays of two objects each?!
            return prisma.FAQ.findMany();
        }
    }
};

module.exports = {resolvers};
