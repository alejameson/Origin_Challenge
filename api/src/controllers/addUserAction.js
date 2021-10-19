const Sequelize = require("sequelize");
const { User, Action } = require("../db");

const addUserAction = async (req, res, _next) => {
  const { userName, symbol } = req.body;
  try {
    let user = await User.findOne({ where: { userName: userName } });

    let action = await Action.findOne({ where: { symbol: symbol } });
    
    user.addAction(action);

    let userAction = await User.findOne({ where: { userName: userName }, include: [
      { model: Action, attributes: ["symbol","name","currency"], through: { attributes: [] } }
    ]})

    console.log(userAction, "USER ACTION");

    return res.json(userAction);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addUserAction,
};