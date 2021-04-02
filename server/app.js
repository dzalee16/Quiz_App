const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const usersRoutes = require("./routes/users");
const PORT = 8080;

//access to the middlewares
app.use("/users", usersRoutes);

mongoose.connect(
  process.env.CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Can't connect to MongoDB");
    } else {
      console.log("Successfully connected to MongoDB");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is listen on the port ${PORT}`);
});
