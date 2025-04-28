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
  const data = await prisma.feladatokpair.findMany({
    where: {
      tipus: kapottTipus,
    },
  });

  return data;
}

export async function listAllQuizzesListening(kapottTipus) {
  const data = await prisma.feladatoklisteningaudio.findMany({
    where: {
      tipus: kapottTipus,
    },
  });

  return data;
}

export async function imageSaveToDB(image) {
  const imageBlob = Buffer.from(image, "base64");

  try {
    const result = await prisma.feladatokpairpictures.create({
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
  const data = await prisma.feladatokpairpictures.findMany({
    where: {
      tipus: kapottTipus,
    },
  });
  data.forEach((element) => {
    //console.log(element.image);
    let buffer = Buffer.from(element.image);
    element.image = "data:image/png" + ";base64," + buffer.toString("base64");
  });

  return data;
}

export async function listAllQuizPairImg(kapottTipus) {
  const data = await prisma.feladatokpairpictures.findMany({
    where: {
      tipus: kapottTipus,
    },
  });
  return data;
}

export async function GetDailyWords() {
  const data = await prisma.dailywords.findMany()

  return data
}


export async function AddWordToDB(word) {
  const data = await prisma.dailywords.create({
    data: {
      word: word,
      date: new Date(),
    },
  });
  return data
}

export async function GetLastDailyWord() {
  const data = await prisma.dailywords.findFirst({
    orderBy: {
      date: 'desc'
    }
  })
  return data
}