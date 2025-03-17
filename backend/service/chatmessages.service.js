import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllMessages() {
  const data = await prisma.chatMessages.findMany();

  return data;
}

export async function updateChat(id, flag) {
  await prisma.chatMessages.update({
    where: {
      id: id,
    },
    data: {
      flag: flag,
    },
  });
}

