

export const findCustomerExistsQuery = async(role_name,connection) => {

    try {
        const sql = `SELECT id FROM customers WHERE customer_name = ? AND deleted_at_utc IS NULL LIMIT 1;`
        return await connection.query(sql, [role_name])
    } catch (error) {
        console.log('findCustomerExistsQuery Error',error);
    }
}


export const createCustomerQuery = async(data,connection) =>{
    try {
        const sql = `INSERT INTO customers SET ?;`
     
         return await connection.query(sql, [data])
    }catch (error) {
        console.log('createCustomerQuery Error',error);
        
    }
}

export const createCustomerContactQuery = async(data,connection) =>{
    try {
        const sql = `INSERT INTO customer_contacts SET ?;`
     
         return await connection.query(sql, [data])
    }catch (error) {
        console.log('createCustomerContactQuery Error',error);
        
    }
}

export const getCustomersQuery = async(connection,filter_query, filter_params) =>{
    try {
        let parameters = []
        let sql = ` 
            SELECT
                *
            FROM(
                SELECT 
                    c.id AS 'key'
                    ,c.id
                    ,c.customer_name
                    ,c.company_name
                    ,c.updated_at_utc AS 'update_datetime'
                    ,c.updated_by
                    ,c.deleted_at_utc 
                    ,cc.contact_name
                    ,cc.position
                    ,cc.address
                    ,cc.phone_number
                    ,cc.email
                    ,cc.notes
                FROM customers c
                LEFT JOIN (
                    SELECT 
                        id
                        ,contact_name
                        ,position
                        ,address
                        ,phone_number
                        ,email
                        ,notes
                        ,customer_id
                    FROM customer_contacts
                    WHERE deleted_at_utc IS NULL
                )cc ON c.id = cc.customer_id
            ) u
        WHERE deleted_at_utc IS NULL
        `

        if (filter_query) {
            sql += filter_query
            parameters = filter_params
        }
        sql += ';'

        return await connection.query(sql, parameters)
    } catch (error) {
        console.log('getCustomersQuery Error',error);
    }
}

export const getAllCustomersQuery = async(connection) =>{
    try {
        const sql = `SELECT id AS 'key',id,role_name,role_access,updated_at_utc AS 'update_datetime',updated_by FROM customers WHERE deleted_at_utc IS NULL;`

        return await connection.query(sql, [])
    } catch (error) {
        console.log('getCustomersQuery Error',error);
    }
}

export const getCustomerQuery = async(connection,id) =>{
    try {
        const sql = `SELECT id,role_name,role_access,updated_at_utc FROM customers WHERE id = ? AND deleted_at_utc IS NULL;`

        return await connection.query(sql, [id])
    } catch (error) {
        console.log('getCustomersQuery Error',error);
    }
}

export const updatedCustomerQuery = async(connection,id,data) =>{
    try {

        const sql = `UPDATE customers SET ? WHERE id = ?;`

        return await connection.query(sql, [data,id])
    } catch (error) {
        console.log('getCustomersQuery Error',error);
    }
}

export const deleteCustomerQuery = async(connection,id,data) =>{
    try {

        const sql = `UPDATE customers SET ? WHERE id = ?;`

        return await connection.query(sql, [data,id])
    } catch (error) {
        console.log('getCustomersQuery Error',error);
    }
}
