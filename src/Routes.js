const router = require("express").Router();

const user_controller = require("./controllers/UserController");

//users routes

router.post("/users", user_controller.create);
router.get("/users", user_controller.index);

//
module.exports = router;
