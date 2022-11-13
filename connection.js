const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async function conn() {
  await mongoose
    .connect(
      `mongodb+srv://rafaelkrueger:Vidanormal01@role-begginer.rtd4kgq.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Banco conectado!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
