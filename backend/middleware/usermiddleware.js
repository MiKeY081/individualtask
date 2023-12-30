import jwt from "jsonwebtoken"
import { prisma } from "../config.js/prismaCongfig.js"

export const isSignIn  =  async( req, res ,next) => {
     try {
        const {token} = req.cookies
        const {id} = await jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await prisma.user.findUnique({where:{id}})
        req.user = user
        next()
     } catch (error) {
        res.send({
            success : false,
            message: error.message
        })

        
     }

}