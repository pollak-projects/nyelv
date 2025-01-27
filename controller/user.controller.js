import express from 'express'
import { listAllUsers, addUser, deleteUser, updateUser } from '../service/user.service.js';

const router = express.Router();

router.get("/getAll", async (req, res) => {
    const data = await listAllUsers();
    res.status(200).json(data);
})

router.post("/add", async (req, res) => {
    const { username, password, email, birth_date } = req.body;

    await addUser(username, password, email, birth_date).then(() => {
        res.status(201).json({
            message: "Data successfully inserted"
        })
    }).catch(() => {
        res.status(409).json({
            message: "Duplicated data"
        })
    })
})

router.delete("/delete", async (req, res) => {
    const id = Number(req.query.id);

    await deleteUser(id);

    res.status(204).json({
        message: "Data successfully deleted"
    })
})

router.put("/update", async (req, res) =>{
    const id = Number(req.query.id);
    const { password, email } = req.body;

    await updateUser(id, password, email);

    res.status(200).json({
        message: "Data successfully updated"
    })
})

export { router };