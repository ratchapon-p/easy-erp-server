

export const findUserRoleExistsQuery = async(role_name,connection) => {

    try {
        const sql = `SELECT id FROM user_roles WHERE role_name = ? AND deleted_at_utc IS NULL LIMIT 1;`
        return await connection.query(sql, [role_name])
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
        const sql = `SELECT id AS 'key',id,role_name,role_access,updated_at_utc AS 'update_datetime',updated_by FROM user_roles WHERE deleted_at_utc IS NULL;`

        return await connection.query(sql, [])
    } catch (error) {
        console.log('getUserRolesQuery Error',error);
    }
}

export const getUserRoleQuery = async(connection,id) =>{
    try {
        const sql = `SELECT id,role_name,role_access,updated_at_utc FROM user_roles WHERE id = ? AND deleted_at_utc IS NULL;`

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
