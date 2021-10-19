const Sequelize = require("sequelize");
const { User, Action } = require("../db");

const getUsers = async (req, res, _next) => {
/*   const { userName, name, password } = req.body; */
  try {
    let users = await User.findAll({ include: [
      { model: Action, attributes: ["symbol","name","currency"], through: { attributes: [] } }
    ]
  });
    return res.json(users);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getUsers,
};