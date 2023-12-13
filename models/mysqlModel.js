// models/mysqlModel.js
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2023',
});



async function getAllStores() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM store', (error, results, fields) => {
            if (error) {
                console.error('Error in getAllStores:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function addStore(location, managerId) {
    try {
        // Perform the SQL query to insert a new store
        const [result] = await connection.query('INSERT INTO store (location, mgrid) VALUES (?, ?)', [location, managerId]);

        // Log the result to inspect its structure
        console.log('Query Result:', result);

        // Check if the result array is not empty
        if (result && result.length > 0) {
            // Retrieve the inserted ID separately
            const insertedId = result.insertId;

            // Return the newly added store or any other relevant information
            // (e.g., you might want to return the store ID)
            // Note: This depends on your specific use case and requirements.
            return { success: true, message: 'Store added successfully', insertedId };
        } else {
            // Handle the case where the result array is empty
            console.error('Error adding store: Empty result array');
            return { success: false, message: 'Error adding store: Empty result array' };
        }
    } catch (error) {
        console.error('Error adding store:', error.message);
        throw error;
    }
}

async function getStoreById(storeId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM store WHERE sid = ?', [storeId], (error, results, fields) => {
            if (error) {
                console.error('Error in getStoreById:', error);
                reject(error);
            } else {
                // Return the first result (should be only one) or null if not found
                resolve(results.length ? results[0] : null);
            }
        });
    });
}

async function updateStore(storeId, data) {
    try {
        // Perform the SQL query to update the store
        await connection.query('UPDATE store SET location = ?, mgrid = ? WHERE sid = ?', [data.location, data.mgrid, storeId]);

        // Return any relevant information about the update
        return { success: true, message: 'Store updated successfully' };
    } catch (error) {
        console.error('Error updating store:', error.message);
        throw error;
    }
}
async function getAllProducts() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                p.pid AS productId,
                p.productdesc AS productDescription,
                s.sid AS storeId,
                s.location,
                ps.price
            FROM
                product p
            JOIN
                product_store ps ON p.pid = ps.pid
            JOIN
                store s ON ps.sid = s.sid;
        `;

        connection.query(query, (error, results, fields) => {
            if (error) {
                console.error('Error in getAllProducts:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
const query = util.promisify(connection.query).bind(connection);

async function deleteProduct(pid) {
    try {
        await query('START TRANSACTION'); // Start a transaction

        // Delete from the product_store table
        await query('DELETE FROM product_store WHERE pid = ?', [pid]);

        // Delete from the products table
        const results = await query('DELETE FROM product WHERE pid = ?', [pid]);

        await query('COMMIT'); // Commit the transaction

        return results;
    } catch (error) {
        await query('ROLLBACK'); // Rollback the transaction in case of an error
        throw error;
    }
}




module.exports = {
    getAllStores,
    addStore,
    getStoreById,
    updateStore,
    getAllProducts,
    deleteProduct
    // Add other exported functions here
};
