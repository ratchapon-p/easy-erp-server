

export const findUserExistsQuery = async(username,connection) => {

    try {
        const sql = `SELECT id,username,password FROM users WHERE username = ? LIMIT 1;`
        return await connection.query(sql, [username])
    } catch (error) {
        console.log('findUserExistsQuery Error',error);
    }
}


export const createUserQuery = async(data,connection) =>{
    try {
        const sql = `INSERT INTO users SET ?;`
     
         return await connection.query(sql, [data])
    }catch (error) {
        console.log('createUserQuery Error',error);
        
    }
}

export const getUsersQuery = async(connection) =>{
    try {
        const sql = `SELECT id,username,firstname,lastname FROM users ;`

        return await connection.query(sql, [])
    } catch (error) {
        console.log('getUsersQuery Error',error);
    }
}

export const getUserQuery = async(connection,id) =>{
    try {
        const sql = `SELECT username,firstname,lastname FROM users WHERE id = ?;`

        return await connection.query(sql, [id])
    } catch (error) {
        console.log('getUsersQuery Error',error);
    }
}

export const updatedUserQuery = async(connection,id,data) =>{
    try {

        const sql = `UPDATE users SET ? WHERE id = ?;`

        return await connection.query(sql, [data,id])
    } catch (error) {
        console.log('getUsersQuery Error',error);
    }
}
