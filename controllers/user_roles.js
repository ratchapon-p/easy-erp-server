import asyncHandler from 'express-async-handler'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js';
import { validationResult } from 'express-validator';
import { createUserRoleQuery, deleteUserRoleQuery, findUserRoleExistsQuery, getAllUserRolesQuery, getUserRoleQuery, getUserRolesQuery, updatedUserRoleQuery } from "../models/user_roles.js"
import {getConnection} from '../config/dbConnect2.js'
import { searchAndFilterQuery } from '../utils/searchAndFilterQuery.js';

dayjs.extend(utc);


export const createUserRoleCtrl = asyncHandler(async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const dateTimeNow = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    const connection = await getConnection()
    const userId = req.userAuthId
    const { role_name,role_access } = req.body
    try {
        
        
        const [findUserRole] = await findUserRoleExistsQuery(role_name,connection)
        if(findUserRole.length > 0){
            throw new Error("Role Exists!")
        }
        const paresRoleAccess = JSON.stringify(role_access)
        const data = {
            role_name,
            role_access: paresRoleAccess,
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
    let filterData = {};
    let searchText = {};
    const limit = parseInt(req.query.limit) || 50;
    const offSet = parseInt(req.query.offSet) || 0;
    const tz = req.query.tz || '+07:00';
    filterData = JSON.parse(req.query.filterdata);
    searchText = JSON.parse(req.query.searchText);
    const filter = searchAndFilterQuery({limit,offSet,tz,filterData,searchText})
    try {
        const [roles] = await getUserRolesQuery(connection,filter.query,filter.params)
        if(roles.length < 1){
            throw new Error("No Roles found!")
        }

        const formattedRoles = roles.map(role => ({
            ...role,
            update_datetime: dayjs(role.update_datetime).format('DD MMMM YYYY '),
            role_access: JSON.parse(role.role_access),
        }));
        
        res.status(200).json({
            data: formattedRoles,
            message: "Get All UserRoles Successfully!",
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: error.message,success: false });
    }finally{
        connection.release();
    }
})

export const getAllUserRolesCtrl = asyncHandler(async(req,res) =>{
    const connection = await getConnection()
    try {
        const [roles] = await getAllUserRolesQuery(connection)
        if(roles.length < 1){
            throw new Error("No Roles found!")
        }

        const formattedRoles = roles.map(role => ({
            ...role,
            // role_access: JSON.parse(role.role_access),
        }));
        
        res.status(200).json({
            data: formattedRoles,
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
        const [role] = await getUserRoleQuery(connection,id)
        role[0].role_access = JSON.parse(role[0].role_access);

        res.status(200).json({
            data: role,
            message: "Get Role Successfully!",
            success: true
        })
        
    } catch (error) {
        console.log("Error",error);
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
    const userId = req.userAuthId
    const data = {
        deleted_at_utc: dateTimeNow,
        updated_by: userId
    }
    try {

        const [userRoleFound] = await getUserRoleQuery(connection,id)
        if(!userRoleFound.length){
            throw new Error("No userRoles found!")
        }
        const [userRole] = await deleteUserRoleQuery(connection,id,data)
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
    const userId = req.userAuthId
    const connection = await getConnection()
    const {role_name,role_access} = req.body
    const {id} = req.params
    const paresRoleAccess = JSON.stringify(role_access)
    try {
        const data = {
            role_name,
            role_access: paresRoleAccess,
            updated_by: userId,
            updated_at_utc: dateTimeNow,
        }
        const result = await updatedUserRoleQuery(connection,id,data) 
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