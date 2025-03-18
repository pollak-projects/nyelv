import express from "express";
import { Kuldes } from "../service/emailsender.js";
import { getUserByEmail } from "../service/user.service.js";

const router = express.Router();

router.post("/forgotpasswordmail", async (req, res) => {
  const { useremail } = req.body;

  try {
    const user = await getUserByEmail(useremail);

    if (user) {
      await Kuldes(useremail);
      res.status(200).json({
        message:
          "A jelszó visszaállító email sikeresen elküldve. Kérjük, ellenőrizd az email fiókodat.",
      });
    } else {
      res.status(400).json({ message: "Nem létezik a megadott email cím." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Nem sikerült az email küldés: üres a beviteli mező." });
  }
});

router.put("/updatepassword", async (req, res) => {
  const { useremail, password } = req.body;

  try {
    const user = await getUserByEmail(useremail);

    if (user) {
      await prisma.user.update({
        where: {
          email: useremail,
        },
        data: {
          password: password,
        },
      });
      res.status(200).json({ message: "Jelszó frissítve" });
    } else {
      res.status(400).json({ message: "Nem létezik ez az email cím" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Nem sikerült a jelszó frissítés: ", error });
  }
});

export { router };
