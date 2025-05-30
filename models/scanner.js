

export const findProductByBarcode = async(custom_barcode,connection) => {

    try {
        const sql = `SELECT id,total FROM products WHERE custom_barcode = ? LIMIT 1;`
        return await connection.query(sql, [custom_barcode])
    } catch (error) {
        console.log('findProductBarcodeQuery Error',error);
    }
}


export const scanProductQuery = async(data,id,connection) =>{
    try {
        const sql = `UPDATE products SET ? WHERE id = ?;`
     
         return await connection.query(sql, [data,id])
    }catch (error) {
        console.log('createUserQuery Error',error);
        
    }
}

export const InsertProductToStock = async(connection,data) =>{
    try {
        const sql = `Insert INTO product_stock SET ? ;`

        return await connection.query(sql, [data])
    } catch (error) {
        console.log('getUsersQuery Error',error);
    }
}

export const saveProductToStock = async(connection,data) =>{
    try {
        const sql = `UPDATE product_stock SET ? WHERE send_at_utc IS NULL LIMIT 1;`

        return await connection.query(sql, [data])
    } catch (error) {
        console.log('getUsersQuery Error',error);
    }
}
