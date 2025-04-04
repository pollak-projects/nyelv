import express from 'express'
import { listAllUsers, addUser, deleteUser, updateUser, getUserProgress, setUserProgress, getUserLevel, setUserLevel, UpdateUserData, getUSerData} from '../service/user.service.js';

const router = express.Router();

/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: Összes felhasználó kilistázása
 *     responses:
 *       200:
 *         description: Összes felhasználó
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: User id.
 *                     example: 1
 *                   username:
 *                     type: string
 *                     description: User felhasználóneve.
 *                     example: johndoe
 *                   first_name:
 *                     type: string
 *                     description: User keresztneve.
 *                     example: John
 *                   last_name:
 *                     type: string
 *                     description: User vezetékneve.
 *                     example: Doe
 *                   birth_date:
 *                     type: string
 *                     format: date
 *                     description: User születési dátuma.
 *                     example: 1990-01-01
 *                   email:
 *                     type: string
 *                     description: User email címe.
 *                     example: johndoe@example.com
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: User létrehozásának dátuma.
 *                     example: 2021-01-01T12:00:00Z
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: User frissítésének dátuma.
 *                     example: 2021-01-01T12:00:00Z
 */
router.get("/getAll", async (req, res) => {
    const data = await listAllUsers();
    res.status(200).json(data);
})

router.get("/getUserData", async (req, res) => {
    const userId = req.query.userId;
    const data = await getUSerData(userId);
    res.status(200).json(data);
})


router.get("/getProgress", async (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    const data = await getUserProgress(userId);
    res.status(200).json(data);
})

router.get("/getUserLevel", async (req, res) => {
    const userId = req.query.userId;
    const data = await getUserLevel(userId);
    res.status(200).json(data);
})

router.put("/updateUserData", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;
    const newPassword = req.query.newpassword;
    const data = await UpdateUserData(userId, username, email, password, newPassword);
    res.status(200).json(data);
})

router.put("/setProgress", async (req, res) => {
    const userId = req.query.userId;
    const progress = Number(req.query.progress);
    await setUserProgress(userId, progress);
    res.status(200).json({
        message: "Data successfully updated"
    })

})

router.put("/setUserLevel", async (req, res) => {
  const userId = req.query.userId;
  const level = req.query.level;
  const progress = Number(req.query.progress);
  await setUserLevel(userId, level, progress);
  res.status(200).json({
    message: "Data successfully updated",
  });
});


/** 
 * @swagger
 * /add:
 *   post:
 *     summary: Új felhasználó hozzáadása
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User felhasználóneve.
 *                 example: johndoe
 *               first_name:
 *                 type: string
 *                 description: User keresztneve.
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: User vezetékneve.
 *                 example: Doe
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: User születési dátuma.
 *                 example: 1990-01-01
 *               email:
 *                 type: string
 *                 description: User email címe.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User jelszava.
 *                 example: password
 *     responses:
 *       201:
 *         description: Sikeres adatbeillesztés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data successfully inserted
 *       409:
 *         description: Duplicált adat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Duplicated data
 */
router.post("/add", async (req, res) => {
    const { username, first_name, last_name, birth_date, email, password } = req.body;

    await addUser(username, first_name, last_name, birth_date, email, password).then(() => {
        res.status(201).json({
            message: "Data successfully inserted"
        })
    }).catch(() => {
        res.status(409).json({
            message: "Duplicated data"
        })
    })
})

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Felhasználó törlése
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Felhasználó azonosítója
 *     responses:
 *       204:
 *         description: Sikeres törlés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data successfully deleted
 */
router.delete("/delete", async (req, res) => {
    const id = Number(req.query.id);

    await deleteUser(id);

    res.status(204).json({
        message: "Data successfully deleted"
    })
})

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Felhasználó adatainak frissítése
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Felhasználó azonosítója
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: User jelszava.
 *                 example: password
 *               email:
 *                 type: string
 *                 description: User email címe.
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data successfully updated
 */
router.put("/update", async (req, res) => {
    const id = Number(req.query.id);
    const { username, email, isAdmin } = req.body;

    await updateUser(id, username, email, isAdmin);

    res.status(200).json({
        message: "Data successfully updated"
    })
})



export { router };
