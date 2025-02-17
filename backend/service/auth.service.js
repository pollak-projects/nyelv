import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { encrypt } from "./user.service.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export function verifyJwt(access_token, refresh_token) {
  jwt.verify(
    access_token,
    "test",
    {
      algorithms: "HS512",
    },
    (err, decoded) => {
      console.log(decoded), console.log(err);
    }
  );
}

export async function register(
  username,
  first_name,
  last_name,
  birth_date,
  email,
  password
) {
  const pwdEncrypted = await encrypt(password);
  await prisma.user.create({
    data: {
      username: username,
      first_name: first_name,
      last_name: last_name,
      birth_date: new Date(birth_date),
      email: email,
      password: pwdEncrypted,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

export async function login(username, password) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return { message: "Hibás felhasználónév vagy jelszó" };
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return { message: "Hibás felhasználónév vagy jelszó" };
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
      email: user.email,
      level: user.user_level,
      isAdmin: user.isAdmin,
      user_current_progress: user.user_current_progress,
    },
    "test",
    {
      expiresIn: "5m",
      algorithm: "HS512",
    }
  );

  const refreshToken = jwt.sign(
    {
      sub: user.id,
    },
    "test",
    {
      expiresIn: "1h",
      algorithm: "HS512",
    }
  );

  return {
    access_token: token,
    refresh_token: refreshToken,
  };
}
