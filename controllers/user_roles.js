import asyncHandler from 'express-async-handler'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'

import { createUserRoleQuery, deleteUserRoleQuery, findUserRoleExistsQuery, getUserRoleQuery, getUserRolesQuery, updatedUserRoleQuery } from "../models/user_roles.js"
import {getConnection} from '../config/dbConnect2.js'
import { logger } from '../utils/logger.js';

dayjs.extend(utc);


export const createUserRoleCtrl = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const dateTimeNow = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    const connection = await getConnection()
    const userId = req.userAuthId
    const { attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode } = req.body
    try {
        
        
        const [findUserRole] = await findUserRoleExistsQuery(attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode,connection)
        if(findUserRole.length > 0){
            throw new Error("Role Exists!")
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
        //TODO: Create Role Here
        await createUserRoleQuery(data,connection)
        await connection.commit(); 
        res.status(201).json({
            message: 'Role Created Successfulluy',
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

//TODO: vvvvvv Below This Role For Check Only Not In UserRoleion vvvvvv

export const getUserRolesCtrl = asyncHandler(async(req,res) =>{
    const connection = await getConnection()
    try {
        const [products] = await getUserRolesQuery(connection)
        if(products.length < 1){
            throw new Error("No Roles found!")
        }
        res.status(200).json({
            data: products,
            message: "Get All UserRoles Successfully!",
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }
})

export const getUserRoleByIdCtrl = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const connection = await getConnection()
    const {id} = req.params
    try {
        const [product] = await getUserRoleQuery(connection,id)
        res.status(200).json({
            data: product,
            message: "Get Role Successfully!",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }

})

export const deleteUserRoleCtrl = asyncHandler(async(req,res) =>{
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

        const [productFound] = await getUserRoleQuery(connection,id)
        console.log(productFound,'<<productFound');
        if(!productFound.length){
            throw new Error("No products found!")
        }
        const [product] = await deleteUserRoleQuery(connection,id,data)
        res.status(200).json({
            message: "Delete Role Successfully!",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }

})

export const updateUserRoleCtrl = async(req,res) =>{
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
        const result = await updatedUserRoleQuery(connection,id,data) 
        console.log(result,'<<result');
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Role not found or no changes made',
                success: false
            });
        }
        else{
            res.status(200).json({
                status:'success',
                message:'Update Role Successfully',
                success: true
            })

        }

        await connection.commit(); 
    } catch (error) {
        console.log('Error updateUserRoleCtrl:',error);
        await connection.rollback(); 
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }

}