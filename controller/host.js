const Companie = require("../models/Companie");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const apiKey = "vWWY8QAGe1r10wbBIvE86vFN9GS5tErF";
const urlApi = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}`;

const registerCompany = async (req, res) => {
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
};

const loginCompany = (req, res) => {
  let { email, password } = req.body;
  Companie.find({ email: email, password: password })
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const findCompany = async (req, res) => {
  Companie.findOne({ _id: req.params.id })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const setIngresso = async (req, res) => {
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
    const result = await cloudinary.uploader.upload(image, {
      folder: "samples",
      resource_type: "auto",
    });
    const getLocation = {
      location: `${rua}, ${bairro}, ${cidade}, ${estado}`,
      options: {
        thumbMaps: false,
      },
    };

    const location = await axios
      .post(urlApi, getLocation)
      .then((response) => {
        console.log(response.data.results[0].locations[0].latLng);
      })
      .catch((error) => {
        console.error(error);
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
              location: location,
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
};

module.exports = {
  registerCompany: registerCompany,
  loginCompany: loginCompany,
  findCompany: findCompany,
  setIngresso: setIngresso,
};
