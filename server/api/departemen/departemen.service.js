const pool = require("../../config/db");

module.exports = {
    create: (data, callBack) => {

        pool.query(
            `insert into department(departmentName, createdAt, updatedAt) 
                values(?,?,?)`,
            [
                data.departmentName,
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
            `SELECT * FROM department  ORDER BY id DESC`,
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
            `UPDATE department SET departmentName=?, updatedAt=? WHERE id = ?`,
            [
                data.departmentName,
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
            `DELETE FROM department WHERE id = ?`,
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