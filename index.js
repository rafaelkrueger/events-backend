const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const conn = require("./connection");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();
const Companie = require("./models/Companie");
const Costumer = require("./models/Costumer");
const PORT = process.env.PORT || 8080;

//database connection
conn();

cloudinary.config({
  cloud_name: "tamarin-tech",
  api_key: "739453756319644",
  api_secret: "vitA4c7VnVj9_5RctBDuRUhocpI",
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

app.get("/all-events", (req, res) => {
  Companie.find({})
    .then((response) => {
      const newResponse = [];
      response.forEach((element) => {
        newResponse.push(element.events);
      });
      res.send(newResponse);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/specific-event/:id", (req, res) => {
  const id = req.params.id;
  Companie.find({ "events._id": id })
    .then((response) => {
      const newResponse = [];
      response.forEach((element) => {
        element.events.forEach((list) => {
          if (list._id == req.params.id) {
            newResponse.push(list);
          }
        });
      });
      res.send(newResponse);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/delete-event", (req, res) => {
  const { empresa, id } = req.body;
  Companie.updateOne({ _id: empresa }, { $pull: { events: { _id: id } } })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register-empresa", async (req, res) => {
  const { logo, name, empresa, user, email, password, cellphone, cpf, url } =
    req.body;
  try {
    console.log(logo);
    const result = await cloudinary.uploader.upload(logo, {
      folder: "events-logo",
      resource_type: "auto",
    });

    let events = [];
    let money = [];
    let afiliados = [];

    const newUser = new Companie({
      logo: result.url,
      name: empresa,
      email: email,
      owner: name,
      password: password,
      number: cellphone,
      url: url,
      user: user,
      events: events,
      money: money,
      afiliados: afiliados,
    });
    newUser.save((err, message) => {
      if (err) console.log(err);
      console.log(message);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register-cliente", async (req, res) => {
  const { name, user, email, password, cellphone, cpf } = req.body;
  try {
    const newUser = new Costumer({
      name: name,
      username: user,
      email: email,
      password: password,
      cpf: cpf,
      number: cellphone,
      exposure: false,
      friends: [],
      ingressos: [],
    });
    newUser.save((err, message) => {
      if (err) console.log(err);
      console.log(message);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login-cliente", (req, res) => {
  let { email, password } = req.body;
  Costumer.find({ email: email, password: password })
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login-empresa", (req, res) => {
  let { email, password } = req.body;
  Companie.find({ email: email, password: password })
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/empresa/:id", async (req, res) => {
  const id = req.params.id;
  Companie.findOne({ _id: req.params.id })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.patch("/set-ingresso", async (req, res) => {
  try {
    const {
      empresa,
      image,
      name,
      description,
      data,
      hour,
      cep,
      bairro,
      rua,
      cidade,
      estado,
      ingresso,
    } = req.body;
    console.log(ingresso);
    const result = await cloudinary.uploader.upload(image, {
      folder: "samples",
      resource_type: "auto",
    });

    Companie.updateOne(
      { _id: empresa },
      {
        $addToSet: {
          events: {
            image: result.secure_url,
            name: name,
            description: description,
            data: data,
            hour: hour,
            ingresso: ingresso,
            adress: {
              cep: cep,
              bairro: bairro,
              rua: rua,
              cidade: cidade,
              estado: estado,
              latitude: "",
              longitude: "",
            },
          },
        },
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

app.patch("/update-evento", (req, res) => {
  const { _id, description, ingresso, data, hour } = req.body;

  Companie.updateOne(
    { "events._id": _id },
    {
      $set: {
        "events.$.description": description,
        "events.$.data": data,
        "events.$.hour": hour,
        "events.$.ingresso": ingresso,
      },
    }
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

//porta
app.listen(PORT, () => {
  console.log("Servidor Ligado!");
});
