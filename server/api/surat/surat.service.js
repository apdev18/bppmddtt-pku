const pool = require("../../config/db")

module.exports = {
    create: (data, callBack) => {

        pool.query(
            `insert into letters(letterFrom, issuedDate, subject, registerPostId, department, status, priority, description, createdAt, updatedAt) 
                values(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.letterFrom,
                data.issuedDate,
                data.subject,
                data.registerPostId,
                data.department,
                data.status,
                data.priority,
                data.description,
                data.createdAt,
                data.updatedAt
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getAll: callBack => {
        pool.query(
            `SELECT * FROM letters ORDER BY id DESC, priority DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getSummaryMonth: callBack => {
        pool.query(
            `SELECT  date_format(createdAt, '%M') AS label, COUNT(CASE WHEN (status) = 'completed' THEN (status) END) AS completed, COUNT(CASE WHEN (status) = 'closed' THEN (status) END) AS closed, COUNT(CASE WHEN (status) = 'assigneded' THEN (status) END) AS assigneded FROM letters WHERE YEAR(createdAt) = YEAR(NOW()) GROUP BY YEAR(createdAt), MONTH(createdAt)`,
            // select COUNT(*) from letters where createdAt > now() - interval 1 week;
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getSummaryDay: callBack => {
        pool.query(
            `SELECT DATE_FORMAT(createdAt, "%d %b") AS label, COUNT(CASE WHEN (status) = 'completed' THEN (status) END) AS completed, COUNT(CASE WHEN (status) = 'closed' THEN (status) END) AS closed, COUNT(CASE WHEN (status) = 'assigneded' THEN (status) END) AS assigneded FROM letters WHERE MONTH(createdAt) = MONTH(NOW()) GROUP BY DATE(createdAt);`,
            // select COUNT(*) from letters where createdAt > now() - interval 1 week;
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    update: (data, callBack) => {
        pool.query(
            `UPDATE letters SET letterFrom=?, issuedDate=?, subject=?, registerPostId=?, department=?, status=?, priority=?, description=?, updatedAt=? WHERE id = ?`,
            [
                data.letterFrom,
                data.issuedDate,
                data.subject,
                data.registerPostId,
                data.department,
                data.status,
                data.priority,
                data.description,
                data.updatedAt,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },

    deleteById: (data, callBack) => {
        pool.query(
            `DELETE FROM letters WHERE id = ?`,
            [
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },

    getByStatus: (status, callBack) => {
        pool.query(
            `SELECT * FROM letters WHERE status = ? ORDER BY id DESC`,

            [status],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getByDepartment: (department, callBack) => {
        pool.query(
            `SELECT * FROM letters WHERE department = ? ORDER BY id DESC`,

            [department],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getByPriority: (priority, callBack) => {
        pool.query(
            `SELECT * FROM letters WHERE priority = ? ORDER BY id DESC`,

            [priority],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    getByStatusForDep: (status, department, callBack) => {
        pool.query(
            `SELECT * FROM letters WHERE status = ? AND department = ? ORDER BY id DESC`,

            [status, department],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getByPriorityForDep: (priority, department, callBack) => {
        pool.query(
            `SELECT * FROM letters WHERE priority = ? AND department = ? ORDER BY id DESC`,

            [priority, department],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },


    letterById: (id, callBack) => {
        pool.query(
            `SELECT * FROM letters WHERE id = ?`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },



    // REPLY
    getReplyByLetterID: (id, callBack) => {
        pool.query(
            `SELECT * FROM replies WHERE letterId = ? ORDER BY id DESC`,

            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    createReply: (data, callBack) => {
        pool.query(
            `insert into replies(status, department, reply, letterId, user, createdAt, updatedAt) 
                values(?,?,?,?,?,?,?)`,
            [
                data.status,
                data.department,
                data.reply,
                data.letterId,
                data.user,
                data.createdAt,
                data.updatedAt
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
        const id = data.letterId
        pool.query(
            `UPDATE letters SET status=? WHERE id = ?`,
            [
                data.status,
                id,
            ],
        )
    },
}