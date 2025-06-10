import asyncHandler from 'express-async-handler'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js';
import { validationResult } from 'express-validator';

import { InsertProductToStock, findProductByBarcode, saveProductToStock, scanProductQuery } from "../models/scanner.js"
import {getConnection} from '../config/dbConnect2.js'
import { getSocketIO } from '../sockets/socket.js';

dayjs.extend(utc);


export const scanProductIn = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.userAuthId
    const dateTimeNow = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    const connection = await getConnection()
    const { barcode } = req.body
    try {
        
        const [findProduct] = await findProductByBarcode(barcode,connection)
        
        if(!findProduct.length){
            throw new Error("Product Barcode Not!")
        }
        const barcode_product = findProduct[0]
        const total_product = barcode_product.total ? barcode_product.total : 0
        const data = {
            id: barcode_product.id,
            total: total_product + 1
        }

        //TODO: Create User Here
        await scanProductQuery(data,barcode_product.id,connection)

        const dataProductScan = {
            product_id: barcode_product.id,
            item_per_barcode: 1,
            updated_by: userId,
            receive_by: userId,
            received_at_utc: dateTimeNow
        }

        await InsertProductToStock(connection, dataProductScan)

        await connection.commit(); 

        const io = getSocketIO();
        if(io){
            io.emit('notification',{
                message: `New Receive Product at ${dateTimeNow}`,
                type: 'receive'
            })
        }
 
        res.status(200).json({
            message: 'Product Scanned',
            success: true
        })
        
    } catch (error) {
        await connection.rollback(); 
        res.status(500).json({ message: error.message,success: false });
    }
    finally{
        connection.release();
    }

})


export const scanProductOut = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.userAuthId

    const dateTimeNow = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    const connection = await getConnection()
    const { barcode } = req.body
    try {
        
        const [findProduct] = await findProductByBarcode(barcode,connection)
        
        if(!findProduct.length){
            throw new Error("Product Barcode Not!")
        }
        const barcode_product = findProduct[0]
        const total_product = barcode_product.total ? barcode_product.total : 0

        if(!total_product){
            throw new Error("Not enough product to scan!")
        }

        const data = {
            id: barcode_product.id,
            total: total_product - 1
        }

        //TODO: Create User Here
        await scanProductQuery(data,barcode_product.id,connection)

        const dataProductScan = {
            product_id: barcode_product.id,
            item_per_barcode: 1,
            scan_by: userId,
            updated_by: userId,
            send_at_utc: dateTimeNow
        }
        await saveProductToStock(connection, dataProductScan)
        await connection.commit(); 
        res.status(200).json({
            message: 'Product Scanned',
            success: true
        })
        
    } catch (error) {
        await connection.rollback(); 
        res.status(500).json({ message: error.message,success: false });
    }
    finally{
        connection.release();
    }
})
