const Sequelize = require("sequelize");
const { User } = require("../db");

const createUser = async (req, res, _next) => {
  const { name, userName, password } = req.body;
  try {
    let exists = await User.findOne({ where: { userName: userName } });
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
  createUser,
};