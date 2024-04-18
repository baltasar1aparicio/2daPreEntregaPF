import jwt from 'jsonwebtoken'

export const generateToken = (user) => {

    /*
    Pasos para generar token
    1°: Objeto de asociacion del tokenn (usuario)
    2°: Clave privada del cifrado
    3°: Tiempo de expiracion
    */
    const token = jwt.sign({ user }, "coderhouse", {expiresIn: '12h'})
    return token
}