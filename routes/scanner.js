import express from 'express'
import { body, param } from 'express-validator'
import { scanProductIn, scanProductOut } from '../controllers/scanner.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
const scannerRoutes = express.Router()

const validateScanner = [
    body('barcode').exists()
]

scannerRoutes.post("/scanin", isLoggedIn,validateScanner,scanProductIn)
scannerRoutes.post("/scanout",isLoggedIn,validateScanner, scanProductOut)


export default scannerRoutes