const express = require("express");
const app = express();
const db = require("./models");
const postRouter = require("./routes/Posts");
const cors = require("cors");
const commentsRouter = require("./routes/Comments");
const userRouter = require("./routes/User");
const likesRouter = require("./routes/Likes");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", userRouter);
app.use("/likes", likesRouter);
db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => console.log("app is running"));
  })
  .catch((err) => {
    console.log(err);
  });
