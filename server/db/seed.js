const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.user.upsert({
        where: {username: 'AygulP'},
        update: {},
        create: {
            username: 'AygulP',
            email: 'aygul@email.com',
            hashedPassword: 'password',
        }
    });

    await prisma.plant.upsert({
        where: {commonName: 'Monstera'},
        update: {},
        create: {
            commonName: 'Monstera',
            scientificName: 'Monstera Deliciosa',
            questions: {
                create: {
                    question: 'question',
                    answer: 'answer'
                }
            }
        }
    })
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })
