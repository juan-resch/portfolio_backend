const router = require("express").Router();

const { adminAuth } = require("./middlewares/AdminAuth");

const user_controller = require("./controllers/UserController");
const post_controller = require("./controllers/PostController");
const post_reactions_controller = require("./controllers/PostReactionController");
const post_media_controller = require("./controllers/PostMediaController");
const work_controller = require("./controllers/WorkController");
const skills_controller = require("./controllers/SkillController");
const techs_controller = require("./controllers/TechController");

// start of users routes
router.post("/user", user_controller.create);
router.get("/users", user_controller.index);
router.put("/user", user_controller.update);
router.get("/user/:id", user_controller.findOne);
router.delete("/user/:id", adminAuth, user_controller.delete);
// end of users routes

// start of posts routes
router.post("/post", post_controller.create);
router.get("/posts", adminAuth, post_controller.index);
router.put("/post", post_controller.update);
router.get("/post/:id", post_controller.findOne);
router.delete("/post/:id", adminAuth, post_controller.delete);
// end of posts routes

// start of post_reactions routes
router.post("/posts/reaction", post_reactions_controller.create);
router.get("/posts/reactions", adminAuth, post_reactions_controller.index);
router.put("/posts/reaction", post_reactions_controller.update);
router.get("/posts/reaction/:id", post_reactions_controller.findOne);
router.delete(
  "/posts/reaction/:id",
  adminAuth,
  post_reactions_controller.delete
);
// end of post_reactions routes

// start of post_medias routes
router.post("/posts/media", post_media_controller.create);
router.get("/posts/medias", adminAuth, post_media_controller.index);
router.put("/posts/media", post_media_controller.update);
router.get("/posts/media/:id", post_media_controller.findOne);
router.delete("/posts/media/:id", adminAuth, post_media_controller.delete);
// end of post_medias routes

// start of works routes
router.post("/work", work_controller.create);
router.get("/works", adminAuth, work_controller.index);
router.put("/work", work_controller.update);
router.get("/work/:id", work_controller.findOne);
router.delete("/work/:id", adminAuth, work_controller.delete);
// end of works routes

// start of skills routes
router.post("/skill", skills_controller.create);
router.get("/skills", adminAuth, skills_controller.index);
router.put("/skill", skills_controller.update);
router.get("/skill/:id", skills_controller.findOne);
router.delete("/skill/:id", adminAuth, skills_controller.delete);
// end of skills routes

// start of techs routes
router.post("/tech", techs_controller.create);
router.get("/techs", adminAuth, techs_controller.index);
router.put("/tech", techs_controller.update);
router.get("/tech/:id", techs_controller.findOne);
router.delete("/tech/:id", adminAuth, techs_controller.delete);
// end of techs routes

module.exports = router;

//FontAwesome5Brands
