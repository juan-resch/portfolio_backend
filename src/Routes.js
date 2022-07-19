const router = require("express").Router();

const { adminAuth } = require("./middlewares/AdminAuth");

const user_controller = require("./controllers/UserController");
const post_controller = require("./controllers/PostController");

// start of user routes
router.post("/users", user_controller.create);
router.get("/users", user_controller.index);
router.put("/users", user_controller.update);
router.get("/users/:id", user_controller.findOne);
router.delete("/users/:id", adminAuth, user_controller.delete);
// end of user routes

// start of post routes
router.post("/posts", post_controller.create);
router.get("/posts", post_controller.index);
router.put("/posts", post_controller.update);
router.get("/posts/:id", post_controller.findOne);
router.delete("/posts/:id", adminAuth, post_controller.delete);
// end of posts routes
module.exports = router;
