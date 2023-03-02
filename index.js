const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const conn = require("./connection");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8083;
//routes imports
const {
  allEvents,
  specificEvent,
  deleteEvent,
} = require("./controller/system");
const {
  registerCompany,
  loginCompany,
  findCompany,
  setIngresso,
} = require("./controller/host");
const {
  registerCliente,
  loginCliente,
  updateEvento,
} = require("./controller/user");

//database connection
conn();

cloudinary.config({
  cloud_name: "tamarin-tech",
  api_key: process.env.CLOUDNARY_KEY,
  api_secret: process.env.CLOUDNARY_SK,
});

//Middlewares
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(fileupload({ useTempFiles: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

//rotas
app.get("/", async (req, res) => {
  res.send("ENDPOINT INICIAL");
});

//system routes
app.get("/all-events", allEvents);
app.get("/specific-event/:id", specificEvent);
app.post("/delete-event", deleteEvent);

//company routes
app.get("/empresa/:id", findCompany);
app.post("/register-empresa", registerCompany);
app.post("/login-empresa", loginCompany);
app.patch("/set-ingresso", setIngresso);

//costumer routes
app.post("/register-cliente", registerCliente);
app.post("/login-cliente", loginCliente);
app.patch("/update-evento", updateEvento);

//porta
app.listen(PORT, () => {
  console.log("Servidor Ligado na porta: " + PORT);
});
