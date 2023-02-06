const {
    create,
    update,
    getAll,
    deleteById,
    getReplyByLetterID,
    createReply,
    getByStatus,
    getByDepartment,
    getByPriority,
    letterById,
    getSummaryMonth,
    getSummaryDay,
    getByStatusForDep,
    getByPriorityForDep
} = require("./surat.service")

module.exports = {
    createLetters: (req, res) => {
        const body = req.body
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Tambah surat berhasil'
            })
        })
    },

    getLetters: (req, res) => {
        getAll((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.json({
                success: 1,
                letters: results
            })
        })
    },

    getSummaryByMonth: (req, res) => {
        getSummaryMonth((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.json({
                success: 1,
                summary: results
            })
        })
    },

    getSummaryByDay: (req, res) => {
        getSummaryDay((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.json({
                success: 1,
                summary: results
            })
        })
    },

    updateLetters: (req, res) => {
        const body = req.body
        update(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.json({
                success: 1,
                message: "Update berhasil"
            })
        })
    },

    deleteLetters: (req, res) => {
        const data = req.body
        deleteById(data, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            // if (!results) {
            //   return res.json({
            //     success: 0,
            //     message: "Surat tidak ditemukan"
            //   });
            // }
            return res.json({
                success: 1,
                message: "Hapus berhasil"
            })
        })
    },

    getLettersByStatus: (req, res) => {
        const id = req.params.status;
        getByStatus(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Surat tidak ditemukan"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                status: results
            })
        })
    },

    getLettersByDepartment: (req, res) => {
        const id = req.params.department;
        getByDepartment(id, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Surat tidak ditemukan"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                departments: results
            })
        })
    },

    getLettersByPriority: (req, res) => {
        const id = req.params.priority;
        getByPriority(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Surat tidak ditemukan"
                })
            }
            results.password = undefined;
            return res.json({
                success: 1,
                priority: results
            })
        })
    },


    getLettersByStatusForDep: (req, res) => {
        const status = req.params.status
        const department = req.params.department
        getByStatusForDep(status, department, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Surat tidak ditemukan"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                status: results
            })
        })
    },

    getLettersByPriorityForDep: (req, res) => {
        const priority = req.params.priority
        const department = req.params.department

        getByPriorityForDep(priority, department, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Surat tidak ditemukan"
                })
            }
            results.password = undefined
            return res.json({
                success: 1,
                priority: results
            })
        })
    },


    getLettersById: (req, res) => {
        const id = req.params.id
        letterById(id, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Surat tidak ditemukan"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                letter: results
            })
        })
    },


    //   REPLY

    getReplyByLetterId: (req, res) => {
        const id = req.params.id
        getReplyByLetterID(id, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Surat tidak ditemukan"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                replies: results
            });
        });
    },

    createReply: (req, res) => {
        const body = req.body;
        createReply(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Surat berhasil dibalas'
            })
        })
    },
}