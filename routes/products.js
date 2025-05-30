import express from 'express'
import { body, param } from 'express-validator'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { createProductCtrl, deleteProductCtrl, getProductByIdCtrl, getProductsCtrl, updateProductCtrl } from '../controllers/products.js'
const productRoutes = express.Router()

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


productRoutes.get("/", isLoggedIn,getProductsCtrl)
productRoutes.get("/:id",isLoggedIn,validateParamId, getProductByIdCtrl)
productRoutes.put("/:id",isLoggedIn,validateUpdateUser, updateProductCtrl)
productRoutes.post("/", isLoggedIn,validateCreateProduct,createProductCtrl)
productRoutes.delete("/:id", isLoggedIn,validateParamId,deleteProductCtrl)

export default productRoutes