import asyncHandler from 'express-async-handler'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js';
import { validationResult } from 'express-validator';
import { createProductQuery, deleteProductQuery, findProductExistsQuery, getProductQuery, getProductsQuery, updatedProductQuery } from "../models/products.js"
import {getConnection} from '../config/dbConnect2.js'
import { searchAndFilterQuery } from '../utils/searchAndFilterQuery.js';

dayjs.extend(utc);


export const createProductCtrl = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const dateTimeNow = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    const connection = await getConnection()
    const userId = req.userAuthId
    const { attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode } = req.body
    try {
        
        
        const [findProduct] = await findProductExistsQuery(attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode,connection)
        if(findProduct.length > 0){
            throw new Error("Product Exists!")
        }

        const data = {
            attribute_1,
            attribute_2,
            attribute_3,
            attribute_4,
            custom_barcode,
            updated_by: userId,
            created_at_utc: dateTimeNow,
            updated_at_utc: dateTimeNow,
        }
        //TODO: Create Product Here
        await createProductQuery(data,connection)
        await connection.commit(); 
        res.status(201).json({
            message: 'Product Created Successfulluy',
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

//TODO: vvvvvv Below This Product For Check Only Not In Production vvvvvv

export const getProductsCtrl = asyncHandler(async(req,res) =>{
    const connection = await getConnection()
    let filterData = {};
    let searchText = {};
    const limit = parseInt(req.query.limit) || 50;
    const offSet = parseInt(req.query.offSet) || 0;
    const tz = req.query.tz || '+07:00';
    filterData = JSON.parse(req.query.filterdata);
    searchText = JSON.parse(req.query.searchText);
    const filter = searchAndFilterQuery({limit,offSet,tz,filterData,searchText})
    
    try {
        const [products] = await getProductsQuery(connection,filter.query,filter.params)
        
        if(products.length < 1){
            return res.status(404).json({
                data: [],
                message: "No products found!",
                success: false
            })
        }
        return res.status(200).json({
            data: products,
            message: "Get All Products Successfully!",
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }
})

export const getProductByIdCtrl = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const connection = await getConnection()
    const {id} = req.params
    try {
        const [product] = await getProductQuery(connection,id)
        res.status(200).json({
            data: product,
            message: "Get Product Successfully!",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }

})

export const deleteProductCtrl = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const connection = await getConnection()
    const {id} = req.params
    const dateTimeNow = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    const data = {
        deleted_at_utc: dateTimeNow
    }
    try {

        const [productFound] = await getProductQuery(connection,id)
        console.log(productFound,'<<productFound');
        if(!productFound.length){
            throw new Error("No products found!")
        }
        const [product] = await deleteProductQuery(connection,id,data)
        res.status(200).json({
            message: "Delete Product Successfully!",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }

})

export const updateProductCtrl = async(req,res) =>{
    const dateTimeNow = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const connection = await getConnection()
    const {attribute_1, attribute_2,attribute_3,attribute_4,custom_barcode} = req.body
    const {id} = req.params

    try {
        const data = {
            attribute_1:attribute_1 || null,
            attribute_2: attribute_2 || null,
            attribute_3: attribute_3 || null,
            attribute_4: attribute_4 || null,
            custom_barcode: custom_barcode || null,
            updated_at_utc: dateTimeNow,
        }
        const result = await updatedProductQuery(connection,id,data) 
        console.log(result,'<<result');
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found or no changes made',
                success: false
            });
        }
        else{
            res.status(200).json({
                status:'success',
                message:'Update Product Successfully',
                success: true
            })

        }

        await connection.commit(); 
    } catch (error) {
        console.log('Error updateProductCtrl:',error);
        await connection.rollback(); 
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }

}