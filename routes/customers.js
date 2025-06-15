import express from 'express'
import { body, param, query } from 'express-validator'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import {  getCustomersCtrl,getCustomerByIdCtrl, createCustomerCtrl,getAllCustomersCtrl, updateCustomerCtrl, deleteCustomerCtrl } from '../controllers/customers.js'
const customerRoutes = express.Router()

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

customerRoutes.get("/", isLoggedIn,validateGetAll,getCustomersCtrl)
customerRoutes.get("/all", isLoggedIn,getAllCustomersCtrl)
customerRoutes.get("/:id",isLoggedIn,validateParamId, getCustomerByIdCtrl)
customerRoutes.post("/", isLoggedIn,validateCreateProduct,createCustomerCtrl)
customerRoutes.put("/:id",isLoggedIn,validateUpdateUser, updateCustomerCtrl)
customerRoutes.delete("/:id", isLoggedIn,validateParamId,deleteCustomerCtrl)

export default customerRoutes