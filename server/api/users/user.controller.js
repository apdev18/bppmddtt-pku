const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    makeaAdmin,
    searchByKeywords,
    deleteUser
  } = require("./user.service")
  const { hashSync, genSaltSync, compareSync } = require("bcrypt")
  const { sign } = require("jsonwebtoken")
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body
      const salt = genSaltSync(10)
      body.password = hashSync(body.password, salt)
  
      create(body, (err, results) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            success: 0,
            message: 'Email sudah ada.'
          })
        }
        return res.status(200).json({
          success: 1,
          message: 'Awesome'
        });
      });
    },
  
    login: (req, res) => {
      const body = req.body
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err)
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Email dan password salah"
          })
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined
          const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: "24h"
          })
          return res.json({
            success: 1,
            message: "Login berhasil",
            token: jsontoken,
            userId: results.userId,
            isAdmin: results.admin
          })
        } else {
          return res.json({
            success: 0,
            data: "Email dan password salah"
          })
        }
      })
    },
  
    getUserByUserId: (req, res) => {
      const id = req.params.id
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err)
          return
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "User tidak ditemukan"
          })
        }
        results.password = undefined
        return res.json({
          success: 1,
          user: results
        })
      })
    },
  
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err)
          return
        }
        return res.json({
          success: 1,
          users: results
        })
      })
    },
  
    updateUsers: (req, res) => {
      const body = req.body
      // const salt = genSaltSync(10);
      // body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
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
  
    makeAdmin: (req, res) => {
      const body = req.body
      makeaAdmin(body, (err, results) => {
        if (err) {
          console.log(err)
          return
        }
        return res.json({
          success: 1,
          message: "Admin baru telah ditambahkan"
        })
      })
    },
  
    search: (req, res) => {
      const keyword = req.params.keywords
      searchByKeywords(keyword, (err, results) => {
        if (err) {
          console.log(err)
          return
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "User tidak ditemukan"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
  
    deleteUser: (req, res) => {
      const data = req.body
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err)
          return;
        }
        // if (!results) {
        //   return res.json({
        //     success: 0,
        //     message: "record not found"
        //   });
        // }
        return res.json({
          success: 1,
          message: "Hapus berhasil"
        })
      })
    }
  }
  