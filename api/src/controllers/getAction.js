const Sequelize = require("sequelize");
const { Action } = require("../db");
const axios = require("axios").default;

const getActions = async (req, res) => {
    const response = await axios.get("https://api.twelvedata.com/stocks?source=docs&exchange=NYSE")
    console.log(response.data.data);
    const actions = response.data.data;
    actions.map((a) => {
      Action.create({
        symbol: a.symbol,
        name: a.name,
        currency: a.currency,
        exchange: a.exchange,
        country: a.country
      })
    })
    return res.json(actions);
};

module.exports = {
  getActions,
};

/* const getUsers = async (req, res, _next) => {
  try {
    let users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err.message);
  }
}; */
