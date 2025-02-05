import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listAllQuizzes(kapottTipus) {
    const data = await prisma.feladatok.findMany({
        where: {
            tipus: kapottTipus
        }
    }); 

    return data;
}

export async function listAllQuizzesPair(kapottTipus) {
  const data = await prisma.feladatokPair.findMany({
    where: {
      tipus: kapottTipus,
    },
  });

  return data;
}

export async function listAllQuizPair(kapottSzo) {
  const data = await prisma.feladatokPair.findUnique({
    where: {
      magyar_par: kapottSzo,
    },
  });

  return data.angol_par;


}

export async function imageSaveToDB(image) {
  const imageBlob = Buffer.from(image, "base64")

  try{
    const result = await prisma.pictures.create({
      data:{
        image: imageBlob
      }
    })
    return result
  } catch(error ){
    console.error("Error in imageDBSave: ",error)   
  }
  
}