

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

export const getProductsQuery = async(connection) =>{
    try {
        const sql = `SELECT id AS 'key',id,attribute_1,attribute_2,attribute_3,attribute_4,custom_barcode,total FROM products WHERE deleted_at_utc IS NULL;`

        return await connection.query(sql, [])
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
