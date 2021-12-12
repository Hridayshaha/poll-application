require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const {
  getCreateRoute,
  postCreateRoute,
  getAllPolls,
  getSinglePoll,
  postSinglePoll,
} = require("./controller/create-route-controller");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/polls/:id", postSinglePoll);
app.get("/polls/:id", getSinglePoll);
app.get("/polls", getAllPolls);

app.post("/create", postCreateRoute);
app.get("/create", getCreateRoute);

app.get("/", (req, res) => {
  res.redirect("/create");
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect("mongodb://localhost:27017/stack-express", { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "Server listening on port " + PORT + " with database connection"
      );
    });
  })
  .catch((err) => console.log(err));
