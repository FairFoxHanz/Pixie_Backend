const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");

const Survey = mongoose.model("events");

module.exports = app => {
  app.get("/events/list", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id });

    res.send(surveys);
  });

  app.post("/events/create", requireLogin, async (req, res) => {
    const { name, place, date } = req.body;

    const event = new Survey({
      name,
      place,
      date,
      _user: req.user.id
    });

    try {
      await event.save();
      res.status(200).send(event);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
