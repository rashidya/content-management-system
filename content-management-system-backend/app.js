const express = require("express");
const post = require("./src/routes/post");
const user = require("./src/routes/user");
const cors =require('cors')

const app = express();
const port = 4000;


app.use(express.json());
app.use(cors());
app.use("/user", user);
app.use("/post", post);

app.listen(port, () => {
  console.log(`app starting on ${port}`);
});
