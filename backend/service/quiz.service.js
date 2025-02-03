import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listAllQuizzes(kapottTipus) {
    console.log(kapottTipus);
    const data = await prisma.feladatok.findMany({
        where: {
            tipus: kapottTipus
        }
    }); 

    return data;
}