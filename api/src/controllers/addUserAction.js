const Sequelize = require("sequelize");
const { User, Action } = require("../db");

const addUserAction = async (req, res, _next) => {
  const { userName, symbol } = req.body;
  try {
    let user = await User.findOne({ where: { userName: userName } });
    if (exists) return res.status(210).send(`${userName} already has a user`);

    const newUser = await User.create({
      userName,
      name,
      password,
    });

    return res.json(newUser);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addUserAction,
};