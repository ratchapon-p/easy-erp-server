import express from 'express'
import { body, param } from 'express-validator'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import {  getUserRolesCtrl,getUserRoleByIdCtrl, createUserRoleCtrl, updateUserRoleCtrl, deleteUserRoleCtrl } from '../controllers/user_roles.js'
const userRoleRoutes = express.Router()

const validateCreateProduct = [
    body('role_name').exists(),
    body('role_access').exists(),
]


const validateUpdateUser = [
    param('id').isInt().toInt(),
    body('role_name').optional({checkFalsy: true, nullable :true}),
    body('role_access').optional({checkFalsy: true, nullable :true}).isObject(),
]

const validateParamId = [
    param('id').exists().isInt().toInt()
]


userRoleRoutes.get("/", isLoggedIn,getUserRolesCtrl)
userRoleRoutes.get("/:id",isLoggedIn,validateParamId, getUserRoleByIdCtrl)
userRoleRoutes.post("/", isLoggedIn,validateCreateProduct,createUserRoleCtrl)
userRoleRoutes.put("/:id",isLoggedIn,validateUpdateUser, updateUserRoleCtrl)
userRoleRoutes.delete("/:id", isLoggedIn,validateParamId,deleteUserRoleCtrl)

export default userRoleRoutes