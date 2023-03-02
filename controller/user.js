const Costumer = require("../models/Costumer");

const registerCliente = async (req, res) => {
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
};

const loginCliente = (req, res) => {
  let { email, password } = req.body;
  Costumer.find({ email: email, password: password })
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateEvento = (req, res) => {
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
};

module.exports = {
  registerCliente: registerCliente,
  loginCliente: loginCliente,
  updateEvento: updateEvento,
};
