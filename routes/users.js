import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkauth", verifyToken,(req, res, next) =>{
//     res.send("you are authenticated")
// })
// router.get("/checkuser/:id", verifyUser,(req, res, next) =>{
//     res.send("you are logged in and can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin,(req, res, next) =>{
//     res.send("hello admin, you are logged in and can delete this account")
// })
router.put("/:id",verifyUser, updateUser)
router.delete("/:id",verifyUser, deleteUser)
router.get("/:id",verifyUser, getUser)
router.get("/",verifyAdmin, getUsers)

export default router