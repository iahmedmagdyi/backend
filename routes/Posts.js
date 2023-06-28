const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validationToken } = require("../middleWares/AuthMiddleWare");

router.get("/", validationToken, async (req, res) => {
  const getListOf = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ getListOf: getListOf, likedPosts: likedPosts });
});
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});
router.get("/byUserId/:id", async (req, res) => {
  const id = req.params.id;

  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});
router.post("/", validationToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  await Posts.create(post);
  res.json(post);
});
//update title
router.put("/title", validationToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});
//update body
router.put("/postText", validationToken, async (req, res) => {
  const { newPostText, id } = req.body;
  await Posts.update({ postText: newPostText }, { where: { id: id } });
  res.json(newPostText);
});

router.delete("/:postId", validationToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("deleted successfully");
});

module.exports = router;
