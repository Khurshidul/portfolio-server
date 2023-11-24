const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const blogs = require("./routes/blog");
const projects = require("./routes/projects");

mongoose
  .connect("mongodb+srv://portfolio:port1234@cluster0.pxqzsrt.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("server successfully connected"))
  .catch(err => console.error("something is wrong...", err.message));

app.use(cors());
app.use(express.json());
app.use("/blogs", blogs);
app.use("/projects", projects);


const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
