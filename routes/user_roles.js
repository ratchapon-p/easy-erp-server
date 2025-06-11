import express from 'express'
import { body, param, query } from 'express-validator'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import {  getUserRolesCtrl,getUserRoleByIdCtrl, createUserRoleCtrl,getAllUserRolesCtrl, updateUserRoleCtrl, deleteUserRoleCtrl } from '../controllers/user_roles.js'
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

const validateGetAll = [
    query('limit').exists(),
    query('offSet').exists(),
    query('filterdata').exists(),
    query('searchText').exists(),
]

userRoleRoutes.get("/", isLoggedIn,validateGetAll,getUserRolesCtrl)
userRoleRoutes.get("/all", isLoggedIn,getAllUserRolesCtrl)
userRoleRoutes.get("/:id",isLoggedIn,validateParamId, getUserRoleByIdCtrl)
userRoleRoutes.post("/", isLoggedIn,validateCreateProduct,createUserRoleCtrl)
userRoleRoutes.put("/:id",isLoggedIn,validateUpdateUser, updateUserRoleCtrl)
userRoleRoutes.delete("/:id", isLoggedIn,validateParamId,deleteUserRoleCtrl)

export default userRoleRoutes