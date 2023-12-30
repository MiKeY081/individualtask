import { PrismaClient } from '@prisma/client'
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { userRouter } from './routes/route.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser';


config();
const prisma = new PrismaClient()
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://individualtask.vercel.app",
    credentials: true,
    secure: true
}))
app.use(morgan("dev"))


app.use("/api/v1", userRouter)

const server = app.listen(3000)