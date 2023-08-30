import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
           ...req.body,
            password: hash,
        })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "user not found"))
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) return next(createError(400, "wrong password or email"))
        const token = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...others } = user._doc
        res.cookie("access_token", token,{
            httpOnly:true,
        })
        .status(201).json({ details:{...others}, isAdmin })
    } catch (error) {
        next(error)
    }
}