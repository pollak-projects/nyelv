import express from "express";
import { login, register } from "../service/auth.service.js";

const router = express.Router();


/**
 * @swagger
 * /getApiKey:
 *  post:
 *    summary: API kulcs generálása
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: integer
 *                description: Felhasználó azonosítója
 *                example: 1
 *    responses:
 *      200:
 *        description: Sikeres kulcs generálás
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Success
 */
router.post("/getApiKey", async (req, res) => {
  const { user_id } = req.body;
  const apiKey = await genAPIKey(user_id);

  res.status(200).json({
    message: "Success",
    key: apiKey,
  });
});


/**
 * @swagger
 * /register:
 *  post:
 *    summary: Regisztráció
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Felhasználónév
 *                example: johndoe
 *              first_name:
 *                type: string
 *                description: Keresztnév
 *                example: John
 *              last_name:
 *                type: string
 *                description: Vezetéknév
 *                example: Doe
 *              birth_date:
 *                type: string
 *                description: Születési dátum
 *                example: 1990-01-01
 *              email:
 *                type: string
 *                description: Email cím
 *                example: johndoe@example.com
 *              password:
 *                type: string
 *                description: Jelszó
 *                example: password
 *    responses:
 *      201:
 *        description: Sikeres adatbeillesztés
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Data successfully inserted
 *      409:
 *        description: Duplicált adat
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Duplicated data
 */

router.post("/register", async (req, res) => {
  const { username, first_name, last_name, birth_date, email, password } =
    req.body;
  try {
    const user = await register(
      username,
      first_name,
      last_name,
      birth_date,
      email,
      password
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/**
 * @swagger
 * /login:
 *  post:
 *    summary: Bejelentkezés
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Felhasználónév
 *                example: johndoe
 *              password:
 *                type: string
 *                description: Jelszó
 *                example: password
 *    responses:
 *      200:
 *        description: Sikeres bejelentkezés
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: johndoe
 *                access_token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MzI0NzQ1MjMsImV4cCI6MTYzMjQ3NzMyM30.2bY2dX1QoYJz4RzKf9wK8G4Zw6j0O8VY1dYJ1T2j1W4
 *                refresh_token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MzI0NzQ1MjMsImV4cCI6MTYzMjQ3NzMyM30.2bY2dX1QoYJz4RzKf9wK8G4Zw6j0O8VY1dYJ1T2j1W4
 *      400:
 *        description: Hibás bejelentkezési adatok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Hibás bejelentkezési adatok
 *      401:
 *        description: Hibás bejelentkezési adatok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Hibás bejelentkezési adatok
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);

    res.cookie("access_token", user.access_token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      httpOnly: false,
      domain: "localhost",
      path: "/", });
    res.cookie("refresh_token", user.refresh_token, { 
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
      secure: true,
      domain: "localhost",
      path: "/",
     });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


/**
 * @swagger
 * /logout:
 *  post:
 *    summary: Kijelentkezés
 *    responses:
 *      200:
 *        description: Sikeres kijelentkezés
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Sikeres kijelentkezés
 */
router.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    path: "/",
  });
  res.clearCookie("refresh_token", {
    path: "/",
  });
  res.status(200).json({ message: "Sikeres kijelentkezés" });
});



export { router };
