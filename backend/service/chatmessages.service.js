import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllMessages() {
  const data = await prisma.chatmessages.findMany({
    include: {
      user: true
    }
  });

  return data;
}

export async function updateChat(id, flag) {
  await prisma.chatmessages.update({
    where: {
      id: id,
    },
    data: {
      flag: flag,
    },
  });
}
