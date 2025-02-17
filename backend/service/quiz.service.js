import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllQuizzes(kapottTipus) {
  const data = await prisma.feladatok.findMany({
    where: {
      tipus: kapottTipus,
    },
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

export async function listAllQuizzesListening(kapottTipus) {
  const data = await prisma.feladatokListeningAudio.findMany({
    where: {
      tipus: kapottTipus,
    },
  });

  return data;
}

export async function imageSaveToDB(image) {
  const imageBlob = Buffer.from(image, "base64");

  try {
    const result = await prisma.feladatokPairPictures.create({
      data: {
        image: imageBlob,
        text: "PLACEHOLDER",
      },
    });
    return result;
  } catch (error) {
    console.error("Error in imageDBSave: ", error);
  }
}

export async function imageGetFromDB(kapottTipus) {
  const data = await prisma.feladatokPairPictures.findMany({
    where: {
      tipus: kapottTipus,
    },
  });
  data.forEach((element) => {
    console.log(element.image);
    let buffer = Buffer.from(element.image);
    element.image = "data:image/png" + ";base64," + buffer.toString("base64");
  });

  return data;
}

export async function listAllQuizPairImg(kapottTipus) {
  const data = await prisma.feladatokPairPictures.findMany({
    where: {
      tipus: kapottTipus,
    },
  });
  return data;
}
