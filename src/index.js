const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const blogs = require("./routes/blog");

mongoose
  .connect("mongodb://localhost/portfolio")
  .then(() => console.log("server successfully connected"))
  .catch(err => console.error("something is wrong...", err.message));

app.use(cors());
app.use(express.json());
app.use("/routes/blog", blogs);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
