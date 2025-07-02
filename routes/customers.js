import express from 'express'
import { body, param, query } from 'express-validator'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import {  getCustomersCtrl,getCustomerByIdCtrl, createCustomerCtrl,getAllCustomersCtrl, updateCustomerCtrl, deleteCustomerCtrl } from '../controllers/customers.js'
const customerRoutes = express.Router()

const validateCreateCustomer = [
    body('customer_name').exists(),
    body('customer_contact_list').isArray(),
]


const validateUpdateCustomer = [
    param('id').isInt().toInt(),
    body('customer_name').optional({checkFalsy: true, nullable :true}),
    body('customer_contact_list').optional({checkFalsy: true, nullable :true}).isArray(),
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
customerRoutes.post("/", isLoggedIn,validateCreateCustomer,createCustomerCtrl)
customerRoutes.put("/:id",isLoggedIn,validateUpdateCustomer, updateCustomerCtrl)
customerRoutes.delete("/:id", isLoggedIn,validateParamId,deleteCustomerCtrl)

export default customerRoutes