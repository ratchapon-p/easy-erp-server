

export const findUserRoleExistsQuery = async(attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode,connection) => {

    try {
        const sql = `SELECT id FROM user_roles WHERE attribute_1 = ? AND attribute_2 = ? AND attribute_3 = ? AND attribute_4 = ? AND custom_barcode = ? AND deleted_at_utc IS NULL LIMIT 1;`
        return await connection.query(sql, [attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode])
    } catch (error) {
        console.log('findUserRoleExistsQuery Error',error);
    }
}


export const createUserRoleQuery = async(data,connection) =>{
    try {
        const sql = `INSERT INTO user_roles SET ?;`
     
         return await connection.query(sql, [data])
    }catch (error) {
        console.log('createUserRoleQuery Error',error);
        
    }
}

export const getUserRolesQuery = async(connection) =>{
    try {
        const sql = `SELECT id AS 'key',id,role_name,updated_at_utc,updated_by FROM user_roles WHERE deleted_at_utc IS NULL;`

        return await connection.query(sql, [])
    } catch (error) {
        console.log('getUserRolesQuery Error',error);
    }
}

export const getUserRoleQuery = async(connection,id) =>{
    try {
        const sql = `SELECT id,attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode FROM user_roles WHERE id = ? AND deleted_at_utc IS NULL;`

        return await connection.query(sql, [id])
    } catch (error) {
        console.log('getUserRolesQuery Error',error);
    }
}

export const updatedUserRoleQuery = async(connection,id,data) =>{
    try {

        const sql = `UPDATE user_roles SET ? WHERE id = ?;`

        return await connection.query(sql, [data,id])
    } catch (error) {
        console.log('getUserRolesQuery Error',error);
    }
}

export const deleteUserRoleQuery = async(connection,id,data) =>{
    try {

        const sql = `UPDATE user_roles SET ? WHERE id = ?;`

        return await connection.query(sql, [data,id])
    } catch (error) {
        console.log('getUserRolesQuery Error',error);
    }
}
