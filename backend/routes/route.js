import express from "express"
import { deleteUser, updateUser, userLogin, userRegister } from "../controller/userController.js"
import { isSignIn } from "../middleware/usermiddleware.js"
import { createTask, deleteTask, getTask, updateTask } from "../controller/taskController.js"

const router = express.Router()

router.post("/user/login", userLogin)
router.post("/user/register", userRegister)
router.put("/user/update", isSignIn, updateUser)
router.delete("/user/:id", deleteUser)

router.get("/home", isSignIn, getTask)
router.post("/createtask", isSignIn, createTask)
router.delete("/deletetask/:id", isSignIn, deleteTask)
router.put("/updatetask/:id", isSignIn, updateTask)

export {router as userRouter}