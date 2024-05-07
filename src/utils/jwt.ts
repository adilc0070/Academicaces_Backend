import jwt, { JwtPayload } from 'jsonwebtoken'
import { IAdmin } from '../interfaces/adminInterface'
// import { }
const generateToken = (data: IAdmin): string => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined')
    const plainObject = data.toObject()
    return jwt.sign(plainObject, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }) 

}

const verifyToken = (token: string): JwtPayload => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined')
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded as JwtPayload
    }catch(error){
        console.log("token error",error);
        
        throw new Error('Invalid token')
    }
}

export {
    generateToken,
    verifyToken
}