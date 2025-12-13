import { Router } from 'express';
import usersModel from "../dataBase/users.model.js";
import { createHash } from '../utils.js';

const router = Router();

//Ruta de inicio de sesión
router.get('/', (req, res) => {
    res.render('home', {
        title: "LOGGIN",
    }
    )
});

//Ruta para crear usuarios
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart, role } = req.body;
        const newUser = await usersModel.create({
            first_name, last_name, email, age,
            password: createHash(password), cart, role
        });
        res.status(201).json({ status: "ok", payload: newUser });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});

export default router;