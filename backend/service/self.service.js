import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserProgress(username) {
  const data = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return data.user_current_progress;
}

export default getUserProgress;