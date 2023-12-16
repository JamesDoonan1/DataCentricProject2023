// models/mysqlModel.js
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2023',
});

const query = util.promisify(connection.query).bind(connection);

async function getAllStores() {
    try {
        const results = await query('SELECT * FROM store');
        return results;
    } catch (error) {
        console.error('Error in getAllStores:', error);
        throw error;
    }
}

async function addStore(storeData) {
    const { sid, location, mgrid } = storeData;
    const queryStr = 'INSERT INTO store (sid, location, mgrid) VALUES (?, ?, ?)';
    const values = [sid, location, mgrid];

    try {
        await query(queryStr, values);
    } catch (error) {
        console.error('Error in addStore:', error);
        console.error('MySQL Error:', error.sqlMessage);
        throw error;
    }
}


async function getStoreById(storeId) {
    try {
        const results = await query('SELECT * FROM store WHERE sid = ?', [storeId]);
        return results.length ? results[0] : null;
    } catch (error) {
        console.error('Error in getStoreById:', error);
        throw error;
    }
}

async function updateStore(storeId, data) {
    const sql = 'UPDATE store SET location = ?, mgrid = ? WHERE sid = ?';
    const values = [data.location, data.mgrid, storeId];

    try {
        await query(sql, values);
        return { success: true, message: 'Store updated successfully' };
    } catch (error) {
        console.error('Error updating store:', error);
        throw error;
    }
}

async function getAllProducts() {
    const sql = `
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

    try {
        const results = await query(sql);
        return results;
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        throw error;
    }
}

async function deleteProduct(pid) {
    try {
        await query('START TRANSACTION');
        await query('DELETE FROM product_store WHERE pid = ?', [pid]);
        const results = await query('DELETE FROM product WHERE pid = ?', [pid]);
        await query('COMMIT');
        return results;
    } catch (error) {
        await query('ROLLBACK');
        throw error;
    }
}

module.exports = {
    getAllStores,
    addStore,
    getStoreById,
    updateStore,
    getAllProducts,
    deleteProduct,
    // Add other exported functions here
};
