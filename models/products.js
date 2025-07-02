

export const findProductExistsQuery = async(attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode,connection) => {

    try {
        const sql = `SELECT id FROM products WHERE attribute_1 = ? AND attribute_2 = ? AND attribute_3 = ? AND attribute_4 = ? AND custom_barcode = ? AND deleted_at_utc IS NULL LIMIT 1;`
        return await connection.query(sql, [attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode])
    } catch (error) {
        console.log('findProductExistsQuery Error',error);
    }
}


export const createProductQuery = async(data,connection) =>{
    try {
        const sql = `INSERT INTO products SET ?;`
     
         return await connection.query(sql, [data])
    }catch (error) {
        console.log('createProductQuery Error',error);
        
    }
}

export const getProductsQuery = async(connection,filter_query, filter_params) =>{
    try {
        let parameters = []
        let sql = `
            SELECT
                *
            FROM (
                SELECT id AS 'key',id,attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode,total,deleted_at_utc FROM products 
            ) p
            WHERE deleted_at_utc IS NULL
        `

        if (filter_query) {
            sql += filter_query
            parameters = filter_params
        }
        sql += ';'
        
        return await connection.query(sql, parameters)
    } catch (error) {
        console.log('getProductsQuery Error',error);
    }
}

export const getProductQuery = async(connection,id) =>{
    try {
        const sql = `SELECT id,attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode FROM products WHERE id = ? AND deleted_at_utc IS NULL;`

        return await connection.query(sql, [id])
    } catch (error) {
        console.log('getProductsQuery Error',error);
    }
}

export const updatedProductQuery = async(connection,id,data) =>{
    try {

        const sql = `UPDATE products SET ? WHERE id = ?;`

        return await connection.query(sql, [data,id])
    } catch (error) {
        console.log('getProductsQuery Error',error);
    }
}

export const deleteProductQuery = async(connection,id,data) =>{
    try {
        
        const sql = `UPDATE products SET ? WHERE id = ?;`
        
        return await connection.query(sql, [data,id])
    } catch (error) {
        console.log('getProductsQuery Error',error);
    }
}

export const getStockBalanceDashboardQuery = async(connection,year) =>{
    try {

        const sql = `WITH months AS (
            SELECT 1 AS month_num UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
            SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
            SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
            SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
        ),
        received AS (
            SELECT
                MONTH(received_at_utc) AS month_received,
                SUM(item_per_barcode) AS total_receive
            FROM product_stock
            WHERE 
                received_at_utc IS NOT NULL AND
                YEAR(received_at_utc) = ?
            GROUP BY MONTH(received_at_utc)
        ),
        sended AS (
            SELECT
                MONTH(send_at_utc) AS month_sended,
                SUM(item_per_barcode) AS total_sended
            FROM product_stock
            WHERE 
                send_at_utc IS NOT NULL AND
                YEAR(send_at_utc) = ?
            GROUP BY MONTH(send_at_utc)
        )
        SELECT
            m.month_num,
            COALESCE(r.total_receive, 0) AS total_receive,
            COALESCE(s.total_sended, 0) AS total_sended
        FROM months m
        LEFT JOIN received r ON m.month_num = r.month_received
        LEFT JOIN sended s ON m.month_num = s.month_sended
        ORDER BY m.month_num; `

        return await connection.query(sql, [year,year])
    } catch (error) {
        console.log('getProductsQuery Error',error);
    }
}
