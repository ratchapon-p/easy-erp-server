import express from 'express'
import { body, param } from 'express-validator'
import { getUserByIdCtrl, getUsersCtrl, loginUserCtrl, registerUserCtrl, updateUserCtrl } from '../controllers/users.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
const userRoutes = express.Router()

const validateRegistration = [
    body('username').exists(),
    body('firstname').exists(),
    body('lastname').exists(),
    body('password').exists(),
    body('role').isInt().toInt()
]

const validateLogin = [
    body('username').exists(),
    body('password').exists(),
]

const validateUpdateUser = [
    param('id').isInt().toInt(),
    body('username').optional({checkFalsy: true, nullable :true}),
    body('password').optional({checkFalsy: true, nullable :true}),
    body('firstname').optional({checkFalsy: true, nullable :true}),
    body('lastname').optional({checkFalsy: true, nullable :true}),
    body('role_id').optional({checkFalsy: true, nullable :true}).isInt().toInt(),
]

const validateParamId = [
    param('id').exists()
]


userRoutes.get("/", isLoggedIn,getUsersCtrl)
userRoutes.get("/:id",isLoggedIn,validateParamId, getUserByIdCtrl)
userRoutes.put("/:id",isLoggedIn,validateUpdateUser, updateUserCtrl)
userRoutes.post("/register", validateRegistration,registerUserCtrl)
userRoutes.post("/login", validateLogin,loginUserCtrl)

export default userRoutes