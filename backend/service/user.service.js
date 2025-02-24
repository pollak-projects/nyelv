import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export async function listAllUsers() {
    const data = await prisma.user.findMany();

    return data;
}

export async function getUserProgress(username) {
    const data = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    return data.user_current_progress
}

export async function setUserProgress(username, progress) {
    await prisma.user.update({
        where: {
            username: username
        },
        data: {
            user_current_progress: progress
        }
    })
}

export async function login(username, password) {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    }).catch((err) => {
        console.error(err)
    })
    const isSucces = await bcrypt.compare(password, user.password)

    return isSucces ? user.id : null
}

export async function addUser(username, password, email, birth_date) {
    const hashedPwd = await encrypt(password)
    await prisma.user.create({
        data: {
            username: username,
            password: hashedPwd,
            email: email,
            birth_date: new Date(birth_date),
            created_at: new Date(),
            updated_at: new Date()
        }
    }).catch((err) => {
        console.error(err)
        throw new Error();
    })
}

export async function updateUser(id, password, email) {
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: password,
            email: email
        }
    })
}

export async function getUserLevel(username) {
    const data = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    return data.user_level
}

export async function deleteUser(id) {
    await prisma.user.delete({
        where: {
            id: id
        }
    })
}

export function encrypt(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, Salt)=>{
            bcrypt.hash(password, Salt, (err, hash)=>{
                resolve(hash)
            })
        })
    })
}
