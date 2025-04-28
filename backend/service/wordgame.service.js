import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function UpdateRandomWord(id) {
  const data = await prisma.gamewords.update({
    where:{
      id: id
    },
    data:{
      used_date: new Date()
    }
  })
}

export async function GetLastUsedWord() {
  const word = await prisma.gamewords.findMany({
    where: {
      used_date: {
        not: null,
      },
    },
    orderBy: {
      id: 'desc',
    },
    take: 1,
  });
  return word;
}

export async function GetRandomWordGame() {
    const word = await prisma.gamewords.findFirst({
      where: {
        used_date: null,
      },
    });
      UpdateRandomWord(word.id);
      return word.word;
}