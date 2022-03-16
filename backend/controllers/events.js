const { response } = require("express");

const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const createdEvent = await event.save();
    res.json({
      ok: true,
      createdEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
    });
  }
};

const updateEvent = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "The event doesnt exists",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "user unauthorized",
      });
    }
    const newEvent = { ...req.body, user: uid };
    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });
    return res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "The event doesnt exists",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "user unauthorized",
      });
    }
    await Event.findByIdAndDelete(id);
    return res.json({
      ok: true,
      msg: "deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
