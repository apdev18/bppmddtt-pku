const pool = require("../../config/db");
const AvatarGenerator = require("named-avatar-generator");
const crypto = require('crypto')

module.exports = {
  create: (data, callBack) => {
    const imageName = crypto.randomBytes(20).toString('hex')
    const id = crypto.randomBytes(16).toString('hex')
    AvatarGenerator.generate({ name: data.userName, size: 100 }).then(avatar => {
      AvatarGenerator.writeAvatar(avatar, "./storage/images/profiles/" + imageName + ".jpg");
    });

    pool.query(
      `insert into users(userId, userName, email, department, password, profileImg, createdAt, updatedAt) 
                values(?,?,?,?,?,?,?,?)`,
      [
        userId = id,
        data.userName,
        data.email,
        data.department,
        data.password,
        profileImg = imageName + '.jpg',
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

  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT userId, userName, email, department, profileImg, admin FROM users WHERE userId = ?`,

      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUsers: callBack => {
    pool.query(
      `SELECT * FROM users ORDER BY createdAt DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE users SET userName=?, email=?, department=?, status=?, updatedAt=? WHERE userId = ?`,
      [
        data.userName,
        data.email,
        data.department,
        data.status,
        data.updatedAt,
        data.userId
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  makeaAdmin: (data, callBack) => {
    pool.query(
      `UPDATE users SET admin=? WHERE userId = ?`,
      [
        data.admin,
        data.userId
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  searchByKeywords: (keywords, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE email = ?`,

      [keywords],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM users where userId = ?`,
      [data.userId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};