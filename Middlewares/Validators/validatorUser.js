const Users = require("../../Models/Users");

module.exports = async (req, res, next) => {
  try {
    if (req.method === "POST") {
      if ((req.body.name.length >= 2 && req.body.name.length < 50) && (req.body.username.length >= 2 && req.body.username.length < 20) && (req.body.level === 1 || req.body.level === 2 || req.body.level === 3) && req.body.password.length >= 8 && req.body.password.length < 50) {
        const testUser = await Users.findOne({ username: req.body.username });
        if (testUser) {
          return res.status(400).json({ existUser: true, });
        }
        return next();
      } else {
        return res.status(400).json({ invalidForm: true, });
      }
    } else {
      if ((req.body.name.length >= 2 && req.body.name.length < 50) && (req.body.username.length >= 2 && req.body.username.length < 20) && (req.body.level === 1 || req.body.level === 2 || req.body.level === 3)) {
        const testUser = await Users.customQuery("SELECT * FROM users WHERE username = ? AND idUser != ?", [req.body.username, req.params.idUser]);
        console.log(testUser);
        if (testUser.length > 0) {
          return res.status(400).json({ existUser: true, });
        }
        return next();
      } else {
        return res.status(400).json({ invalidForm: true, });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: true, })
  }
}