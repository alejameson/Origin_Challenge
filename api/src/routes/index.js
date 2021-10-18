const Router = require("express");
const router = Router();
const { createUser } = require("../controllers/postUser");
const { getUsers } = require("../controllers/getUser");
const { getActions } = require("../controllers/getAction");

router.get("/", (_req, res) => {
    res.send("HELLO WOOOOORD TEST");
});

router.get("/getUsers", getUsers);

router.post("/createUser", createUser);

router.get("/getActions", getActions);

/* router.post("/addUserAction" ) */


module.exports = router;