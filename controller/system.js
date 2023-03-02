const Companie = require("../models/Companie");

const allEvents = (req, res) => {
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
};

const specificEvent = (req, res) => {
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
};

const deleteEvent = (req, res) => {
  const { empresa, id } = req.body;
  Companie.updateOne({ _id: empresa }, { $pull: { events: { _id: id } } })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  allEvents: allEvents,
  specificEvent: specificEvent,
  deleteEvent: deleteEvent,
};
