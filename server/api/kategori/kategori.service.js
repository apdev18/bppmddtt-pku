const pool = require("../../config/db");

module.exports = {
    create: (data, callBack) => {

        pool.query(
            `insert into category(categoryName, status, createdAt, updatedAt) 
                values(?,?,?,?)`,
            [
                data.categoryName,
                data.status,
                data.createdAt,
                data.updatedAt
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAll: callBack => {
        pool.query(
            `SELECT * FROM category  ORDER BY updatedAt DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    update: (data, callBack) => {
        pool.query(
            `UPDATE category SET categoryName=?, status=?, updatedAt=? WHERE id = ?`,
            [
                data.categoryName,
                data.status,
                data.updatedAt,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    deleteById: (data, callBack) => {
        pool.query(
            `DELETE FROM category WHERE id = ?`,
            [
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};
