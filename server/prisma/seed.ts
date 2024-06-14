import { PrismaService } from "src/prisma/prisma.service";

async function main() {
  const prismaService = new PrismaService();
  await prismaService.onModuleInit();

  try {
    await prismaService.movie.createMany({
      data: []
    });
    console.log('Seeding finished');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
