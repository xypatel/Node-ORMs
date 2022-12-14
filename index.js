const prismaClient = require('@prisma/client');

const prisma = new prismaClient.PrismaClient()

async function main() {
    await prisma.user.create({
      data: {
        name: 'Axay',
        email: 'axay@prisma.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'Go Buckeyes' },
        },
      },
    })
  
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    })
    console.dir(allUsers, { depth: null })
  }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })