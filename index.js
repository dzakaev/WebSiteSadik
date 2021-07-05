const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index"));

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://usman:U123456u@cluster0.rlomm.mongodb.net/sadik",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(5005, () => {
      console.log("Server has been...5005");
    });
  } catch (e) {
    console.log(e);
  }
}
start();
