const pool = require("../config/db");

module.exports = {
  isAdmin: (req, res, next) => {
    const id = req.get("userId");

    if (!id) {
      return res.json({
        success: 0,
        message: "access denied!",
      });
    }
    pool.query(
      `SELECT admin FROM users WHERE userId = ?`,
      [id],
      (error, results, fields) => {
        if (results[0].admin) {
          next();
        } else {
          return res.json({
            success: 0,
            message: "access denied! you are not admin",
          });
        }
      }
    )




    // if (userId) {
    //   // Remove Bearer from string
    //   token = token.slice(7);
    //   jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {

    //   });
    // } else {
    //   return res.json({
    //     success: 0,
    //     message: "Access Denied! Unauthorized User"
    //   });
    // }

  }
};