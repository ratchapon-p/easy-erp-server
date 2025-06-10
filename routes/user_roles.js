import express from 'express'
import { body, param } from 'express-validator'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import {  getUserRolesCtrl } from '../controllers/user_roles.js'
const userRoleRoutes = express.Router()

const validateCreateProduct = [
    body('attribute_1').exists(),
    body('attribute_2').exists(),
    body('attribute_3').exists(),
    body('attribute_4').exists(),
    body('custom_barcode').exists(),
]


const validateUpdateUser = [
    param('id').isInt().toInt(),
    body('attribute_1').optional({checkFalsy: true, nullable :true}),
    body('attribute_2').optional({checkFalsy: true, nullable :true}),
    body('attribute_3').optional({checkFalsy: true, nullable :true}),
    body('attribute_4').optional({checkFalsy: true, nullable :true}),
    body('custom_barcode').optional({checkFalsy: true, nullable :true}),
]

const validateParamId = [
    param('id').exists().isInt().toInt()
]


userRoleRoutes.get("/", isLoggedIn,getUserRolesCtrl)
// userRoleRoutes.get("/:id",isLoggedIn,validateParamId, getProductByIdCtrl)
// userRoleRoutes.put("/:id",isLoggedIn,validateUpdateUser, updateProductCtrl)
// userRoleRoutes.post("/", isLoggedIn,validateCreateProduct,createProductCtrl)
// userRoleRoutes.delete("/:id", isLoggedIn,validateParamId,deleteProductCtrl)

export default userRoleRoutes