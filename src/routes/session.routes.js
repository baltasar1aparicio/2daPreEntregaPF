import { Router } from "express";
import { userModel } from "../models/user.js";

const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email: email }).lean()
        if (user && password == user.password) {
            req.session.email = email
            if (user.rol === "Admin") {
                req.session.admin = true
                res.status(200).send("Usuario Admin logueado correctamente")

            } else {
                res.status(200).send("Usuario logueado")
            }
        } else {
            res.status(401).send("Usuario o contraseña no validos")
        }
    } catch (e) {
        res.status(500).send("Error de login")
    }
})

sessionRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, edad, password, age, rol } = req.body
        const findUser = await userModel.findOne({ email: email })
        if (findUser) {
            res.status(400).send("Ya existe un usuario con ese email")
        } else {
            const resultado = await userModel.create({ first_name, last_name, email, edad, password, age, rol })
            res.status(200).send(`Usuario creado correctamente`)
        }
    }
    catch (e) {
        res.status(500).send(`Error al crear usuario ${e}`)
    }
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).redirect("/")
    })
})

export default sessionRouter