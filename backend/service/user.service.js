import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function listAllUsers() {
  const data = await prisma.user.findMany();

  return data;
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function getUSerData(id) {
  const user = await prisma.user.findUnique({
    where:{
      id: id
    },
  });

  return user;
}

export async function getUserProgress(userId) {
  console.log(userId);
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return data.user_current_progress;
}

export async function setUserProgress(userId, progress) {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      user_current_progress: progress,
    },
  });
}

export async function login(username, password) {
  const user = await prisma.user
    .findUnique({
      where: {
        username: username,
      },
    })
    .catch((err) => {
      console.error(err);
    });
  const isSucces = await bcrypt.compare(password, user.password);

  return isSucces ? user.id : null;
}

export async function addUser(username, password, email, birth_date) {
  const hashedPwd = await encrypt(password);
  await prisma.user
    .create({
      data: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        birth_date: new Date(birth_date),
        email: email,
        password: hashedPwd,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })
    .catch((err) => {
      console.error(err);
      throw new Error();
    });
}

export async function updateUser(id, username, email, isAdmin) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
      email: email,
      isAdmin: isAdmin,
    },
  });
}

export async function getUserLevel(userId) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return data.user_level;
}

export async function setUserLevel(userId, level) {
  const data = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      user_level: level,
      user_current_progress: 0,
    },
  });
}

export async function deleteUser(id) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

export async function getUserDailyWord(userId) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return data.diddailyword;
}

export async function setUserDailyWord(userId, word) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      diddailyword: new Date(),
    },
  });
}


export async function UpdateUserData(id, username, email, password, newPassword) {
  const user = await prisma.user
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch((err) => {
      console.error(err);
    });
  const isSucces = await bcrypt.compare(password, user.password);

  if (isSucces) {
    const hashedPwd = await encrypt(newPassword);
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        email: email,
        password: hashedPwd,
        updated_at: new Date(),
      },
    });
  } else { 
    return 'Hibás jelszó';
  }

}

export function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, Salt) => {
      bcrypt.hash(password, Salt, (err, hash) => {
        resolve(hash);
      });
    });
  });
}
