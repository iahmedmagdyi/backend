const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validationToken } = require("../middleWares/AuthMiddleWare");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comment = await Comments.findAll({ where: { PostId: postId } });
  res.json(comment);
});
router.post("/", validationToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  const comments = await Comments.create(comment);
  res.json(comments);
});
//delete comment
router.delete("/:commentId", validationToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
