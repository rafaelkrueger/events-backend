const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanieSchema = new Schema({
  logo: String,
  name: String,
  owner: String,
  user: String,
  password: String,
  email: String,
  number: String,
  afiliados: Array,
  url: String,
  events: [
    {
      idEvento: mongoose.Schema.Types.ObjectId,
      name: String,
      description: String,
      image: String,
      data: String,
      hour: String,
      adress: Object,
      ingresso: Array,
      costumers: Array,
    },
  ],
  money: {
    all: Number,
    tickets: Number,
  },
});

const Companie = mongoose.model("companie", CompanieSchema);

module.exports = Companie;
