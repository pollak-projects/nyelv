import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listAllQuizzes(kerdesSzama) {
    const kapottTipus = "beginner_beiros"+kerdesSzama;
    console.log(kapottTipus);
    const data = await prisma.feladatok.findMany({
        where: {
            tipus: kapottTipus
        }
    }); 

    return data;
}